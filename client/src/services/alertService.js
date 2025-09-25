// src/services/alertService.js
import api from "./httpClient";

const API_URL = "/alerts";

export const alertService = {
  getAlertsByZip: async (zipCode) => {
    const res = await api.get(`${API_URL}/${zipCode}`);
    return res.data;
  },
  triggerAlert: async (data) => {
    const res = await api.post(`${API_URL}/trigger`, data);
    return res.data;
  },
};
