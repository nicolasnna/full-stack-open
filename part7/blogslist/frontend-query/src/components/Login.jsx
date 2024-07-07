import PropTypes from "prop-types";
import { changePassword, changeUsername, useLoginDispatch, useLoginValue } from "../context/loginContext";

const Login = ({
  handleLogin,
}) => {
  const loginValue = useLoginValue()
  const loginDispatch = useLoginDispatch()

  const onChangeUsername = (e) => {
    changeUsername(loginDispatch, e.target.value)
  }

  const onChangePassword = (e) => {
    changePassword(loginDispatch, e.target.value)
  }

  return (
    <div>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type="text"
            value={loginValue.username}
            name="Username"
            onChange={onChangeUsername}
            data-testid="input username"
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={loginValue.password}
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
};

export default Login;
