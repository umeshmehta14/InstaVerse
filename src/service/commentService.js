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
