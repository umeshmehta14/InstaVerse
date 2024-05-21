import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  explorePosts,
  getNotifications,
  homePosts,
} from "../../service/postService";
import toast from "react-hot-toast";

const initialState = {
  notifications: [],
  notificationLoader: false,
  homePosts: {
    posts: [],
    totalPages: 0,
    currentPage: 1,
    postFetched: false,
  },
  explorePosts: {
    posts: [],
    totalPages: 0,
    currentPage: 1,
  },
  newPostLoading: false,
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

export const getHomePosts = createAsyncThunk(
  "post/home",
  async ({ page }, { getState }) => {
    const { token } = getState().authentication;
    const {
      data: { statusCode, data },
    } = await homePosts(page, token);
    if (statusCode === 200) {
      return data;
    }
  }
);

export const getExplorePosts = createAsyncThunk(
  "post/explore",
  async ({ page }, { getState }) => {
    const { token } = getState().authentication;
    const {
      data: { statusCode, data },
    } = await explorePosts(page, token);
    if (statusCode === 200) {
      return data;
    }
  }
);

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    updateNewPostLoading: (state) => {
      state.newPostLoading = !state.newPostLoading;
    },

    updateCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
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

    builder.addCase(getHomePosts.pending, (state) => {
      state.homePosts.postFetched = false;
    });

    builder.addCase(getHomePosts.fulfilled, (state, action) => {
      const { posts, totalPages, currentPage } = action.payload;
      const existingPostIds = new Set(
        state.homePosts.posts.map((post) => post._id)
      );
      const newPosts = posts.filter((post) => !existingPostIds.has(post._id));

      state.homePosts.posts = [...state.homePosts.posts, ...newPosts];
      state.homePosts.totalPages = totalPages;
      state.homePosts.currentPage = currentPage;
      state.newPostLoading = false;
      state.homePosts.postFetched = true;
    });

    builder.addCase(getHomePosts.rejected, (state, action) => {
      toast.error("Something went wrong");
      console.error(action.error);
      state.newPostLoading = false;
      state.homePosts.postFetched = true;
    });
  },
});

export const { updateNewPostLoading, updateCurrentPage } = postSlice.actions;

export const postReducer = postSlice.reducer;
