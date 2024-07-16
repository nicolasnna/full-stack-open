import { useState } from "react";
import PropTypes from "prop-types";
import { Box, Button, Card, CardContent, CardHeader, Paper, TextField, Typography } from "@mui/material";

const BlogForm = ({ createNewBlog }) => {
  const [newBlog, setNewBlog] = useState({ title: "", author: "", url: "" });

  const onChangeTitle = (e) =>
    setNewBlog({ ...newBlog, title: e.target.value });
  const onChangeAuthor = (e) =>
    setNewBlog({ ...newBlog, author: e.target.value });
  const onChangeUrl = (e) => setNewBlog({ ...newBlog, url: e.target.value });

  const addBlog = (e) => {
    e.preventDefault();
    createNewBlog(newBlog);

    setNewBlog({ title: "", author: "", url: "" });
  };

  return (
    <Card variant="outlined" component={Paper} sx={{ width: "max-content" }}>
      <CardContent sx={{ paddingBottom: 0 }}>
        <Typography variant="h6">Create new blog</Typography>
      </CardContent>
      <CardContent>
        <form onSubmit={addBlog}>
          <Box marginBottom={1} marginX={2} >
            <TextField
              label="title"
              variant="outlined"
              size="small"
              type="text"
              value={newBlog.title}
              name="Title"
              onChange={onChangeTitle}
              data-testid="input title"
              sx={{
                marginRight: 2
              }}
            />
            <TextField
              label="author"
              variant="outlined"
              size="small"
              type="text"
              value={newBlog.author}
              name="Author"
              onChange={onChangeAuthor}
              data-testid="input author"
              sx={{
                marginRight: 2
              }}
            />
            <TextField
              label="url"
              variant="outlined"
              size="small"
              type="text"
              value={newBlog.url}
              name="Url"
              onChange={onChangeUrl}
              data-testid="input url"
              sx={{
                marginRight: 2
              }}
            />
          </Box>
          <Button size="small" variant="contained" type="submit">create</Button>
        </form>
      </CardContent>
    </Card>
  );
};

BlogForm.propTypes = {
  createNewBlog: PropTypes.func,
};

export default BlogForm;
