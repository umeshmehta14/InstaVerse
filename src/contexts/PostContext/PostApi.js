import axios from "axios";

export const getAllPosts = async () => await axios.get("/api/posts");

export const getAllUserPost = async (username) =>
  await axios.get(`/api/posts/user/${username}`);

export const likePost = async (postId, token) =>
  await axios.post(
    `/api/posts/like/${postId}`,
    {},
    {
      headers: {
        authorization: token,
      },
    }
  );

export const unLikePost = async (postId, token) =>
  await axios.post(
    `/api/posts/dislike/${postId}`,
    {},
    {
      headers: {
        authorization: token,
      },
    }
  );

export const createPost = async (token, postData) =>
  await axios.post(
    "/api/posts",
    { postData },
    {
      headers: {
        authorization: token,
      },
    }
  );

export const deletePost = async (postId, token) =>
  await axios.delete(`/api/posts/${postId}`, {
    headers: {
      authorization: token,
    },
  });

export const EditPost = async (postData, token) =>
  await axios.post(
    `/api/posts/edit/${postData._id}`,
    { postData },
    {
      headers: {
        authorization: token,
      },
    }
  );
