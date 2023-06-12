import axios from "axios";

export const getLoginInformation = async (username,password) => await axios.post('/api/auth/login', {
    username,
    password
});
export const createUser = async (firstName, lastName, email,password) => await axios.post('/api/auth/signup', {
    email,
    password,
    firstName,
    lastName
});