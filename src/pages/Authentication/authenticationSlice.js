import { createAsyncThunk, createSlice, createAction } from "@reduxjs/toolkit";
import {
  createUser,
  getLoginInformation,
  refreshUserToken,
  userLogout,
} from "../../service/authService.js";
import toast from "react-hot-toast";

const initialState = {
  token: JSON.parse(localStorage.getItem("instaverseUser"))?.token,
  currentUser: JSON.parse(localStorage.getItem("instaverseUser"))?.user,
  progress: 0,
};

export const loginHandler = createAsyncThunk(
  "authentication/login",
  async ({ identifier, password }, thunkAPI) => {
    thunkAPI.dispatch(updateProgress(20));
    const {
      data: { statusCode, data },
    } = await getLoginInformation(identifier, password);
    if (statusCode === 200) {
      return data;
    }
  }
);

export const signupHandler = createAsyncThunk(
  "authentication/signup",
  async ({ fullName, username, password, email }, thunkAPI) => {
    thunkAPI.dispatch(updateProgress(20));
    const {
      data: { statusCode, data },
    } = await createUser(fullName, username, password, email);
    if (statusCode === 201) {
      return data;
    }
  }
);

export const logoutHandler = createAsyncThunk(
  "authentication/logout",
  async (_, thunkAPI) => {
    console.log("logout accessed");
    const { token } = thunkAPI.getState().authentication;
    const res = await userLogout(token);
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
  reducers: {},
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
      toast.error("Something went wrong");
      console.log(action.error);
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
      toast.error("Something went wrong");
      console.log(action.error);
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

export const authenticationReducer = authenticationSlice.reducer;
