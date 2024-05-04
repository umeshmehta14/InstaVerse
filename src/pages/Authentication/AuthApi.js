import axios from "axios";
import { API_URL } from "../../utils/Constants";

export const getLoginInformation = async (identifier, password) =>
  await axios.post(`${API_URL}/user/log-in`, {
    identifier,
    password,
  });

export const createUser = async (firstName, lastName, username, password) =>
  await axios.post("/api/auth/signup", {
    username,
    password,
    firstName,
    lastName,
  });
