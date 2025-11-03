import api from "./api";
import type {
  CreateCountry,
  Country,
  TotalCountry,
  TotalPopulation,
  Top5Country,
} from "../types/Country";

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

const totalCountry = async (): Promise<TotalCountry> => {
  const {data} = await api.get("/country/total-population");
  return data;
};

const totalPopulation = async (): Promise<TotalPopulation> => {
  const {data} = await api.get("/country/total-population");
  return data;
};

const top5Country = async (): Promise<Top5Country[]> => {
  const {data} = await api.get("country?top5=true");
  return data;
};

export {
  createCountry,
  listAllCountry,
  updateCountry,
  deleteCountry,
  totalCountry,
  totalPopulation,
  top5Country,
};
