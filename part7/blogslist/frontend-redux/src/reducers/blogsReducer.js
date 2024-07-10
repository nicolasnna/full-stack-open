import { createSlice } from "@reduxjs/toolkit";
import blogsService from "../services/blogs";

const sortBlogs = (blogA, blogB) => {
  if (blogA.likes > blogB.likes) {
    return -1;
  } else if (blogA.likes < blogB.likes) {
    return 1;
  }
  return 0;
};

const blogsSlice = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    appendBlog(state, action) {
      state.push(action.payload);
    },
    setBlogs(state, action) {
      return action.payload;
    },
    updateBlog(state, action) {
      return state.map((b) =>
        b.id === action.payload.id ? (b = action.payload) : b
      ).sort(sortBlogs);
    },
    deleteBlog(state, action) {
      return state.filter(b => b.id !== action.payload);
    },
  },
});

export const { appendBlog, setBlogs, updateBlog, deleteBlog } = blogsSlice.actions;

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogsService.getAll();
    dispatch(setBlogs(blogs.sort(sortBlogs)));
  };
};

export const createBlog = (blog) => {
  return async (dispatch) => {
    const newBlog = await blogsService.create(blog);
    dispatch(appendBlog(newBlog));
  };
};

export const likeBlog = (blog) => {
  return async (dispatch) => {
    const blogUpdated = { ...blog, likes: blog.likes + 1 };
    const response = await blogsService.update(blogUpdated);
    dispatch(updateBlog(response));
  };
};

export const deleteBlogById = (id) => {
  return async (dispatch) => {
    await blogsService.deleteBlog(id);
    dispatch(deleteBlog(id));
  };
};

export const addComentBlog = (blogWithComment) => {
  return async (dispatch) => {
    const blog = { ...blogWithComment }
    delete blog.user
    const response = await blogsService.addComment(blog);
    dispatch(updateBlog(response));
  };
};

export default blogsSlice.reducer;
