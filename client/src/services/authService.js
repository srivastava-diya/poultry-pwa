// src/services/authService.js
import api from "./httpClient";
import { toast } from "react-toastify";

const API_URL = "/users"; 

export const authService = {
  register: async ({ name, email, password, role, farmId }) => {
    try {
      const payload = {
        name,
        email,
        passwordHash: password,  // server expects passwordHash
        role,
      };
      if (farmId && farmId.trim() !== "") {
        payload.farmId = farmId;
      }

      const res = await api.post(`${API_URL}/register`, payload);

      
      toast.success("Registration successful!");
      return res.data;
    } catch (err) {
      const message = err.response?.data?.message || "Registration failed!";
      toast.error(message);
      throw err; // rethrow so component can handle if needed
    }
  },

  login: async ({ email, password }) => {
    try {
      const res = await api.post(`${API_URL}/login`, { email, password });
      
      toast.success("Login successful!");
      return res.data;
    } catch (err) {
      
      const message = err.response?.data?.message || "Invalid credentials!";
      toast.error(message);
      throw err;
    }
  },

  getMe: async (token) => {
    try {
      const res = await api.get(`${API_URL}/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      return res.data;
    } catch (err) {
      toast.error("Failed to fetch user details!");
      throw err;
    }
  },
  updateMe: async (partial) => {
    try {
      const res = await api.patch(`${API_URL}/me`, partial);
      return res.data;
    } catch (err) {
      toast.error("Failed to update profile!");
      throw err;
    }
  },
};
