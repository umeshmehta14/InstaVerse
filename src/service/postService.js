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
