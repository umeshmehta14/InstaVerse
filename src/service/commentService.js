import axios from "axios";
import { API_URL } from "../utils/Constants";

export const addComment = async (postId, text, token) =>
  axios.post(
    `${API_URL}/post/comment/${postId}`,
    { text },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

export const deleteComment = async (commentId, token) =>
  axios.delete(`${API_URL}/post/comment/${commentId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const editComment = async (commentId, text, token) =>
  axios.patch(
    `${API_URL}/post/comment/${commentId}`,
    { text },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

export const likeComment = async (commentId, token) =>
  axios.patch(
    `${API_URL}/post/comment/like/${commentId}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

export const removelikeFromComment = async (commentId, token) =>
  axios.patch(
    `${API_URL}/post/comment/unlike/${commentId}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

export const addReply = async (commentId, text, token) =>
  axios.patch(
    `${API_URL}/post/comment/${commentId}/reply`,
    { text },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

export const deleteReply = async (commentId, replyId, token) =>
  axios.delete(`${API_URL}/post/comment/${commentId}/replies/${replyId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const likeReplyComment = async (commentId, replyId, token) =>
  axios.patch(
    `${API_URL}/post/comment/${commentId}/replies/${replyId}/like`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

export const unlikeReplyComment = async (commentId, replyId, token) =>
  axios.patch(
    `${API_URL}/post/comment/${commentId}/replies/${replyId}/unlike`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
