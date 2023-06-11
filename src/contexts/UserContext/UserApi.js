import axios from "axios";

export const getAllUser = async () => await axios.get("/api/users");

export const getSingleUser = async () => await axios.get(`/api/users/${"umeshmehta14"}`);
