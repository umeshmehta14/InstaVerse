import axios from "axios";

export const getAllPosts = async () => await axios.get("/api/posts");

export const likePost = async (postId, token) =>
  await axios.post(`/api/posts/like/${postId}`,{}, {
    headers: {
      authorization: token,
    },
  });
