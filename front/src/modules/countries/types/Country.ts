export type Country = {
  id: number;
  name: string;
  population: number;
  officialLanguage: string;
  currency: string;
  continentId: number;
};

export interface TotalCountry {
  total: number;
  updatedAt: string;
}

export interface TotalPopulation {
  total: number;
  updatedAt: string;
}

export type CreateCountry = Omit<Country, "id">;
