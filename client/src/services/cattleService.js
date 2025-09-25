import api from "./httpClient";

const API_URL = "/cattle";

export const cattleService = {
  getCattleHerdsByFarm: async (farmId) => {
    const res = await api.get(`${API_URL}/farm/${farmId}`);
    return res.data;
  },
  createCattleHerd: async (data) => {
    const res = await api.post(`${API_URL}`, data);
    return res.data;
  },
};


