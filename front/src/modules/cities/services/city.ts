import { api } from "../../../shared/services/api";
import type { CreateCity, City, TotalCity } from "../types/City";

const createCity = async (city: CreateCity): Promise<City> => {
  const { data } = await api.post("/city", city);
  return data;
};

const listAllCity = async (): Promise<City[]> => {
  const { data } = await api.get("/city");
  return data || [];
};

const listAllCityPaginated = async (
  page: number,
  limit: number,
  searchTerm?: string,
  continentId?: number,
  countryId?: number
): Promise<{
  data: City[];
  meta: { total: number; page: number; limit: number; totalPages: number };
}> => {
  const params: any = { page, limit };
  if (searchTerm) params.search = searchTerm;
  if (continentId) params.continentId = continentId;
  if (countryId) params.countryId = countryId;
  const { data } = await api.get("/city", { params });
  return data;
};

const updateCity = async (id: number, city: CreateCity): Promise<City> => {
  const { data } = await api.put(`/city/${id}`, city);
  return data;
};

const deleteCity = async (id: number): Promise<void> => {
  await api.delete(`/city/${id}`);
};

const totalCity = async (): Promise<TotalCity> => {
  const { data } = await api.get("/city/stats/total-city");
  return data;
};

export { listAllCityPaginated, createCity, listAllCity, updateCity, deleteCity, totalCity };
