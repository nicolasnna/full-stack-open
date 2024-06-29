import { useState } from "react"
import PropTypes from 'prop-types'

const Blog = ({ blog, username, addLike, removeBlog }) => {
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
    addLike(blogUpdate, blog.id)
    setLikes(likes+1)
  }

  const showDelete = { display: blog.user.username === username ? '' : 'none' }

  const deleteBlog = async() => {
    if (window.confirm(`Remove blog '${blog.title}' by ${blog.author}`)) {
      setIsDeleted(true)
      try {
        removeBlog(blog.id)
      } catch {
        setIsDeleted(false)
      }
    }
  }

  if (!isDeleted) {
    return (
    <div style={blogStyle}>
      <div className="blog_header">
        {blog.title} {blog.author}
        <button onClick={clickShow}>
          {buttonLabel}
        </button>
      </div>
      <div style={showVisible} className="blog_show">
        <div>
          {blog.url}
        </div>
        <div>
          {likes}
          <button 
            onClick={updateLikes}
            placeholder='Button add like'
            >
            like
          </button>
        </div>
        <div>
          {blog.user !== null && blog.user.name}
        </div>
        <button style={showDelete} onClick={deleteBlog}>Delete</button>
      </div>
    </div>
    )
  }
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  username: PropTypes.string, 
  addLike: PropTypes.func,
  removeBlog: PropTypes.func
}

export default Blog