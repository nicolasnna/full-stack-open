import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logoutUser } from "../reducers/userReducer";

const Menu = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const padding = {
    paddingRight: 12,
  };

  const handleLogout = (event) => {
    event.preventDefault();
    dispatch(logoutUser());
  };

  return (
    <div style={{ backgroundColor: "lightGrey", padding: 10 }}>
      <Link to="/" style={padding}>
        Blogs
      </Link>
      <Link to="/users" style={padding}>
        users
      </Link>
      {user.name} logged in
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Menu;
