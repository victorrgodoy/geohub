import instance from "../axiosInstance";
import type { Country, CreateCountryDto, UpdateCountryDto } from "./country.types";

export const createCountry = async (data: CreateCountryDto): Promise<Country> => {
  const result = await instance.post('/country', data);
  return result.data;
};

export const listAllCountry = async (): Promise<Country[]> => {
  const result = await instance.get('/country')
  return result.data;
};

export const UpdateCountry = async (id: number, data: UpdateCountryDto):Promise<Country> => {
  const result = await instance.put(`/country/${id}`, data)
  return result.data;
}

export const deleteCountry = async (id: number): Promise<void> => {
  await instance.delete(`/country/${id}`);
};
