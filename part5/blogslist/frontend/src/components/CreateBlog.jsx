const CreateBlog = ({handleCreate, title, author, url, changeTitle, changeAuthor, changeUrl}) => {
  return (
    <div>
      <h2>Create new blog</h2>
      <form onSubmit={handleCreate}>
        <div>
          title:
            <input
              type="text"
              value={title}
              name="Title"
              onChange={changeTitle}
            />
        </div>
        <div>
          author:
            <input
              type="text"
              value={author}
              name="Author"
              onChange={changeAuthor}
            />
        </div>
        <div>
          url:
            <input
              type="text"
              value={url}
              name="Url"
              onChange={changeUrl}
            />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default CreateBlog