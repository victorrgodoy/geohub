import instance from "../axiosInstance";
import type { City, CreateCityDto, UpdateCityDto } from "./city.types";

export const createCity = async (data: CreateCityDto): Promise<City> => {
  const result = await instance.post('/city', data);
  return result.data;
};

export const listAllCity = async (): Promise<City[]> => {
  const result = await instance.get('/city')
  return result.data;
};

export const updateCity = async (id: number, data: UpdateCityDto):Promise<City> => {
  const result = await instance.put(`/city/${id}`, data)
  return result.data;
}

export const deleteCity = async (id: number): Promise<void> => {
  await instance.delete(`/city/${id}`);
};
