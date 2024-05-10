import axios from "axios";
import { API_URL } from "../utils/Constants";

export const guestUsers = async (token) =>
  await axios.get(`${API_URL}/user/guest`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const getByUsername = async (username, token) =>
  await axios.get(`${API_URL}/user/${username}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const searchUser = async (searchValue, token) =>
  await axios.get(`${API_URL}/user/search?query=${searchValue}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const getSearchList = async (token) =>
  await axios.get(`${API_URL}/user/searchList`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const addSearchList = async (userId, token) =>
  await axios.patch(
    `${API_URL}/user/searchList/add/${userId}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

export const removeSearchList = async (userId, token) =>
  await axios.patch(
    `${API_URL}/user/searchList/remove/${userId}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

export const clearSearchList = async (token) =>
  await axios.patch(
    `${API_URL}/user/searchList/clear`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

export const getBookmark = async (token) =>
  await axios.get(`${API_URL}/user/bookmark`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const addBookmark = async (postId, token) =>
  await axios.patch(
    `${API_URL}/user/bookmark/add/${postId}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

export const removeBookmark = async (postId, token) =>
  await axios.patch(
    `${API_URL}/user/bookmark/${postId}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

export const getLikedPosts = async (token) =>
  await axios.get(`${API_URL}/user/liked-posts`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const editProfile = async ({ updateData }, token) =>
  await axios.post(`${API_URL}/user/update-profile`, updateData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const followUser = async (userId, token) =>
  await axios.patch(
    `${API_URL}/user/follow/${userId}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

export const unfollowUser = async (userId, token) =>
  await axios.patch(
    `${API_URL}/user/unfollow/${userId}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
