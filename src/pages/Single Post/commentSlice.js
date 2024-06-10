import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addComment, deleteComment } from "../../service/commentService";
import { updateDeleteComment, updatePostComment } from "../Post Feed/postSlice";

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

export const deleteCommentToPost = createAsyncThunk(
  "comment/delete",
  async ({ _id }, { getState, dispatch }) => {
    const { token } = getState().authentication;
    dispatch(updateDeleteComment({ _id }));
    const {
      data: { statusCode, data },
    } = await deleteComment(_id, token);
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
    builder.addCase(deleteCommentToPost.rejected, (state, action) => {
      console.error(action.error);
    });
  },
});

export const commentReducer = commentSlice.reducer;
