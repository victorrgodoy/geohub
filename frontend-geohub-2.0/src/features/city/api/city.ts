import api from "../../../lib/axiosInstance";

export interface City {
  id?: number;
  name?: string;
  population?: number;
  latitude?: number;
  longitude?: number;
  country_id?: number;
}

export const listAllCity = async (): Promise<City[]> => {
  const { data } = await api.get("/city");
  return data || [];
};

export const createCity = async (city: City): Promise<City> => {
  const { data } = await api.post("/city", city);
  return data;
};

export const deleteCity = async (id: number) => {
  await api.delete(`/city/${id}`);
};

export const updateCity = async (id: number, city: City): Promise<City> => {
  const { data } = await api.put(`/city/${id}`, city);
  return data;
};
