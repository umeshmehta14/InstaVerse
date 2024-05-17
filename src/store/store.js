import { configureStore } from "@reduxjs/toolkit";
import { authenticationReducer } from "../pages/Authentication/authenticationSlice";
import { userReducer } from "../pages/Post Feed/userSlice";
import { postReducer } from "../pages/Post Feed/postSlice";

export default configureStore({
  reducer: {
    authentication: authenticationReducer,
    user: userReducer,
    post: postReducer,
  },
});
