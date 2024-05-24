import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addLike,
  deletePost,
  explorePosts,
  getNotifications,
  homePosts,
  removeLike,
  uploadPost,
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
    postFetched: false,
  },
  newPostLoading: false,
  uploadPost: {
    caption: "",
    url: "",
  },
  isUploading: false,
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
  async ({ page, noLoading }, { getState }) => {
    const { token } = getState().authentication;
    const {
      data: { statusCode, data },
    } = await homePosts(page, token);
    if (statusCode === 200) {
      return { data, noLoading };
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

export const handleUploadPost = createAsyncThunk(
  "post/upload",
  async ({ postData }, { getState, rejectWithValue }) => {
    try {
      const { token } = getState().authentication;
      const {
        data: { statusCode, data },
      } = await uploadPost(postData, token);
      if (statusCode === 200) {
        return data;
      }
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const handleDeletePost = createAsyncThunk(
  "post/delete",
  async ({ _id }, { getState, dispatch }) => {
    const { token } = getState().authentication;
    const {
      data: { statusCode },
    } = await deletePost(_id, token);
    if (statusCode === 200) {
      dispatch(getHomePosts({ page: 1 }));
      dispatch(getExplorePosts({ page: 1 }));
      return _id;
    }
  }
);

export const handleLikes = createAsyncThunk(
  "post/like",
  async ({ _id, unlike }, { getState, dispatch }) => {
    const { token, currentUser } = getState().authentication;
    unlike
      ? dispatch(removePostLike({ _id, currentUser }))
      : dispatch(updatePostLikes({ _id, currentUser }));
    const {
      data: { statusCode, data },
    } = unlike ? await removeLike(_id, token) : await addLike(_id, token);
    if (statusCode === 200) {
      return { data, _id };
    }
  }
);

const updatePostLike = (posts, _id, currentUser, addLike = true) =>
  posts.map((post) =>
    post._id === _id
      ? {
          ...post,
          likes: addLike
            ? [currentUser, ...post.likes]
            : post.likes.filter((user) => user._id !== currentUser._id),
        }
      : post
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

    updatePosts: () => {
      return initialState;
    },

    updateUploadPost: (state, action) => {
      state.uploadPost = action.payload;
    },

    updatePostLikes: (state, action) => {
      const { currentUser, _id } = action.payload;

      const { posts: homePosts } = state.homePosts;
      const { posts: explorePosts } = state.explorePosts;

      if (homePosts) {
        state.homePosts.posts = updatePostLike(homePosts, _id, currentUser);
      }

      if (explorePosts) {
        state.explorePosts.posts = updatePostLike(
          explorePosts,
          _id,
          currentUser
        );
      }
    },
    removePostLike: (state, action) => {
      const { currentUser, _id } = action.payload;

      const { posts: homePosts } = state.homePosts;
      const { posts: explorePosts } = state.explorePosts;

      if (homePosts) {
        state.homePosts.posts = updatePostLike(
          homePosts,
          _id,
          currentUser,
          false
        );
      }

      if (explorePosts) {
        state.explorePosts.posts = updatePostLike(
          explorePosts,
          _id,
          currentUser,
          false
        );
      }
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

    builder.addCase(getHomePosts.pending, (state, action) => {
      const { noLoading } = action.meta.arg;

      if (!noLoading) {
        state.homePosts.postFetched = false;
      }
    });

    builder.addCase(getHomePosts.fulfilled, (state, action) => {
      const {
        data: { posts, totalPages, currentPage },
        noLoading,
      } = action.payload;
      const existingPostIds = new Set(
        state.homePosts.posts.map((post) => post._id)
      );
      const newPosts = posts.filter((post) => !existingPostIds.has(post._id));

      state.homePosts.posts = [...state.homePosts.posts, ...newPosts];
      state.homePosts.totalPages = totalPages;
      state.homePosts.currentPage = currentPage;
      if (!noLoading) {
        state.newPostLoading = false;
        state.homePosts.postFetched = true;
      }
    });

    builder.addCase(getHomePosts.rejected, (state, action) => {
      toast.error("Something went wrong");
      console.error(action.error);
      state.newPostLoading = false;
      state.homePosts.postFetched = true;
    });

    builder.addCase(getExplorePosts.pending, (state) => {
      state.explorePosts.postFetched = false;
    });

    builder.addCase(getExplorePosts.fulfilled, (state, action) => {
      const { posts, totalPages, currentPage } = action.payload;
      const existingPostIds = new Set(
        state.explorePosts.posts.map((post) => post._id)
      );
      const newPosts = posts.filter((post) => !existingPostIds.has(post._id));

      state.explorePosts.posts = [...state.explorePosts.posts, ...newPosts];
      state.explorePosts.totalPages = totalPages;
      state.explorePosts.currentPage = currentPage;
      state.newPostLoading = false;
      state.explorePosts.postFetched = true;
    });

    builder.addCase(getExplorePosts.rejected, (state, action) => {
      toast.error("Something went wrong");
      console.error(action.error);
      state.newPostLoading = false;
      state.explorePosts.postFetched = true;
    });

    builder.addCase(handleUploadPost.pending, (state) => {
      state.isUploading = true;
    });

    builder.addCase(handleUploadPost.fulfilled, (state, action) => {
      state.homePosts.posts = [action.payload, ...state.homePosts.posts];
      state.explorePosts.posts = [action.payload, ...state.explorePosts.posts];
      state.isUploading = false;
    });

    builder.addCase(handleUploadPost.rejected, (state, action) => {
      toast.error(action.payload?.message);
      console.error(action.payload?.message);
      state.isUploading = false;
    });

    builder.addCase(handleDeletePost.fulfilled, (state, action) => {
      state.homePosts.posts = state.homePosts.posts?.filter(
        (post) => post._id !== action.payload
      );
      state.explorePosts.posts = state.explorePosts.posts?.filter(
        (post) => post._id !== action.payload
      );
    });

    builder.addCase(handleLikes.fulfilled, (state, action) => {
      const { data, _id } = action.payload;

      const updateLikes = (posts) =>
        posts.map((post) =>
          post._id === _id ? { ...post, likes: data } : post
        );

      const { posts: homePosts } = state.homePosts;
      const { posts: explorePosts } = state.explorePosts;

      if (homePosts) {
        state.homePosts.posts = updateLikes(homePosts);
      }

      if (explorePosts) {
        state.explorePosts.posts = updateLikes(explorePosts);
      }
    });
  },
});

export const {
  updateNewPostLoading,
  updateCurrentPage,
  updatePosts,
  updateUploadPost,
  updatePostLikes,
  removePostLike,
} = postSlice.actions;

export const postReducer = postSlice.reducer;
