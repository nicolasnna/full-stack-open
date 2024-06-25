import PropTypes from 'prop-types'

const Login = ({handleLogin, username, password,onChangeUsername, onChangePassword}) => {
  return (
    <div>
      <form onSubmit={handleLogin}>
        <div>
          username 
            <input
              type="text"
              value={username}
              name="Username"
              onChange={onChangeUsername}
            />
        </div>
        <div>
          password
            <input
              type="password"
              value={password}
              name="Password"
              onChange={onChangePassword}
            />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )
}

Login.propTypes = {
  handleLogin: PropTypes.func,
  username: PropTypes.string,
  password: PropTypes.string,
  onChangeUsername: PropTypes.func,
  onChangePassword: PropTypes.func
}

export default Login