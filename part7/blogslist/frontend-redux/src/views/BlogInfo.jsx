import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addComentBlog,
  deleteBlogById,
  likeBlog,
} from "../reducers/blogsReducer";
import { useNavigate } from "react-router-dom";
import { Box, Button, List, ListItem, ListItemIcon, TextField, Typography } from "@mui/material";
import CommentIcon from '@mui/icons-material/Comment';

const BlogInfo = ({ blog }) => {
  const [comment, setComment] = useState("");
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const isSameUser = blog.user.id === user.id || blog.user === user.id;
  const navigate = useNavigate();

  const onChangeComment = (e) => {
    e.preventDefault();
    setComment(e.target.value);
  };

  const addComment = (e) => {
    e.preventDefault();
    if (!(comment === "")) {
      const blogWithComment = {
        ...blog,
        comments:
          blog.comments.length === 0 ? [comment] : [...blog.comments, comment],
      };
      dispatch(addComentBlog(blogWithComment));
    }
  };

  const deleteBlog = async () => {
    if (window.confirm(`Remove blog '${blog.title}' by ${blog.author}`)) {
      dispatch(deleteBlogById(blog.id));
      navigate("/");
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
    <Box display={"flex"} flexDirection={'column'} marginY={2}>
      <Typography variant="h4">{blog.title}</Typography>
      <Box marginY={2}>
        <Typography fontSize={16}>
          <a href={blog.url}>{blog.url}</a>
        </Typography>
        <Box display={"flex"} gap={1} alignItems={'center'}>
          <Typography fontSize={16}>
            {blog.likes} likes
          </Typography>
          <Button size="small" variant="contained" onClick={updateLikes}>like</Button>
        </Box>
        <Typography fontSize={16}>
          added by {blog.author}
        </Typography>
        {isSameUser && <Button size="small" variant="outlined" onClick={deleteBlog}>Delete</Button>}
      </Box>
      <form onSubmit={addComment}>
        <Box display={"flex"} alignContent={'center'} gap={2}>
          <TextField
            label="comment..."
            variant="outlined"
            size="small"
            name="comment"
            value={comment}
            type="text"
            onChange={onChangeComment}
          />
          <Button size="small" variant="contained" type="submit">add comment</Button>
        </Box>
      </form>
      <List>
        {blog.comments.map((c) => (
          <ListItem key={c}>
            <ListItemIcon><CommentIcon/></ListItemIcon> {c}
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default BlogInfo;
