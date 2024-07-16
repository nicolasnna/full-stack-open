import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addComentBlog, deleteBlogById, likeBlog } from "../reducers/blogsReducer"
import { useNavigate } from "react-router-dom"

const BlogInfo = ({ blog }) =>{
  const [comment, setComment] = useState('')
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const isSameUser = blog.user.id === user.id || blog.user === user.id;
  const navigate = useNavigate()

  const onChangeComment = (e) => {
    e.preventDefault()
    setComment(e.target.value)
  }
  
  const addComment = (e) => {
    e.preventDefault();
    if (!(comment === '')) {
      const blogWithComment = {...blog, 
        comments: blog.comments.length === 0 ? [comment] : [...blog.comments, comment]}
      dispatch(addComentBlog(blogWithComment))
    }
  }

  const deleteBlog = async () => {
    if (window.confirm(`Remove blog '${blog.title}' by ${blog.author}`)) {
      dispatch(deleteBlogById(blog.id));
      navigate('/')
    }
  };

  const updateLikes = async () => {
    const blogUpdate = {
      ...blog,
      user: blog.user.id || blog.user,
    };
    dispatch(likeBlog(blogUpdate));
  };

  return (
    <div>
      <h2>{blog.title}</h2>
      <a href={blog.url}>{blog.url}</a>
      <div>
        {blog.likes} likes 
        <button onClick={updateLikes}>like</button>
      </div>
      <div>
        added by {blog.author}
      </div>
      {isSameUser && <button onClick={deleteBlog}>Delete</button>}
      <h3>comments</h3>
      <form onSubmit={addComment}>
        <input name='comment' value={comment} type="text" onChange={onChangeComment}/>
        <button type="submit">add comment</button>
      </form>
      <ul>
        {blog.comments.map(c => <li key={c}>{c}</li>)}
      </ul>
    </div>
  )
}

export default BlogInfo