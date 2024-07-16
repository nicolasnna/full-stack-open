import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { initializeBlogs } from "./reducers/blogsReducer";
import { initializeUser } from "./reducers/userReducer";
import { Route, Routes, useMatch } from "react-router-dom";
import UserList from "./views/UserList";
import { initializeUserList } from "./reducers/userListReducer";
import UserInfo from "./views/UserInfo";
import BlogInfo from "./views/BlogInfo";
import Home from "./views/Home";
import Navbar from "./components/Navbar";
import Notification from "./components/Notification";
import { Container } from '@mui/material'

import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      light: '#757ce8',
      main: '#3f50b5',
      dark: '#002884',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff7961',
      main: '#f44336',
      dark: '#ba000d',
      contrastText: '#000',
    },
  },
});


const App = () => {
  const user = useSelector((state) => state.user);
  const userList = useSelector((state) => state.userList);
  const blogs = useSelector((state) => state.blogs);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeBlogs());
    dispatch(initializeUser());
    dispatch(initializeUserList());
  }, [dispatch]);

  const matchUsers = useMatch("/users/:id");
  const userSelected = matchUsers
    ? userList.find((u) => u.id === String(matchUsers.params.id))
    : null;

  const matchBlogs = useMatch("/blogs/:id");
  const blogSelected = matchBlogs
    ? blogs.find((b) => b.id === String(matchBlogs.params.id))
    : null;

  return (
    <ThemeProvider theme={theme}>
      <Container>
        {user && <Navbar />}
        <Notification />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/users" element={<UserList />} />
          <Route path="/users/:id" element={<UserInfo user={userSelected} />} />
          <Route path="/blogs/:id" element={<BlogInfo blog={blogSelected} />} />
        </Routes>
      </Container>
    </ThemeProvider>
  );
};

export default App;
