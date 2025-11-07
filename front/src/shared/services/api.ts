import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_API_URL,
  timeout: 10000, // 10 segundos
  headers: {
    "Content-Type": "application/json",
  },
});