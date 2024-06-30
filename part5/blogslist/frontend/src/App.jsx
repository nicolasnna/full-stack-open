import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Login from './components/Login'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState()
  const [password, setPassword] = useState()
  const [message, setMessage] = useState(null)
  const [style, setStyle] = useState()
  const [user, setUser] = useState(null)
  
  const sortBlogs = (blogA, blogB) => {
    if (blogA.likes > blogB.likes) {
      return -1
    } else if (blogA.likes < blogB.likes) {
      return 1
    }
    return 0
  }

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs.sort(sortBlogs) )
    )
  }, [])
 

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }

  }, [])

  const onChangeUsername = (e) => {setUsername(e.target.value)}
  const onChangePassword = (e) => {setPassword(e.target.value)}

  const handleLogin = async(event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password})
      
      window.localStorage.setItem(
        'loggedUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setMessage('Wrong credentials')
      setStyle({ color: 'red'})
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const blogFormRef = useRef()

  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedUser')
    setUser(null)
  }

  const createNewBlog = async(newObject) => {
    try {
      const response = await blogService.create(newObject)
      setBlogs([...blogs,response].sort(sortBlogs))
      // Notify
      setMessage(`a new blog '${newObject.title}' by ${newObject.author} has been added`)
      setStyle({ color: 'green'})
      blogFormRef.current.toggleVisibility()
      setTimeout(() => {
        setMessage(null)
      }, 5000)

    } catch (exception) {
      setMessage(`Error for create blog: ${exception}`)
      setStyle({ color: 'red'})
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const addLikes = async (newBlog, id) => {
    await blogService.update(newBlog, id)
    const copyList = [...blogs]
    copyList.forEach(blog => {
      if (blog.id === id){
        blog.likes = blog.likes +1
      }
    })   
    setBlogs(copyList.sort(sortBlogs))
  }

  const removeBlog = async (id) => {
    await blogService.deleteBlog(id)
  }

  if (user===null) {
    return (
      <div>
        <Notification 
          message={message} 
          styles={style}
        />
        <h2>Login in to application</h2>
        <Login 
          handleLogin={handleLogin}
          username={username}
          password={password}
          onChangeUsername={onChangeUsername}
          onChangePassword={onChangePassword}
          />
      </div>
    )
  }

  return (
    <div>
      <Notification 
          message={message} 
          styles={style}
        />
      <h2>blogs</h2>
      <p>
        {user.name} <button onClick={handleLogout}>Logout</button>
      </p>
      <Togglable buttonLabelShow={"Create new"} ref={blogFormRef}>
        <BlogForm
          createNewBlog={createNewBlog}
        />
      </Togglable>
      {blogs.map(blog =>
        <Blog 
          key={blog.id} 
          blog={blog} 
          user={user}
          addLike={addLikes}
          removeBlog={removeBlog}
        />
      )}
    </div>
  )
}

export default App