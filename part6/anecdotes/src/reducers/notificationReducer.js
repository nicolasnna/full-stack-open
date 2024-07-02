import { createSlice } from "@reduxjs/toolkit";

const initialState = 'TEST NOTIFICATION'

const notificationSlice = createSlice({
  name:'notification',
  initialState,
  reducers: {
    createNotification(state, action) {
      return `You created ${action.payload}`
    },
    voteNotification(state, action) {
      return `You voted ${action.payload}`
    },
    removeNotification() {
      return ``
    }
  },
})

export const { createNotification, voteNotification, removeNotification} = notificationSlice.actions
export default notificationSlice.reducer