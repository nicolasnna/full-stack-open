import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { TableCell, TableRow, Typography } from "@mui/material";

const Blog = ({ blog }) => {
  return (
    <TableRow data-testid="blog card">
      <TableCell className="blog_header">
        <Typography>
          <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
        </Typography>
      </TableCell>
      <TableCell>
        <Typography>{blog.author}</Typography>
      </TableCell>
      <TableCell>
        <Typography >likes: {blog.likes}</Typography>
      </TableCell>
    </TableRow>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
};

export default Blog;
