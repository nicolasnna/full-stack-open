import { createSlice } from "@reduxjs/toolkit";
import blogsService from "../services/blogs";
import loginService from "../services/login";

const userSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    clearUser() {
      return null;
    },
    setUser(state, action) {
      return action.payload;
    },
  },
});

export const { clearUser, setUser } = userSlice.actions;

export const initializeUser = () => {
  return async (dispatch) => {
    const loggedUserJSON = window.localStorage.getItem("loggedUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      blogsService.setToken(user.token);
      dispatch(setUser(user));
    }
  };
};

export const loginUser = (login) => {
  return async (dispatch) => {
    const user = await loginService.login({ ...login });
    window.localStorage.setItem("loggedUser", JSON.stringify(user));
    blogsService.setToken(user.token);
    dispatch(setUser(user));
  };
};

export const logoutUser = () => {
  return async (dispatch) => {
    window.localStorage.removeItem("loggedUser");
    dispatch(clearUser());
  };
};

export default userSlice.reducer;
