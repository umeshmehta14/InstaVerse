import axios from "axios";

export const getAllUser = async () => await axios.get("/api/users");