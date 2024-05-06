import { configureStore } from "@reduxjs/toolkit";
import { authenticationReducer } from "../pages/Authentication/authenticationSlice";
import { userReducer } from "../pages/Post Feed/userSlice";

export default configureStore({
  reducer: {
    authentication: authenticationReducer,
    user: userReducer,
  },
});
