import { useState } from "react"
import blogService from '../services/blogs'
import PropTypes from 'prop-types'

const Blog = ({ blog, username }) => {
  const [visible, setVisible] = useState(false)
  const [buttonLabel, setButtonLabel] = useState('show')
  const [likes, setLikes] = useState(blog.likes)
  const [isDeleted, setIsDeleted] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const showVisible = { display: visible ? '' : 'none' }

  const clickShow = () => {
    setVisible(!visible)
    setButtonLabel(visible ? 'show' : 'hide')
  }

  const updateLikes = async() => {
    const blogUpdate = {
      ...blog,
      likes: blog.likes + 1,
      user: blog.user.id
    }
    
    await blogService.update(blogUpdate, blog.id)
    setLikes(likes+1)
  }

  const showDelete = { display: blog.user.username === username ? '' : 'none' }

  const deleteBlog = async() => {
    if (window.confirm(`Remove blog '${blog.title}' by ${blog.author}`)) {
      setIsDeleted(true)
      try {
        await blogService.deleteBlog(blog.id)
      } catch {
        setIsDeleted(false)
      }
    }
  }

  if (!isDeleted) {
    return (
    <div style={blogStyle}>
      {blog.title}
      <button onClick={clickShow}>{buttonLabel}</button>
      <div style={showVisible}>
        <div>
          {blog.url}
        </div>
        <div>
          {likes}
          <button onClick={updateLikes}>like</button>
        </div>
        <div>
          {blog.author}
        </div>
        <button style={showDelete} onClick={deleteBlog}>Delete</button>
      </div>
    </div>
    )
  }

}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  username: PropTypes.string 
}

export default Blog