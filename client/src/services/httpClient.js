import axios from "axios";

const baseURL = (typeof import.meta !== "undefined" && import.meta.env && import.meta.env.VITE_API_BASE) ;

const api = axios.create({
  baseURL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;


