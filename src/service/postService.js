import axios from "axios";
import { API_URL } from "../utils/Constants";

export const getNotifications = async (token) =>
  await axios.get(`${API_URL}/notification/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
