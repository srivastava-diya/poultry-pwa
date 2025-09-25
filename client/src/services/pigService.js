import api from "./httpClient";

const API_URL = "/pigs";

export const pigService = {
  getPigHerdsByFarm: async (farmId) => {
    const res = await api.get(`${API_URL}/farm/${farmId}`);
    return res.data;
  },
  createPigHerd: async (data) => {
    const res = await api.post(`${API_URL}`, data);
    return res.data;
  },
};


