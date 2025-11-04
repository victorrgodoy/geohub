import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_API_URL,
  timeout: 1000,
  headers: {
    "Content-Type": "application/json",
  },
});

export const restCountriesApi = axios.create({
  baseURL: "https://restcountries.com/v3.1",
});
