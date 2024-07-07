import { createSlice } from "@reduxjs/toolkit";

const loginSlice = createSlice({
  name: "login",
  initialState: {
    username: "",
    password: "",
  },
  reducers: {
    setUsername(state, action) {
      state.username = action.payload;
    },
    setPassword(state, action) {
      state.password = action.payload;
    },
    clearLogin() {
      return {
        username: "",
        password: "",
      };
    },
  },
});

export const { setUsername, setPassword, clearLogin } = loginSlice.actions;

export default loginSlice.reducer;
