import { useContext, useReducer, createContext } from "react";

const loginReducer = (state, action) => {
  switch (action.type) {
    case "SETUSERNAME":
      return { ...state, username: action.payload };
    case "SETPASSWORD":
      return { ...state, password: action.payload };
    default:
      return state;
  }
};

const LoginContext = createContext();

export const LoginContextProvider = ({ children }) => {
  const [login, dispatch] = useReducer(loginReducer, {
    username: "",
    password: "",
  });

  return (
    <LoginContext.Provider value={[login, dispatch]}>
      {children}
    </LoginContext.Provider>
  );
};

export const useLoginValue = () => {
  const valueAndDispatch = useContext(LoginContext);
  return valueAndDispatch[0];
};

export const useLoginDispatch = () => {
  const valueAndDispatch = useContext(LoginContext);
  return valueAndDispatch[1];
};

export const changeUsername = (dispatch, username) => {
  dispatch({ type: "SETUSERNAME", payload: username });
};

export const changePassword = (dispatch, password) => {
  dispatch({ type: "SETPASSWORD", payload: password });
};

export default LoginContext;
