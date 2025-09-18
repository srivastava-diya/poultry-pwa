import axios from "axios";

const API_URL = "http://localhost:8000/api/users";

export const authService = {
  login: async ({ email, password }) => {
    const res = await axios.post(`${API_URL}/login`, { email, password});
    console.log("Login Successful");  //test
    return res.data;
  },
  register: async (data) => {
    const res = await axios.post(`${API_URL}/register`, data);
    return res.data;
  },
};
