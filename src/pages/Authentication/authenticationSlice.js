import { createAsyncThunk, createSlice, createAction } from "@reduxjs/toolkit";
import {
  createUser,
  getLoginInformation,
  refreshUserToken,
  userLogout,
} from "../../service/authService.js";
import toast from "react-hot-toast";
import { updatePosts } from "../Post Feed/postSlice.js";
import { updateUser } from "../Post Feed/userSlice.js";

const initialState = {
  token: JSON.parse(localStorage.getItem("instaverseUser"))?.token,
  currentUser: JSON.parse(localStorage.getItem("instaverseUser"))?.user,
  progress: 0,
};

export const loginHandler = createAsyncThunk(
  "authentication/login",
  async ({ identifier, password }, { dispatch, rejectWithValue }) => {
    try {
      dispatch(updateProgress(20));
      const {
        data: { statusCode, data },
      } = await getLoginInformation(identifier, password);
      if (statusCode === 200) {
        return data;
      }
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const signupHandler = createAsyncThunk(
  "authentication/signup",
  async (
    { fullName, username, password, email },
    { rejectWithValue, dispatch }
  ) => {
    try {
      dispatch(updateProgress(20));
      const {
        data: { statusCode, data },
      } = await createUser(fullName, username, password, email);
      if (statusCode === 201) {
        return data;
      }
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const logoutHandler = createAsyncThunk(
  "authentication/logout",
  async (_, { getState, dispatch }) => {
    const { token } = getState().authentication;
    const res = await userLogout(token);
    dispatch(updatePosts());
    return res;
  }
);

export const refreshTokens = createAsyncThunk(
  "authentication/refreshTokens",
  async () => {
    const {
      data: { statusCode, data },
    } = await refreshUserToken(
      JSON.parse(localStorage.getItem("instaverseUser"))?.refreshToken
    );
    if (statusCode === 200) {
      return data;
    }
  }
);

export const updateProgress = createAction("authentication/updateProgress");

const authenticationSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    updateCurrentUser: (state, action) => {
      state.currentUser = action.payload;
      const instaverseUserData =
        JSON.parse(localStorage.getItem("instaverseUser")) || {};
      const updatedUserData = {
        ...instaverseUserData,
        user: action.payload,
      };
      localStorage.setItem("instaverseUser", JSON.stringify(updatedUserData));
    },

    updateCurrentUserFollowing: (state, action) => {
      state.currentUser.following = action.payload.following;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(updateProgress, (state, action) => {
      state.progress = action.payload;
    });

    builder.addCase(loginHandler.pending, (state) => {
      state.progress = 50;
    });

    builder.addCase(loginHandler.fulfilled, (state, action) => {
      const { user, refreshToken, accessToken } = action.payload;
      state.progress = 100;
      state.currentUser = user;
      state.token = accessToken;
      localStorage.setItem(
        "instaverseUser",
        JSON.stringify({ user, token: accessToken, refreshToken })
      );
    });

    builder.addCase(loginHandler.rejected, (state, action) => {
      state.progress = 100;
      toast.error(action.payload.error);
      console.error(action.payload.error);
    });

    builder.addCase(signupHandler.pending, (state) => {
      state.progress = 50;
    });

    builder.addCase(signupHandler.fulfilled, (state, action) => {
      state.progress = 100;
      const { createdUser, refreshToken, accessToken } = action.payload;
      state.currentUser = createdUser;
      state.token = accessToken;
      localStorage.setItem(
        "instaverseUser",
        JSON.stringify({ user: createdUser, token: accessToken, refreshToken })
      );
    });

    builder.addCase(signupHandler.rejected, (state, action) => {
      state.progress = 100;
      toast.error(action.payload.error);
      console.error(action.payload.error);
    });

    builder.addCase(logoutHandler.fulfilled, (state) => {
      localStorage.removeItem("instaverseUser");
      state.token = null;
      state.currentUser = null;
    });

    builder.addCase(logoutHandler.rejected, (_, action) => {
      toast.error("Something went wrong");
      console.log(action.error);
    });

    builder.addCase(refreshTokens.fulfilled, (state, action) => {
      const { accessToken, refreshToken, user } = action.payload;
      state.currentUser = user;
      state.token = accessToken;
      localStorage.setItem(
        "instaverseUser",
        JSON.stringify({ user, token: accessToken, refreshToken })
      );
    });

    builder.addCase(refreshTokens.rejected, (state) => {
      localStorage.removeItem("instaverseUser");
      state.token = null;
      state.currentUser = null;
      toast.error(`Session Expired Login Again`);
      console.error("refrsh token error");
    });
  },
});

export const { updateCurrentUser, updateCurrentUserFollowing } =
  authenticationSlice.actions;

export const authenticationReducer = authenticationSlice.reducer;
