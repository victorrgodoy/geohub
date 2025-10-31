interface City {
  id: number;
  name: string;
  population: number;
  latitude: number;
  longitude: number;
  countryId: number;
}

type CreateCity = Omit<City, "id">;
type ListCity = City;
type UpdateCity = Omit<City, "id">;
type DeleteCity = Pick<City, "id">;

export type { City, CreateCity, ListCity, UpdateCity, DeleteCity };
