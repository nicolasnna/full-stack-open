const BlogInfo = ({ blog }) =>{
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
    </div>
  )
}

export default BlogInfo