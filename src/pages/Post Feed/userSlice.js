import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addBookmark,
  addSearchList,
  clearSearchList,
  editProfile,
  followUser,
  getBookmark,
  getByUsername,
  getFollower,
  getFollowing,
  getLikedPosts,
  getSearchList,
  getSuggestedUser,
  guestUsers,
  postLikeUsers,
  removeBookmark,
  removeFollower,
  removeSearchList,
  searchUser,
  unfollowUser,
} from "../../service/userService";
import toast from "react-hot-toast";
import {
  updateCurrentUser,
  updateCurrentUserFollowing,
  updateProgress,
} from "../Authentication/authenticationSlice";
import {
  getExplorePosts,
  getHomePosts,
  handleGetPostById,
  updatePosts,
} from "./postSlice";

const initialState = {
  guestUsers: [],
  isLoading: false,
  selectedUser: {},
  isSelectedUserFetched: false,
  searchValue: "",
  searchedUsers: [],
  isSearchUserFetched: false,
  searchList: [],
  bookmarks: [],
  likedPosts: [],
  avatarImages: [],
  loadingUsers: [],
  userList: [],
  removeFollowerUser: [],
  suggestedUsers: [],
  tab: 1,
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
  async (
    { username, noLoading, currentUser },
    { getState, dispatch, rejectWithValue }
  ) => {
    try {
      !noLoading && dispatch(updateProgress(40));

      const { token } = getState().authentication;
      const {
        data: { statusCode, data },
      } = await getByUsername(username, token);

      if (statusCode === 200) {
        if (currentUser) {
          dispatch(updateCurrentUser(data));
          return data;
        }
        !noLoading && dispatch(updateProgress(100));
        return data;
      } else {
        !noLoading && dispatch(updateProgress(100));
      }
    } catch (error) {
      !noLoading && dispatch(updateProgress(100));
      return rejectWithValue(error.response.data);
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

export const addUserBookmark = createAsyncThunk(
  "user/add/bookmark",
  async ({ _id }, { getState, dispatch }) => {
    const { token, currentUser } = getState().authentication;
    dispatch(updateAddBookmark(currentUser));

    const {
      data: { statusCode, data },
    } = await addBookmark(_id, token);

    if (statusCode === 200) {
      return data;
    }
  }
);

export const removeUserBookmark = createAsyncThunk(
  "user/remove/bookmark",
  async ({ _id }, { getState, dispatch }) => {
    const { token } = getState().authentication;
    dispatch(updateRemoveBookmark(_id));
    const {
      data: { statusCode, data },
    } = await removeBookmark(_id, token);

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

export const editUserProfile = createAsyncThunk(
  "user/editProfile",
  async ({ data: updateData }, { getState, dispatch, rejectWithValue }) => {
    try {
      dispatch(updateProgress(20));
      const { token } = getState().authentication;
      const {
        data: { statusCode, data },
      } = await editProfile({ updateData }, token);
      dispatch(updateProgress(50));
      if (statusCode === 200) {
        dispatch(updateProgress(100));
        dispatch(updateSelectedUser(data));
        dispatch(updateCurrentUser(data));
        return data;
      }
      dispatch(updateProgress(100));
    } catch (error) {
      dispatch(updateProgress(100));
      return rejectWithValue(error.response.data);
    }
  }
);

export const handleFollowUnfollowUser = createAsyncThunk(
  "user/follow-unfollow",
  async (
    {
      _id,
      follow,
      username,
      notSelectedUser,
      unFollow,
      noPostLoading,
      singlePost,
    },
    { getState, dispatch }
  ) => {
    const { token, currentUser } = getState().authentication;
    const { loadingUsers, selectedUser } = getState().user;
    dispatch(updateLoadingUsers([...loadingUsers, _id]));

    const {
      data: { statusCode, data },
    } = follow ? await followUser(_id, token) : await unfollowUser(_id, token);

    if (statusCode === 200) {
      if (!noPostLoading) {
        dispatch(updatePosts());
        dispatch(getHomePosts({ page: 1 }));
      }
      dispatch(getExplorePosts({ page: 1 }));
      if (!notSelectedUser) {
        dispatch(getUserByUsername({ username, noLoading: true }));
      }
      if (currentUser.username === selectedUser.username) {
        dispatch(
          getUserByUsername({
            username: currentUser?.username,
            noLoading: true,
            currentUser: true,
          })
        );
      }
      singlePost &&
        dispatch(handleGetPostById({ _id: singlePost, noLoading: true }));
      unFollow &&
        dispatch(
          handleGetFollower({ _id: selectedUser._id, type: "following" })
        );
      dispatch(handleGetSuggestedUsers());
      const removeLoadingUsers = loadingUsers.filter((user) => user !== _id);
      dispatch(updateLoadingUsers(removeLoadingUsers));
      dispatch(updateCurrentUserFollowing(data));
      return data;
    }
  }
);

export const handleGetFollower = createAsyncThunk(
  "user/get-follower",
  async ({ _id, type }, { getState }) => {
    const { token } = getState().authentication;
    const {
      data: { statusCode, data },
    } =
      type === "follower"
        ? await getFollower(_id, token)
        : await getFollowing(_id, token);

    if (statusCode === 200) {
      return data;
    }
  }
);

export const handleRemoveFollower = createAsyncThunk(
  "user/remove-follower",
  async ({ _id }, { getState, dispatch, rejectWithValue }) => {
    try {
      const { token, currentUser } = getState().authentication;
      const { removeFollowerUser } = getState().user;
      dispatch(updateRemoveFollowerUser([...removeFollowerUser, _id]));
      const {
        data: { statusCode, data },
      } = await removeFollower(_id, token);

      if (statusCode === 200) {
        dispatch(
          getUserByUsername({
            username: currentUser?.username,
            noLoading: true,
            currentUser: true,
          })
        );
        const removeLoadingUsers = removeFollowerUser.filter(
          (user) => user !== _id
        );
        dispatch(updateRemoveFollowerUser(removeLoadingUsers));
        dispatch(handleGetSuggestedUsers());
        return data;
      }
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const handleGetSuggestedUsers = createAsyncThunk(
  "user/get-suggested-users",
  async (_, { getState }) => {
    const { token } = getState().authentication;
    const {
      data: { statusCode, data },
    } = await getSuggestedUser(token);

    if (statusCode === 200) {
      return data;
    }
  }
);

export const getPostLikeUsers = createAsyncThunk(
  "user/post/likedPost",
  async ({ _id }, { getState }) => {
    const { token } = getState().authentication;
    const {
      data: { statusCode, data },
    } = await postLikeUsers(_id, token);

    if (statusCode === 200) {
      return data;
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateSelectedUser: (state, action) => {
      state.selectedUser = action.payload;
    },

    updateSearchValue: (state, action) => {
      state.searchValue = action.payload;
    },

    updateSearchedUsers: (state) => {
      state.searchedUsers = [];
      state.isSearchUserFetched = false;
    },

    updateLoadingUsers: (state, action) => {
      state.loadingUsers = action.payload;
    },

    updateRemoveFollowerUser: (state, action) => {
      state.removeFollowerUser = action.payload;
    },

    updateAddBookmark: (state, action) => {
      state.bookmarks = [action.payload, ...state.bookmarks];
    },

    updateRemoveBookmark: (state, action) => {
      state.bookmarks = state.bookmarks?.filter(
        (post) => post._id !== action.payload
      );
    },

    updateTab: (state, action) => {
      state.tab = action.payload;
    },

    getUserListComment: (state, action) => {
      state.userList = action.payload;
    },

    updateLoadingForComment: (state, action) => {
      state.isLoading = action.payload;
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
      state.isSelectedUserFetched = true;
    });

    builder.addCase(getUserByUsername.rejected, (state, action) => {
      state.selectedUser = {};
      console.error(action.error);
      state.isSelectedUserFetched = true;
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
      console.error(action.error);
      state.isLoading = false;
      state.isSearchUserFetched = false;
    });

    builder.addCase(getUserSearchList.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(getUserSearchList.fulfilled, (state, action) => {
      state.searchList = action.payload;
      state.isLoading = false;
    });

    builder.addCase(getUserSearchList.rejected, (state, action) => {
      console.error(action.error);
      state.isLoading = false;
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
      console.error(action.error);
      state.isLoading = false;
    });

    builder.addCase(addUserBookmark.fulfilled, (state, action) => {
      state.bookmarks = action.payload;
    });

    builder.addCase(addUserBookmark.rejected, (_, action) => {
      toast.error("Something went wrong");
      console.error(action.error);
    });

    builder.addCase(removeUserBookmark.fulfilled, (state, action) => {
      state.bookmarks = action.payload;
    });

    builder.addCase(removeUserBookmark.rejected, (_, action) => {
      toast.error("Something went wrong");
      console.error(action.error);
    });

    builder.addCase(getUserLikedPosts.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(getUserLikedPosts.fulfilled, (state, action) => {
      state.likedPosts = action.payload;
      state.isLoading = false;
    });

    builder.addCase(getUserLikedPosts.rejected, (state, action) => {
      console.error(action.error);
      state.isLoading = false;
    });

    builder.addCase(editUserProfile.rejected, (state, action) => {
      toast.error(action.payload.error);
      console.error(action.payload.error);
      state.isLoading = false;
    });

    builder.addCase(handleFollowUnfollowUser.rejected, (_, action) => {
      toast.error("Something went wrong");
      console.error(action.error);
    });

    builder.addCase(handleGetFollower.pending, (state) => {
      state.userList = [];
      state.isLoading = true;
    });

    builder.addCase(handleGetFollower.fulfilled, (state, action) => {
      state.userList = action.payload;
      state.isLoading = false;
    });

    builder.addCase(handleGetFollower.rejected, (state, action) => {
      state.userList = [];
      state.isLoading = false;
      console.error(action.error);
    });

    builder.addCase(handleRemoveFollower.fulfilled, (state, action) => {
      state.userList = action.payload.follower;
    });

    builder.addCase(handleRemoveFollower.rejected, (_, action) => {
      toast.error("Something went wrong");
      console.error(action.payload);
    });

    builder.addCase(handleGetSuggestedUsers.fulfilled, (state, action) => {
      state.suggestedUsers = action.payload;
    });

    builder.addCase(getPostLikeUsers.pending, (state) => {
      state.userList = [];
      state.isLoading = true;
    });

    builder.addCase(getPostLikeUsers.fulfilled, (state, action) => {
      state.userList = action.payload;
      state.isLoading = false;
    });

    builder.addCase(getPostLikeUsers.rejected, (state, action) => {
      state.userList = [];
      state.isLoading = false;
      console.error(action.error);
    });
  },
});

export const {
  updateSelectedUser,
  updateSearchValue,
  updateSearchedUsers,
  updateLoadingUsers,
  updateRemoveFollowerUser,
  updateAddBookmark,
  updateRemoveBookmark,
  updateTab,
  updateUser,
  getUserListComment,
  updateLoadingForComment,
} = userSlice.actions;

export const userReducer = userSlice.reducer;
