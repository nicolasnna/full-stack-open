import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import Login from "./components/Login";
import Notification from "./components/Notification";
import blogService from "./services/blogs";
import loginService from "./services/login";
import BlogForm from "./components/BlogForm";
import Togglable from "./components/Togglable";
import {
  CreateNotification,
  useNotificationDispatch,
} from "./context/notificationContext";
import { initializeUser, useUserDispatch, useUserValue } from "./context/userContext";
import { useLoginValue } from "./context/loginContext";
import { useBlogDispatch, useBlogValue } from "./context/blogContext";

const App = () => {
  const user = useUserValue()
  const userDispatch = useUserDispatch();
  const login = useLoginValue()
  const notifyDispatch = useNotificationDispatch();
  const blogs = useBlogValue()
  const blogsDispatch = useBlogDispatch()

  useEffect(() => {
    blogService.getAll().then((blogs) => blogsDispatch({type: "SETBLOGS", payload: blogs}));
  }, [blogsDispatch]);

  useEffect(() => {
    initializeUser(userDispatch)
  }, [userDispatch]);


  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({...login})
      window.localStorage.setItem("loggedUser", JSON.stringify(user));
      userDispatch({type: 'SET', payload: user});
      blogService.setToken(user.token);
    } catch (exception) {
      CreateNotification(notifyDispatch, "Wrong Credentials!", "red", 3);
    }
  };

  const blogFormRef = useRef();

  const handleLogout = (event) => {
    event.preventDefault();
    window.localStorage.removeItem("loggedUser");
    userDispatch({type: "CLEAR"});
  };

  const createNewBlog = async (newObject) => {
    try {
      const response = await blogService.create(newObject);
      blogsDispatch({type: "CREATE", payload: response})
      // Notify
      blogFormRef.current.toggleVisibility();
      CreateNotification(
        notifyDispatch,
        `a new blog '${newObject.title}' by ${newObject.author} has been added`,
        "green",
        3
      );
    } catch (exception) {
      CreateNotification(
        notifyDispatch,
        `Error for create blog: ${exception}`,
        "red",
        3
      );
    }
  };

  const addLikes = async (newBlog, id) => {
    await blogService.update(newBlog, id);
    blogsDispatch({type: "UPDATE", payload: newBlog})
    //setBlogs(copyList.sort(sortBlogs));
  };

  const removeBlog = async (id) => {
    await blogService.deleteBlog(id);
    blogsDispatch({type: "DELETE", payload: id})
  };

  if (user === null) {
    return (
      <div>
        <Notification />
        <h2>Login in to application</h2>
        <Login
          handleLogin={handleLogin}
        />
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
