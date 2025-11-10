import axios from "axios";

const REST_COUNTRIES_BASE_URL = "https://restcountries.com/v3.1";

export const restCountriesApi = axios.create({
  baseURL: REST_COUNTRIES_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export const getAllCountriesFlags = async () => {
  const response = await restCountriesApi.get("/all?fields=name,flags,cca2,cca3");
  return response.data;
};
