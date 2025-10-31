import api from "../../../services/api";

export interface CityTotalResponse {
  total: number;
  updatedAt: string | null;
}

export interface CityResponse {
  name: string;
  population: string | number;
  latitude: number;
  longitude: number;
}

export const getTotalCity = async (): Promise<CityTotalResponse> => {
  const { data } = await api.get("/city/total-city");
  return data;
};

export const listTop5City = async (): Promise<CityResponse[]> => {
  const { data } = await api.get("/city?top5=true");
  return data;
};
