import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getByUsername,
  guestUsers,
  searchUser,
} from "../../service/userService";
import toast from "react-hot-toast";
import { updateProgress } from "../Authentication/authenticationSlice";

const initialState = {
  guestUsers: [],
  isLoading: false,
  selectedUser: {},
  searchValue: "",
  searchedUsers: [],
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

export const getSearchedUsers = createAsyncThunk(
  "user/search",
  async (_, { getState }) => {
    const { token } = getState().authentication;
    const { searchValue } = getState().user;

    const {
      data: { statusCode, data },
    } = await searchUser(searchValue, token);

    if (statusCode === 200) {
      return data;
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

    updateSearchValue: (state, action) => {
      state.searchValue = action.payload;
    },

    updateSearchedUsers: (state) => {
      state.searchedUsers = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getGuestUsers.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(getGuestUsers.rejected, (state, action) => {
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

    builder.addCase(getSearchedUsers.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(getSearchedUsers.fulfilled, (state, action) => {
      state.searchedUsers = action.payload?.users;
      state.isLoading = false;
    });

    builder.addCase(getSearchedUsers.rejected, (state, action) => {
      toast.error("Something went wrong");
      console.log(action.error);
      state.isLoading = false;
    });
  },
});

export const { updateSelectedUser, updateSearchValue, updateSearchedUsers } =
  userSlice.actions;

export const userReducer = userSlice.reducer;
