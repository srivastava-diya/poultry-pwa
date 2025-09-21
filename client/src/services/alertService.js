// src/services/alertService.js
import axios from "axios";

const API_URL = "http://localhost:8000/api/alerts"; // base URL

export const alertService = {
  // Get alerts by zipCode
  getAlerts: async (zipCode) => {
    const res = await axios.get(`${API_URL}/${zipCode}`);
    return res.data;
  },

  // Create new alert (Vet only)
  createAlert: async (data) => {
    const res = await axios.post(API_URL, data);
    return res.data;
  },

  // Mark alert as read
  markAsRead: async (id) => {
    const res = await axios.patch(`${API_URL}/${id}/read`);
    return res.data;
  },

  // Delete alert
  deleteAlert: async (id) => {
    const res = await axios.delete(`${API_URL}/${id}`);
    return res.data;
  },
};
