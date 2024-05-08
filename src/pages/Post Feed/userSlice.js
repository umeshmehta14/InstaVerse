import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addSearchList,
  clearSearchList,
  getBookmark,
  getByUsername,
  getLikedPosts,
  getSearchList,
  guestUsers,
  removeSearchList,
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
  isSearchUserFetched: false,
  searchList: [],
  bookmarks: [],
  likedPosts: [],
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

export const getUserSearchList = createAsyncThunk(
  "user/searchList",
  async (_, { getState }) => {
    const { token } = getState().authentication;

    const {
      data: { statusCode, data },
    } = await getSearchList(token);

    if (statusCode === 200) {
      return data;
    }
  }
);

export const addUserToSearchList = createAsyncThunk(
  "user/add/searchList",
  async ({ _id }, { getState }) => {
    const { token } = getState().authentication;

    const {
      data: { statusCode, data },
    } = await addSearchList(_id, token);

    if (statusCode === 200) {
      return data;
    }
  }
);

export const removeUserFromSearchList = createAsyncThunk(
  "user/remove/searchList",
  async ({ _id }, { getState }) => {
    const { token } = getState().authentication;

    const {
      data: { statusCode, data },
    } = await removeSearchList(_id, token);

    if (statusCode === 200) {
      return data;
    }
  }
);

export const clearUserSearchList = createAsyncThunk(
  "user/searchList/clear",
  async (_, { getState }) => {
    const { token } = getState().authentication;

    const {
      data: { statusCode, data },
    } = await clearSearchList(token);

    if (statusCode === 200) {
      return data;
    }
  }
);

export const getUserBookmark = createAsyncThunk(
  "user/get/bookmark",
  async (_, { getState }) => {
    const { token } = getState().authentication;

    const {
      data: { statusCode, data },
    } = await getBookmark(token);

    if (statusCode === 200) {
      return data;
    }
  }
);

export const getUserLikedPosts = createAsyncThunk(
  "user/get/likedPosts",
  async (_, { getState }) => {
    const { token } = getState().authentication;

    const {
      data: { statusCode, data },
    } = await getLikedPosts(token);

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
      state.isSearchUserFetched = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getGuestUsers.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(getGuestUsers.rejected, (state, action) => {
      toast.error("Something went wrong");
      state.isLoading = false;
      console.error(action.error);
    });

    builder.addCase(getGuestUsers.fulfilled, (state, action) => {
      state.guestUsers = action.payload;
      state.isLoading = false;
    });

    builder.addCase(getUserByUsername.fulfilled, (state, action) => {
      state.selectedUser = action.payload;
    });

    builder.addCase(getUserByUsername.rejected, (_, action) => {
      toast.error("Something went wrong");
      console.error(action.error);
    });

    builder.addCase(getSearchedUsers.pending, (state) => {
      state.isLoading = true;
      state.isSearchUserFetched = false;
    });

    builder.addCase(getSearchedUsers.fulfilled, (state, action) => {
      state.searchedUsers = action.payload?.users;
      state.isLoading = false;
      state.isSearchUserFetched = true;
    });

    builder.addCase(getSearchedUsers.rejected, (state, action) => {
      toast.error("Something went wrong");
      console.error(action.error);
      state.isLoading = false;
      state.isSearchUserFetched = false;
    });

    builder.addCase(getUserSearchList.fulfilled, (state, action) => {
      state.searchList = action.payload;
    });

    builder.addCase(getUserSearchList.rejected, (_, action) => {
      console.error(action.error);
      toast.error("Something went wrong");
    });

    builder.addCase(addUserToSearchList.fulfilled, (state, action) => {
      state.searchList = action.payload;
    });

    builder.addCase(addUserToSearchList.rejected, (_, action) => {
      toast.error("Something went wrong");
      console.error(action.error);
    });

    builder.addCase(removeUserFromSearchList.fulfilled, (state, action) => {
      state.searchList = action.payload;
    });

    builder.addCase(removeUserFromSearchList.rejected, (_, action) => {
      toast.error("Something went wrong");
      console.error(action.error);
    });

    builder.addCase(clearUserSearchList.fulfilled, (state, action) => {
      state.searchList = action.payload;
    });

    builder.addCase(clearUserSearchList.rejected, (_, action) => {
      toast.error("Something went wrong");
      console.error(action.error);
    });

    builder.addCase(getUserBookmark.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(getUserBookmark.fulfilled, (state, action) => {
      state.bookmarks = action.payload;
      state.isLoading = false;
    });

    builder.addCase(getUserBookmark.rejected, (state, action) => {
      toast.error("Something went wrong");
      console.error(action.error);
      state.isLoading = false;
    });

    builder.addCase(getUserLikedPosts.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(getUserLikedPosts.fulfilled, (state, action) => {
      state.likedPosts = action.payload;
      state.isLoading = false;
    });

    builder.addCase(getUserLikedPosts.rejected, (state, action) => {
      toast.error("Something went wrong");
      console.error(action.error);
      state.isLoading = false;
    });
  },
});

export const { updateSelectedUser, updateSearchValue, updateSearchedUsers } =
  userSlice.actions;

export const userReducer = userSlice.reducer;
