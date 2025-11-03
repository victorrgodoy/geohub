interface City {
  id: number;
  name: string;
  population: number;
  latitude: number;
  longitude: number;
  countryId: number;
}

type CreateCity = Omit<City, "id">;

export type { City, CreateCity };
