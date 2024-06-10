import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addComment } from "../../service/commentService";
import { updatePostComment } from "../Post Feed/postSlice";

const initialState = {
  commentLoader: false,
};

export const addCommentToPost = createAsyncThunk(
  "comment/add",
  async ({ _id, text }, { getState, dispatch }) => {
    const { token } = getState().authentication;
    const {
      data: { statusCode, data },
    } = await addComment(_id, text, token);
    if (statusCode === 201) {
      dispatch(updatePostComment({ data, _id }));
      return data;
    }
  }
);

const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addCommentToPost.pending, (state, action) => {
      state.commentLoader = true;
    });
    builder.addCase(addCommentToPost.fulfilled, (state, action) => {
      state.commentLoader = false;
    });
    builder.addCase(addCommentToPost.rejected, (state, action) => {
      state.commentLoader = false;
    });
  },
});

export const commentReducer = commentSlice.reducer;
