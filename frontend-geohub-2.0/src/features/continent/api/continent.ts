import api from "../../../lib/axios";

export interface ContinentResponse {
  id: number;
  name: string;
  description: string;
}

export interface Continent {
  name?: string,
  description?: string
}

export const listAllContinent = async (): Promise<ContinentResponse[]> => {
  const response = await api.get("/continent");
  return response.data.data || [];
};

export const createContinent = async (continent: Continent) => {
  await api.post("/continent", continent) 
}
