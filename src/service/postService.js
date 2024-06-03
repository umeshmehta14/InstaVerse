import axios from "axios";
import { API_URL } from "../utils/Constants";

export const getNotifications = async (token) =>
  await axios.get(`${API_URL}/notification/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const homePosts = async (page, token) =>
  await axios.get(`${API_URL}/post/home?page=${page}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const explorePosts = async (page, token) =>
  await axios.get(`${API_URL}/post?page=${page}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const uploadPost = async (postData, token) =>
  await axios.post(`${API_URL}/post/upload`, postData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const deletePost = async (postId, token) =>
  await axios.delete(`${API_URL}/post/delete/${postId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const addLike = async (postId, token) =>
  await axios.patch(
    `${API_URL}/post/like/${postId}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

export const removeLike = async (postId, token) =>
  await axios.patch(
    `${API_URL}/post/unlike/${postId}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

export const getPostById = async (postId, token) =>
  await axios.get(`${API_URL}/post/${postId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
