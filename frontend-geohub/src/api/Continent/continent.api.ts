import instance from "../axiosInstance";
import type { Continent, CreateContinentDto, UpdateContinentDto } from "./continent.types";

export const createContinent = async (data: CreateContinentDto): Promise<Continent> => {
  const result = await instance.post('/continent', data);
  return result.data;
};

export const listAllContinent = async (): Promise<Continent[]> => {
  const result = await instance.get('/continent')
  return result.data;
};

export const UpdateContinent = async (id: number, data: UpdateContinentDto):Promise<Continent> => {
  const result = await instance.put(`/continent/${id}`, data)
  return result.data;
}

export const deleteContinent = async (id: number): Promise<void> => {
  await instance.delete(`/continent/${id}`);
};
