import axios from "axios";

export const getLoginInformation = async (username,password) => await axios.post('/api/auth/login', {
    username,
    password
});
export const createUser = async (firstName, lastName, username,password) => await axios.post('/api/auth/signup', {
    username,
    password,
    firstName,
    lastName
});