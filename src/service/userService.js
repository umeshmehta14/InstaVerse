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
