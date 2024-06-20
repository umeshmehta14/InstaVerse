import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addComment,
  addReply,
  deleteComment,
  deleteReply,
  editComment,
  likeComment,
  likeReplyComment,
  removelikeFromComment,
  unlikeReplyComment,
} from "../../service/commentService";
import {
  removeCommentLike,
  removeReplyCommentLike,
  updateCommentLike,
  updateDeleteComment,
  updatePostComment,
  updateReplyCommentLike,
} from "../Post Feed/postSlice";

const initialState = {
  commentLoader: false,
  repliedComment: {
    commentId: "",
    repliedUsername: "",
  },
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
    if (statusCode === 200) {
      dispatch(updatePostComment({ data, _id }));
      return data;
    }
  }
);

export const editCommentToPost = createAsyncThunk(
  "comment/edit",
  async ({ _id, text }, { getState, dispatch }) => {
    const { token } = getState().authentication;
    const {
      data: { statusCode, data },
    } = await editComment(_id, text, token);
    if (statusCode === 200) {
      dispatch(updatePostComment({ data, _id }));
      return data;
    }
  }
);

export const handleCommentLike = createAsyncThunk(
  "comment/like-unlike",
  async ({ _id, unlike }, { getState, dispatch }) => {
    const { token, currentUser } = getState().authentication;
    unlike
      ? dispatch(removeCommentLike({ _id, currentUser }))
      : dispatch(updateCommentLike({ _id, currentUser }));

    const {
      data: { statusCode, data },
    } = unlike
      ? await removelikeFromComment(_id, token)
      : await likeComment(_id, token);
    if (statusCode === 200) {
      dispatch(updatePostComment({ data, _id }));
      return data;
    }
  }
);

export const addReplyToComment = createAsyncThunk(
  "comment/add/reply",
  async ({ commentId, text }, { getState, dispatch }) => {
    const { token } = getState().authentication;
    const {
      data: { statusCode, data },
    } = await addReply(commentId, text, token);
    if (statusCode === 201) {
      dispatch(updatePostComment({ data, _id: commentId }));
      return data;
    }
  }
);

export const deleteReplyFromComment = createAsyncThunk(
  "comment/delete/reply",
  async ({ commentId, replyId }, { getState, dispatch }) => {
    const { token } = getState().authentication;
    const {
      data: { statusCode, data },
    } = await deleteReply(commentId, replyId, token);
    if (statusCode === 200) {
      dispatch(updatePostComment({ data, _id: commentId }));
      return data;
    }
  }
);

export const handleReplyCommentLike = createAsyncThunk(
  "comment/like-unlike/reply",
  async ({ commentId, replyId, unlike }, { dispatch, getState }) => {
    const { token, currentUser } = getState().authentication;
    unlike
      ? dispatch(removeReplyCommentLike({ commentId, replyId, currentUser }))
      : dispatch(updateReplyCommentLike({ commentId, replyId, currentUser }));
    const {
      data: { statusCode, data },
    } = unlike
      ? await unlikeReplyComment(commentId, replyId, token)
      : await likeReplyComment(commentId, replyId, token);
    if (statusCode === 200) {
      dispatch(updatePostComment({ data, _id: commentId }));
      return data;
    }
  }
);

const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {
    updateReplyComment: (state, action) => {
      state.repliedComment = action.payload;
    },
  },
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

    builder.addCase(editCommentToPost.pending, (state, action) => {
      state.commentLoader = true;
    });

    builder.addCase(editCommentToPost.fulfilled, (state, action) => {
      state.commentLoader = false;
    });

    builder.addCase(editCommentToPost.rejected, (state, action) => {
      state.commentLoader = false;
    });

    builder.addCase(handleCommentLike.rejected, (state, action) => {
      console.error(action.error);
    });

    builder.addCase(handleReplyCommentLike.rejected, (state, action) => {
      console.error(action.error);
    });

    builder.addCase(addReplyToComment.pending, (state, action) => {
      state.commentLoader = true;
    });

    builder.addCase(addReplyToComment.fulfilled, (state, action) => {
      state.commentLoader = false;
    });

    builder.addCase(addReplyToComment.rejected, (state, action) => {
      state.commentLoader = false;
    });
  },
});

export const { updateReplyComment } = commentSlice.actions;

export const commentReducer = commentSlice.reducer;
