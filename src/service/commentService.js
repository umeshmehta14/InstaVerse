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
