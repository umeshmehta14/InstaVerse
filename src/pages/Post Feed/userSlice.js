import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getByUsername, guestUsers } from "../../service/userService";
import toast from "react-hot-toast";
import { updateProgress } from "../Authentication/authenticationSlice";

const initialState = {
  guestUsers: [],
  isLoading: false,
  selectedUser: {},
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
export const getUserByUsername = createAsyncThunk(
  "user/getByusername",
  async ({ username }, { getState, dispatch }) => {
    dispatch(updateProgress(40));

    const { token } = getState().authentication;
    const {
      data: { statusCode, data },
    } = await getByUsername(username, token);

    if (statusCode === 200) {
      dispatch(updateProgress(100));
      return data;
    } else {
      dispatch(updateProgress(100));
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateSelectedUser: (state) => {
      state.selectedUser = {};
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getGuestUsers.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(getGuestUsers.rejected, (_, action) => {
      toast.error("Something went wrong");
      state.isLoading = false;
      console.log(action.error);
    });

    builder.addCase(getGuestUsers.fulfilled, (state, action) => {
      state.guestUsers = action.payload;
      state.isLoading = false;
    });

    builder.addCase(getUserByUsername.fulfilled, (state, action) => {
      console.log("action.fulfilled", action.payload);
      state.selectedUser = action.payload;
    });

    builder.addCase(getUserByUsername.rejected, (_, action) => {
      toast.error("Something went wrong");
      console.log(action.error);
    });
  },
});

export const { updateSelectedUser } = userSlice.actions;

export const userReducer = userSlice.reducer;
