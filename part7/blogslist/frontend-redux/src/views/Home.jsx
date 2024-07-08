import { useDispatch, useSelector } from "react-redux";
import { createNotification } from "../reducers/notificationReducer";
import { loginUser } from "../reducers/userReducer";
import { clearLogin } from "../reducers/loginReducer";
import Login from "../components/Login";

import BlogList from "./BlogList";

const Home = () => {
  const dispatch = useDispatch();
  const login = useSelector((state) => state.login);
  const user = useSelector((state) => state.user);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      dispatch(loginUser(login));
      dispatch(clearLogin());
    } catch (exception) {
      dispatch(createNotification("Wrong credentials", "red", 3));
    }
  };

  if (user === null) {
    return (
      <div>
        <h2>Login in to application</h2>
        <Login handleLogin={handleLogin} />
      </div>
    );
  }

  return (
    <div>
      <h2>Blogs</h2>
      <BlogList />
    </div>
  );
};

export default Home;
