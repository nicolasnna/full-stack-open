import { useEffect, useRef } from "react";
import Blog from "./components/Blog";
import Login from "./components/Login";
import Notification from "./components/Notification";
import BlogForm from "./components/BlogForm";
import Togglable from "./components/Togglable";
import { useDispatch, useSelector } from "react-redux";
import { createNotification } from "./reducers/notificationReducer";
import {
  createBlog,
  deleteBlogById,
  initializeBlogs,
  likeBlog,
} from "./reducers/blogsReducer";
import { clearLogin } from "./reducers/loginReducer";
import { initializeUser, loginUser, logoutUser } from "./reducers/userReducer";

const App = () => {
  const blogs = useSelector((state) => state.blogs);
  const login = useSelector((state) => state.login);
  const user = useSelector((state) => state.user);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeBlogs());
  }, [dispatch]);

  useEffect(() => {
    dispatch(initializeUser());
  }, [dispatch]);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      dispatch(loginUser(login));
      dispatch(clearLogin());
    } catch (exception) {
      dispatch(createNotification("Wrong credentials", "red", 3));
    }
  };

  const blogFormRef = useRef();

  const handleLogout = (event) => {
    event.preventDefault();
    dispatch(logoutUser());
  };

  const createNewBlog = async (newObject) => {
    try {
      dispatch(createBlog(newObject));
      blogFormRef.current.toggleVisibility();
      // Notify that is created
      dispatch(
        createNotification(
          `a new blog '${newObject.title}' by ${newObject.author} has been added`,
          "green",
          3
        )
      );
    } catch (exception) {
      dispatch(
        createNotification(`Error for create blog: ${exception}`, "red", 3)
      );
    }
  };

  const addLikes = async (blogUpdate) => {
    dispatch(likeBlog(blogUpdate));
  };

  const removeBlog = async (id) => {
    dispatch(deleteBlogById(id));
  };

  if (user === null) {
    return (
      <div>
        <Notification />
        <h2>Login in to application</h2>
        <Login handleLogin={handleLogin} />
      </div>
    );
  }

  return (
    <div>
      <Notification />
      <h2>blogs</h2>
      <p>
        {user.name} <button onClick={handleLogout}>Logout</button>
      </p>
      <Togglable buttonLabelShow={"Create new"} ref={blogFormRef}>
        <BlogForm createNewBlog={createNewBlog} />
      </Togglable>
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          addLike={addLikes}
          removeBlog={removeBlog}
        />
      ))}
    </div>
  );
};

export default App;
