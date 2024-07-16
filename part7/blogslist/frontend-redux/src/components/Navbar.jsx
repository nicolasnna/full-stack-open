import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logoutUser } from "../reducers/userReducer";
import { AppBar, Container, Toolbar, Button, Box } from "@mui/material";

const styleLinks = {
  color: 'white',
  opacity: 0.8,
  textDecoration: 'none',
  '&:hover': {
    opacity: 1,
    color: '#FFD700',  // Color dorado al pasar el mouse
  },
  marginRight: 2,
}

const Navbar = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleLogout = (event) => {
    event.preventDefault();
    dispatch(logoutUser());
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: '#3f51b5' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Button
              component={Link}
              to="/"
              sx={styleLinks}
            >
              Blogs
            </Button>
            <Button
              component={Link}
              to="/users"
              sx={styleLinks}
            >
              Users
            </Button>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ color: 'white', marginRight: 2 }}>
              {user.name} logged in
            </Box>
            <Button
              onClick={handleLogout}
              sx={{
                backgroundColor: 'white',
                textDecoration: 'none',
                '&:hover': {
                  backgroundColor: '#FF6347',
                  color: 'white',
                },
                padding: '5px 10px',
                borderRadius: '4px',
              }}
            >
              Logout
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
