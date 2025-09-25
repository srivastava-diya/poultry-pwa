import api from "./httpClient";

const API_URL = "/logs";

export const logService = {
  getLogsByGroup: async ({ animalType, groupId, limit = 7 }) => {
    const res = await api.get(`${API_URL}/${animalType}/${groupId}`);
    const logs = Array.isArray(res.data) ? res.data : [];
    return logs
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, limit);
  },
};


