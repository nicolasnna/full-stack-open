import { createSlice } from "@reduxjs/toolkit";

const initialState = ''

const notificationSlice = createSlice({
  name:'notification',
  initialState,
  reducers: {
    setNotification(state, action) {
      return action.payload
    },
    clearNotification() {
      return ``
    }
  },
})

export const { setNotification, clearNotification} = notificationSlice.actions

export const createNotification = (content, time) => {
  return  dispatch => {
    dispatch(setNotification(content))
    setTimeout(() => {
      dispatch(clearNotification())
    }, 1000*time)
  }
}


export default notificationSlice.reducer