import { useState } from "react"
import { useDispatch } from "react-redux"
import { addComentBlog } from "../reducers/blogsReducer"

const BlogInfo = ({ blog }) =>{
  const [comment, setComment] = useState('')
  const dispatch = useDispatch()

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

  return (
    <div>
      <h2>{blog.title}</h2>
      <a href={blog.url}>{blog.url}</a>
      <div>
        {blog.likes} likes 
        <button>like</button>
      </div>
      <div>
        added by {blog.author}
      </div>
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