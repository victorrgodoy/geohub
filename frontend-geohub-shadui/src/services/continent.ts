import {api} from "./api";
import type { Continent, CreateContinent } from "../types/Continent";

const findById = async (id: number): Promise<Continent> => {
  const {data} = await api.get(`continent/${id}`)
  return data;
}

const createContinent = async (
  continent: CreateContinent,
): Promise<Continent> => {
  const { data } = await api.post("/continent", continent);
  return data;
};

const listAllContinent = async (): Promise<Continent[]> => {
  const { data } = await api.get("/continent");
  return data || [];
};

const updateContinent = async (
  id: number,
  continent: CreateContinent,
): Promise<Continent> => {
  const { data } = await api.put(`/continent/${id}`, continent);
  return data;
};

const deleteContinent = async (id: number): Promise<void> => {
  await api.delete(`/continent/${id}`);
};

export { findById, createContinent, listAllContinent, updateContinent, deleteContinent };
