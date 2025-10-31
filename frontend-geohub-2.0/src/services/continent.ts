import api from "./api";
import type { CreateContinent, ListContinent, UpdateContinent } from "../types/continent";

const createContinent = async (
  continent: CreateContinent, 
): Promise<ListContinent> => { 
  const { data } = await api.post("/continent", continent);
  return data;
};

const listAllContinent = async (): Promise<ListContinent[]> => {
  const { data } = await api.get("/continent");
  return data || [];
};

const updateContinent = async (
  id: number,
  continent: UpdateContinent,
): Promise<ListContinent> => {
  const { data } = await api.put(`/continent/${id}`, continent);
  return data;
};

const deleteContinent = async (id: number): Promise<void> => {
  await api.delete(`/continent/${id}`);
};

export {createContinent, listAllContinent, updateContinent, deleteContinent}