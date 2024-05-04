import { createAsyncThunk, createSlice, createAction } from "@reduxjs/toolkit";
import { getLoginInformation } from "./AuthApi";

const initialState = {
  token: localStorage.getItem("instaverseUser")?.token,
  currentUser: localStorage.getItem("instaverseUser")?.user,
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

export const updateProgress = createAction("authentication/updateProgress");

const authentication = createSlice({
  name: "authentication",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(updateProgress, (state, action) => {
      state.progress = action.payload;
    });

    builder.addCase(loginHandler.pending, (state, action) => {
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
      console.log(action.payload);
    });
  },
});

export const authenticationReducer = authentication.reducer;
