import axios from "axios";

export const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "/api",
  headers: { "Content-Type": "application/json" },
});

axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("shophive_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});
