import { api } from "../../../shared/services/api";
import type {
  CreateCountry,
  Country,
  TotalCountry,
  TotalPopulation,
} from "../types/Country";

const createCountry = async (country: CreateCountry): Promise<Country> => {
  const { data } = await api.post("/country", country);
  return data;
};

const listAllCountry = async (): Promise<Country[]> => {
  const { data } = await api.get("/country?top5=false");
  return data || [];
};

const listAllCountryPaginated = async (
  page: number,
  limit: number,
  searchTerm?: string,
  continentId?: number
): Promise<{
  data: Country[];
  meta: { total: number; page: number; limit: number; totalPages: number };
}> => {
  const params: any = { page, limit };
  if (searchTerm) params.search = searchTerm; 
  if (continentId) params.continentId = continentId;
  const { data } = await api.get("/country", { params });
  return data;
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
  const { data } = await api.get("/country/stats/total-country");
  return data;
};

const totalPopulation = async (): Promise<TotalPopulation> => {
  const { data } = await api.get("/country/stats/total-population");
  return data;
};

const top5Country = async (): Promise<Country[]> => {
  const { data } = await api.get("country?top5=true");
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
  listAllCountryPaginated
};
