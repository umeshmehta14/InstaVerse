import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getNotifications } from "../../service/postService";
import toast from "react-hot-toast";

const initialState = {
  notifications: [],
  notificationLoader: false,
};

export const getUserNotifications = createAsyncThunk(
  "post/getNotifications",
  async (_, { getState, dispatch }) => {
    const { token } = getState().authentication;
    const {
      data: { statusCode, data },
    } = await getNotifications(token);

    if (statusCode === 200) {
      return data;
    }
  }
);

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUserNotifications.pending, (state) => {
      state.notificationLoader = true;
    });

    builder.addCase(getUserNotifications.fulfilled, (state, action) => {
      state.notifications = action.payload;
      state.notificationLoader = false;
    });

    builder.addCase(getUserNotifications.rejected, (state, action) => {
      toast.error("Something went wrong");
      console.error(action.error);
      state.notificationLoader = false;
    });
  },
});

export const postReducer = postSlice.reducer;
