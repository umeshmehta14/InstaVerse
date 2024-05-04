import { configureStore } from "@reduxjs/toolkit";
import { authenticationReducer } from "../pages/Authentication/authenticationSlice";

export default configureStore({
  reducer: {
    authentication: authenticationReducer,
  },
});
