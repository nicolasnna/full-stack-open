import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { setPassword, setUsername } from "../reducers/loginReducer";

const Login = ({
  handleLogin
}) => {
  const dispatch = useDispatch()
  const login = useSelector(state => state.login)

  const onChangeUsername = (e) => {
    dispatch(setUsername(e.target.value));
  };
  const onChangePassword = (e) => {
    dispatch(setPassword(e.target.value));
  };

  return (
    <div>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type="text"
            value={login.username}
            name="Username"
            onChange={onChangeUsername}
            data-testid="input username"
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={login.password}
            name="Password"
            onChange={onChangePassword}
            data-testid="input password"
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  );
};

Login.propTypes = {
  handleLogin: PropTypes.func,
  onChangePassword: PropTypes.func,
};

export default Login;
