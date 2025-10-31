interface Country {
  id: number;
  name: string;
  population: number;
  official_language: string;
  currency: string;
  continentId: number;
}

type CreateCountry = Omit<Country, 'id'>;
type ListCountry = Country;
type UpdateCountry = Country;
type DeleteCountry = Pick<Country, 'id'>;

export type {CreateCountry, ListCountry, UpdateCountry, DeleteCountry};