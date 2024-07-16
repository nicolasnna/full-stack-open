import BlogForm from "../components/BlogForm";
import Togglable from "../components/Togglable";
import Blog from "../components/Blog";
import { useDispatch, useSelector } from "react-redux";
import { useRef } from "react";
import { createBlog } from "../reducers/blogsReducer";
import { createNotification } from "../reducers/notificationReducer";
import { Paper, Table, TableBody, TableContainer } from '@mui/material'

const BlogList = () => {
  const blogs = useSelector((state) => state.blogs);
  const dispatch = useDispatch();
  const blogFormRef = useRef();

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

  return (
    <>
      <Togglable buttonLabelShow={"Create new"} ref={blogFormRef}>
        <BlogForm createNewBlog={createNewBlog} />
      </Togglable>
      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            {blogs.map((blog) => (
              <Blog key={blog.id} blog={blog} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default BlogList;
