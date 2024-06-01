import { createAsyncThunk, createSlice, createAction } from "@reduxjs/toolkit";
import {
  createUser,
  getLoginInformation,
  refreshUserToken,
  sendOtp,
  userLogout,
  validateUserDetails,
  verifyOtp,
} from "../../service/authService.js";
import toast from "react-hot-toast";
import { updatePosts } from "../Post Feed/postSlice.js";

const initialState = {
  token: JSON.parse(localStorage.getItem("instaverseUser"))?.token,
  currentUser: JSON.parse(localStorage.getItem("instaverseUser"))?.user,
  progress: 0,
  loginForm: {
    identifier: "",
    password: "",
  },
  signupForm: {
    username: "",
    password: "",
    fullName: "",
    email: "",
  },
  formValidation: {
    username: false,
    password: false,
    email: false,
    errorText: "",
  },
  showPassword: false,
  otpDetails: {
    otpSent: false,
    errorMessage: "",
    verified: false,
  },
  btnLoader: false,
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

export const validateFromDetails = createAsyncThunk(
  "authentication/user/validation",
  async (userDetails) => {
    const {
      data: { statusCode, data },
    } = await validateUserDetails(userDetails);
    if (statusCode === 200) {
      return data;
    }
  }
);

export const sendOtpToEmail = createAsyncThunk(
  "authentication/user/send-otp",
  async (email) => {
    const {
      data: { statusCode },
    } = await sendOtp(email);
    if (statusCode === 200) {
      return;
    }
  }
);

export const verifyUserOtp = createAsyncThunk(
  "authentication/user/verify-otp",
  async ({ email, otp }, { rejectWithValue }) => {
    try {
      const {
        data: { statusCode },
      } = await verifyOtp({ email, otp });
      if (statusCode === 200) {
        return;
      }
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateProgress = createAction("authentication/updateProgress");

const authenticationSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    updateLoginForm: (state, action) => {
      state.loginForm = action.payload;
    },

    updateSignupForm: (state, action) => {
      state.signupForm = action.payload;
    },

    updateShowPassword: (state) => {
      state.showPassword = !state.showPassword;
    },

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
      state.otpDetails.verified = false;
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

    builder.addCase(validateFromDetails.fulfilled, (state, action) => {
      const { username, password, text, email } = action.payload;
      state.formValidation.username = username;
      state.formValidation.password = password;
      state.formValidation.email = email;
      state.formValidation.errorText = text;
    });

    builder.addCase(validateFromDetails.rejected, (_, action) => {
      console.error(action.error);
    });

    builder.addCase(sendOtpToEmail.fulfilled, (state) => {
      state.otpDetails.otpSent = true;
    });

    builder.addCase(sendOtpToEmail.rejected, (_, action) => {
      toast.error("Something went wrong, please try again later");
      console.error(action.error);
    });

    builder.addCase(verifyUserOtp.pending, (state) => {
      state.btnLoader = true;
    });

    builder.addCase(verifyUserOtp.fulfilled, (state) => {
      state.otpDetails.verified = true;
      state.otpDetails.errorMessage = "";
      state.btnLoader = false;
    });

    builder.addCase(verifyUserOtp.rejected, (state, action) => {
      console.error(action.payload.message);
      state.btnLoader = false;
      state.otpDetails.errorMessage = action.payload.message;
    });
  },
});

export const {
  updateCurrentUser,
  updateCurrentUserFollowing,
  updateLoginForm,
  updateShowPassword,
  updateSignupForm,
} = authenticationSlice.actions;

export const authenticationReducer = authenticationSlice.reducer;
