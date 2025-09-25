import api from "./httpClient";

const API_URL = "/farms";

export const farmService = {
  getFarms: async () => {
    const res = await api.get(`${API_URL}`);
    return res.data;
  },
  getFarmById: async (id) => {
    const res = await api.get(`${API_URL}/${id}`);
    return res.data;
  },
  createFarm: async (data) => {
    const res = await api.post(API_URL, data);
    return res.data;
  },
  updateFarm: async (id, data) => {
    const res = await api.put(`${API_URL}/${id}`, data);
    return res.data;
  },
};
