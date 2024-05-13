import axios from "axios";
import { API_URL } from "../utils/Constants";

export const getLoginInformation = async (identifier, password) =>
  await axios.post(`${API_URL}/user/log-in`, {
    identifier,
    password,
  });

export const createUser = async (fullName, username, password, email) =>
  await axios.post(`${API_URL}/user/sign-up`, {
    fullName,
    username,
    password,
    email,
  });

export const userLogout = async (token) =>
  await axios.get(`http://localhost:8000/api/v1/user/logout`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const refreshUserToken = async (refreshToken) =>
  await axios.post(`${API_URL}/user/refresh-token`, {
    refreshToken,
  });
