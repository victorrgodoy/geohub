interface Continent {
  id: number;
  name: string;
  description: string;
}

type CreateContinent = Omit<Continent, "id">;

export type {Continent,CreateContinent};