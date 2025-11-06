interface City {
  id: number;
  name: string;
  population: number;
  latitude: number;
  longitude: number;
  countryId: number;
}

interface TotalCity {
  total: number;
  updatedAt: string;
}

type CreateCity = Omit<City, "id">;

export type { City, CreateCity, TotalCity };
