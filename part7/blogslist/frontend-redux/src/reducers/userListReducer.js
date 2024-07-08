import { createSlice } from "@reduxjs/toolkit";
import usersService from "../services/users";

const userListSlice = createSlice({
  name: "userList",
  initialState: [],
  reducers: {
    setUserList(state, action) {
      return action.payload;
    },
  },
});

export const { setUserList } = userListSlice.actions;

export const initializeUserList = () => {
  return async (dispatch) => {
    const res = await usersService.getAll();
    dispatch(setUserList(res));
  };
};

export default userListSlice.reducer;
