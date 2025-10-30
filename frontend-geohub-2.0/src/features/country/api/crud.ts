import api from "../../../lib/axiosInstance";

export interface Country {
  id: number;
  name?: string;
  population?: number;
  official_language?: string;
  currency?: string;
  continentId?: number;
}

export const listAllCountry = async (): Promise<Country[]> => {
  const { data } = await api.get("/country?top5=false");
  return data || [];
};

export const createCountry = async (country: Country): Promise<Country> => {
  const { data } = await api.post("/country", country);
  return data;
};

export const deleteCountry = async (id: number) => {
  await api.delete(`/country/${id}`);
};

export const updateCountry = async (
  id: number,
  country: Country,
): Promise<Country> => {
  const { data } = await api.put(`/country/${id}`, country);
  return data;
};
