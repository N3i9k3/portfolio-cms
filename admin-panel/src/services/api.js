import axios from "axios";

// ✅ Replace with your live Railway backend URL
const api = axios.create({
  baseURL: "https://portfolio-cms-production-80c6.up.railway.app",
});

// Attach JWT token to every request automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
