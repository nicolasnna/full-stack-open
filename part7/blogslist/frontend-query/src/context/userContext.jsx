import { useContext } from "react";
import { useReducer } from "react";
import { createContext } from "react";
import blogService from "../services/blogs";
import loginService from "../services/login";

const userReducer = (state, action) => {
  switch (action.type) {
    case "SET":
      return action.payload;
    case "CLEAR":
      return null;
    default:
      return state;
  }
};

const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [user, dispatch] = useReducer(userReducer, null);

  return (
    <UserContext.Provider value={[user, dispatch]}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserValue = () => {
  const valueAndDispatch = useContext(UserContext);
  return valueAndDispatch[0];
};

export const useUserDispatch = () => {
  const valueAndDispatch = useContext(UserContext);
  return valueAndDispatch[1];
};

export const initializeUser = (dispatch) => {
  const loggedUserJSON = window.localStorage.getItem("loggedUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      dispatch({type: 'SET', payload: user});
      blogService.setToken(user.token);
    }
}



export default UserContext;
