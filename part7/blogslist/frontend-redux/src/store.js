import { configureStore } from "@reduxjs/toolkit";
import notificationReducer from "./reducers/notificationReducer";
import blogsReducer from "./reducers/blogsReducer";
import loginReducer from "./reducers/loginReducer";
import userReducer from "./reducers/userReducer";
import userListReducer from "./reducers/userListReducer";

const store = configureStore({
  reducer: {
    notification: notificationReducer,
    blogs: blogsReducer,
    login: loginReducer,
    user: userReducer,
    userList: userListReducer
  },
});

export default store;
