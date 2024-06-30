import { useState } from "react"
import PropTypes from 'prop-types'

const BlogForm = ({
  createNewBlog
}) => {
  const [newBlog, setNewBlog] = useState({title: '', author: '', url: ''})

  const onChangeTitle = (e) => setNewBlog({ ...newBlog, title: e.target.value })
  const onChangeAuthor = (e) => setNewBlog({ ...newBlog, author: e.target.value })
  const onChangeUrl = (e) => setNewBlog({ ...newBlog, url: e.target.value })

  const addBlog = (e) => {
    e.preventDefault()
    createNewBlog(newBlog)

    setNewBlog({title: '', author: '', url: ''})
  }


  return (
    <div>
      <h2>Create new blog</h2>
      <form onSubmit={addBlog}>
        <div>
          title:
            <input
              type="text"
              value={newBlog.title}
              name="Title"
              onChange={onChangeTitle}
              data-testid="input title"
            />
        </div>
        <div>
          author:
            <input
              type="text"
              value={newBlog.author}
              name="Author"
              onChange={onChangeAuthor}
              data-testid="input author"
            />
        </div>
        <div>
          url:
            <input
              type="text"
              value={newBlog.url}
              name="Url"
              onChange={onChangeUrl}
              data-testid="input url"
            />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

BlogForm.propTypes ={
  createNewBlog: PropTypes.func
}

export default BlogForm