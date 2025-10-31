import api from "./api";
import type { CreateCity, ListCity, UpdateCity } from "../types/city";

const createCity = async (city: CreateCity): Promise<ListCity> => {
  const { data } = await api.post("/city", city);
  return data; 
};

const listAllCity = async (): Promise<ListCity[]> => {
  const { data } = await api.get("/city");
  return data || [];
};

const updateCity = async (id: number, city: UpdateCity): Promise<ListCity> => {
  const { data } = await api.put(`/city/${id}`, city);
  return data; 
};

const deleteCity = async (id: number): Promise<void> => {
  await api.delete(`/city/${id}`);
};

export {createCity, listAllCity, updateCity, deleteCity}