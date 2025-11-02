import api from "./api";
import type { CreateCountry, Country } from "../types/Country";

const createCountry = async (country: CreateCountry): Promise<Country> => {
  const { data } = await api.post("/country", country);
  return data;
};

const listAllCountry = async (): Promise<Country[]> => {
  const { data } = await api.get("/country?top5=false");
  return data || [];
};

const updateCountry = async (
  id: number,
  country: CreateCountry,
): Promise<Country> => {
  const { data } = await api.put(`/country/${id}`, country);
  return data;
};

const deleteCountry = async (id: number): Promise<void> => {
  await api.delete(`/country/${id}`);
};

export { createCountry, listAllCountry, updateCountry, deleteCountry };
