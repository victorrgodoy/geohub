interface Country {
  id: number;
  name: string;
  population: number;
  official_language: string;
  currency: string;
  continentId: number;
}

type CreateCountry = Omit<Country, "id">;

export type { CreateCountry, Country};
