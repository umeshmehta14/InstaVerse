import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getNotifications, homePosts } from "../../service/postService";
import toast from "react-hot-toast";

const initialState = {
  notifications: [],
  notificationLoader: false,
  posts: [],
  totalPages: 0,
  currentPage: 1,
  postLoading: false,
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
    console.log("postAssced", page);
    const { token } = getState().authentication;
    const {
      data: { statusCode, data },
    } = await homePosts(page, token);
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
      state.postLoading = true;
    });

    builder.addCase(getHomePosts.fulfilled, (state, action) => {
      const { posts, totalPages, currentPage } = action.payload;
      const existingPostIds = new Set(state.posts.map((post) => post._id));
      const newPosts = posts.filter((post) => !existingPostIds.has(post._id));

      state.posts = [...state.posts, ...newPosts];
      state.totalPages = totalPages;
      state.currentPage = currentPage;
      state.postLoading = false;
    });

    builder.addCase(getHomePosts.rejected, (state, action) => {
      toast.error("Something went wrong");
      console.error(action.error);
      state.postLoading = false;
    });
  },
});

export const { updateNewPostLoading, updateCurrentPage } = postSlice.actions;

export const postReducer = postSlice.reducer;
