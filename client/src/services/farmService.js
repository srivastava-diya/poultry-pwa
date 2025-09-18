import axios from "axios";

const API_URL = "http://localhost:5000/api/farms";

export const farmService = {
  getFarms: async () => {
    const res = await axios.get(API_URL);
    return res.data;
  },
  createFarm: async (data) => {
    const res = await axios.post(API_URL, data);
    return res.data;
  },
};
