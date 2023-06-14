import axios from "axios";

export const getAllUser = async () => await axios.get("/api/users");

export const getSingleUser = async () => await axios.get(`/api/users/${"umeshmehta14"}`);

export const addToBookmark = async (postId, token) =>
  await axios.post(`/api/users/bookmark/${postId}`,{}, {
    headers: {
      authorization: token,
    },
  });

export const removeFromBookmark = async (postId, token) =>
  await axios.post(`/api/users/remove-bookmark/${postId}`,{}, {
    headers: {
      authorization: token,
    },
  });
