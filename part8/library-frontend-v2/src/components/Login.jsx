import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useMutation } from "@apollo/client";
import { LOGIN } from "../queries";

const Login = ({ show, setToken, setPage }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [login, result] = useMutation(LOGIN, {});

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value;
      setToken(token);
      localStorage.setItem("library-user-token", token);
    }
  }, [result.data]);

  if (!show) {
    return null;
  }

  const submit = async (event) => {
    event.preventDefault();
    await login({ variables: { username, password } });
    setPage("authors");
  };

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          name:{" "}
          <input
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password:{" "}
          <input
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  );
};

Login.propTypes = {
  show: PropTypes.bool,
  setToken: PropTypes.func,
  setPage: PropTypes.func,
};

export default Login;
