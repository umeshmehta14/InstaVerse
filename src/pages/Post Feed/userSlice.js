import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { guestUsers } from "../../service/userService";
import toast from "react-hot-toast";

const initialState = {
  guestUsers: [],
};

export const getGuestUsers = createAsyncThunk(
  "user/guest",
  async (_, thunkAPI) => {
    const { token } = thunkAPI.getState().authentication;
    const {
      data: { statusCode, data },
    } = await guestUsers(token);

    if (statusCode === 200) {
      return data;
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getGuestUsers.rejected, (_, action) => {
      toast.error("Something went wrong");
      console.log(action.error);
    });

    builder.addCase(getGuestUsers.fulfilled, (state, action) => {
      state.guestUsers = action.payload;
    });
  },
});

export const userReducer = userSlice.reducer;
