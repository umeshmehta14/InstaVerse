import axios from "axios";

export const getAllPosts = async () => await axios.get("/api/posts");
