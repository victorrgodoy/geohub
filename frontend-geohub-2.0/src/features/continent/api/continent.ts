import api from "../../../lib/axiosInstance";

export interface Continent {
  id: number;
  name?: string;
  description?: string;
}

export const listAllContinent = async (): Promise<Continent[]> => {
  const { data } = await api.get("/continent");
  return data || [];
};

export const createContinent = async (
  continent: Continent,
): Promise<Continent> => {
  const { data } = await api.post("/continent", continent);
  return data;
};

export const deleteContinent = async (id: number) => {
  await api.delete(`/continent/${id}`);
};

export const updateContinent = async (
  id: number,
  continent: Continent,
): Promise<Continent> => {
  const { data } = await api.put(`/continent/${id}`, continent);
  return data;
};
