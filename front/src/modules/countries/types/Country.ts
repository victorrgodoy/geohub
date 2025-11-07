interface Country {
  id: number;
  name: string;
  population: number;
  official_language: string;
  currency: string;
  continent_id: number;
}

interface TotalCountry {
  total: number;
  updatedAt: string;
}

interface TotalPopulation {
  total: number;
  updatedAt: string;
}

type CreateCountry = Omit<Country, "id">;
type Top5Country = Omit<Country, "id">;

export type {
  CreateCountry,
  Country,
  TotalCountry,
  TotalPopulation,
  Top5Country,
};
