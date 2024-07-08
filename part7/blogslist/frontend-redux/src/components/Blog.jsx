import { useState } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { deleteBlogById, likeBlog } from "../reducers/blogsReducer";
import { Link } from "react-router-dom";

const Blog = ({ blog }) => {
  const [visible, setVisible] = useState(false);
  const [buttonLabel, setButtonLabel] = useState("show");
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const showVisible = { display: visible ? "" : "none" };
  const isSameUser = blog.user.id === user.id || blog.user === user.id;

  const clickShow = () => {
    setVisible(!visible);
    setButtonLabel(visible ? "show" : "hide");
  };

  const updateLikes = async () => {
    const blogUpdate = {
      ...blog,
      user: blog.user.id || blog.user,
    };
    dispatch(likeBlog(blogUpdate));
  };

  const deleteBlog = async () => {
    if (window.confirm(`Remove blog '${blog.title}' by ${blog.author}`)) {
      dispatch(deleteBlogById(blog.id));
    }
  };

  return (
    <div style={blogStyle} data-testid="blog card">
      <div className="blog_header">
        <Link to={`/blogs/${blog.id}`}>{blog.title} {blog.author}</Link>
        <button onClick={clickShow}>{buttonLabel}</button>
      </div>
      <div style={showVisible} className="blog_show">
        <div>{blog.url}</div>
        <div>
          {blog.likes}
          <button onClick={updateLikes} placeholder="Button add like">
            like
          </button>
        </div>
        <div>{blog.user !== null && user.name}</div>
        {isSameUser && <button onClick={deleteBlog}>Delete</button>}
      </div>
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
};

export default Blog;
