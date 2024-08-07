import { createAsyncThunk, createSlice, createAction } from "@reduxjs/toolkit";
import {
  createUser,
  getLoginInformation,
  refreshUserToken,
  resetPassword,
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
  confirmationCode: "",
  otpDetails: {
    otpSent: false,
    errorMessage: "",
    verified: false,
  },
  btnLoader: false,
  buttonDisable: false,
  passwordReset: false,
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
        dispatch(
          updateSignupForm({
            fullName: "",
            email: "",
            username: "",
            password: "",
          })
        );
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
  async ({ email, login, identifier }, { rejectWithValue }) => {
    try {
      const {
        data: { statusCode, data },
      } = await sendOtp({ email, login, identifier });
      if (statusCode === 200) {
        return data?.email;
      }
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const verifyUserOtp = createAsyncThunk(
  "authentication/user/verify-otp",
  async ({ email, otp, login, identifier }, { rejectWithValue }) => {
    try {
      const {
        data: { statusCode },
      } = await verifyOtp({ email, otp, login, identifier });
      if (statusCode === 200) {
        return;
      }
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const resetUserPassword = createAsyncThunk(
  "authentication/user/reset/password",
  async ({ password, identifier }, { rejectWithValue }) => {
    try {
      const {
        data: { statusCode },
      } = await resetPassword({ password, identifier });
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

    updateButtonDisable: (state, action) => {
      state.buttonDisable = action.payload;
    },

    updateConfirmationCode: (state, action) => {
      state.confirmationCode = action.payload;
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
    });

    builder.addCase(logoutHandler.fulfilled, (state) => {
      localStorage.removeItem("instaverseUser");
      state.token = null;
      state.currentUser = null;
    });

    builder.addCase(logoutHandler.rejected, (_, action) => {
      toast.error("Something went wrong");
      console.error(action.error);
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

    builder.addCase(sendOtpToEmail.pending, (state) => {
      state.btnLoader = true;
    });

    builder.addCase(sendOtpToEmail.fulfilled, (state, action) => {
      state.otpDetails.otpSent = true;
      action.payload &&
        toast.success(`otp sent successfully to ${action.payload}`);
      state.btnLoader = false;
    });

    builder.addCase(sendOtpToEmail.rejected, (state, action) => {
      state.btnLoader = false;
      action.payload.error
        ? toast.error(action.payload.error)
        : toast.error("Something went wrong, please try again later");
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
      const { login } = action.meta.arg;
      state.otpDetails.otpSent = false;
      state.confirmationCode = "";

      if (login) {
        toast.error(action.payload.message);
      } else {
        state.otpDetails.errorMessage = action.payload.message;
      }
      state.btnLoader = false;
    });

    builder.addCase(resetUserPassword.pending, (state) => {
      state.btnLoader = true;
      state.passwordReset = false;
    });

    builder.addCase(resetUserPassword.fulfilled, (state) => {
      state.otpDetails.errorMessage = "";
      state.btnLoader = false;
      state.passwordReset = true;
      toast.success(
        "Password reset successful. Please log in with your new password."
      );
    });

    builder.addCase(resetUserPassword.rejected, (state, action) => {
      state.otpDetails.errorMessage = action.payload.message;
      state.btnLoader = false;
    });
  },
});

export const {
  updateCurrentUser,
  updateCurrentUserFollowing,
  updateLoginForm,
  updateShowPassword,
  updateSignupForm,
  updateButtonDisable,
  updateConfirmationCode,
} = authenticationSlice.actions;

export const authenticationReducer = authenticationSlice.reducer;
