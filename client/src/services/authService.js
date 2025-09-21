// src/services/authService.js
import axios from "axios";

const API_URL = "http://localhost:8000/api/users"; 

export const authService = {
 register: async ({ name, email, password, role, farmId }) => {
  const payload = {
    name,
    email,
    passwordHash: password,  
    role
  };
  if (farmId && farmId.trim() !== "") {
    payload.farmId = farmId;
  }

  const res = await axios.post(`${API_URL}/register`, payload);
  return res.data;
},



  login: async ({ email, password }) => {
    const res = await axios.post(`${API_URL}/login`, { email, password });
    return res.data;
  },

  getMe: async (token) => {
    const res = await axios.get(`${API_URL}/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  },
};
