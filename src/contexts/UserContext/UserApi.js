import axios from "axios";

export const getAllUser = async () => await axios.get("/api/users");

export const getSingleUser = async (username) =>
  await axios.get(`/api/users/${username}`);

export const addToBookmark = async (postId, token) =>
  await axios.post(
    `/api/users/bookmark/${postId}`,
    {},
    {
      headers: {
        authorization: token,
      },
    }
  );

export const removeFromBookmark = async (postId, token) =>
  await axios.post(
    `/api/users/remove-bookmark/${postId}`,
    {},
    {
      headers: {
        authorization: token,
      },
    }
  );

export const followUser = async (followUserId, token) =>
  await axios.post(
    `/api/users/follow/${followUserId}`,
    {},
    {
      headers: {
        authorization: token,
      },
    }
  );

export const unfollowUser = async (unfollowUserId, token) =>
  await axios.post(
    `/api/users/unfollow/${unfollowUserId}`,
    {},
    {
      headers: {
        authorization: token,
      },
    }
  );

export const editUser = async (userData, token) =>
  await axios.post(
    "/api/users/edit",
    {
      userData,
    },
    {
      headers: {
        authorization: token,
      },
    }
  );
