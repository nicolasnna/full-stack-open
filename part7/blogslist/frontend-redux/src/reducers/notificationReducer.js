import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  message: null,
  color: null
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setNotification(state, action) {
      return {
        message: action.payload.message,
        color: action.payload.color
      };
    },
    clearNotification() {
      return initialState;
    },
  },
});

export const { setNotification, clearNotification } = notificationSlice.actions;

export const createNotification = (message, color, time) => {
  return (dispatch) => {
    dispatch(setNotification({ message, color}));
    setTimeout(() => {
      dispatch(clearNotification());
    }, 1000 * time);
  };
};

export default notificationSlice.reducer