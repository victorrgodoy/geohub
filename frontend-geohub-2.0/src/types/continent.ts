interface Continent {
  id: number;
  name: string;
  description: string;
}

type CreateContinent = Omit<Continent, "id">;
type ListContinent = Continent;
type UpdateContinent = Omit<Continent, "id">;
type DeleteContinent = Omit<Continent, "name" | "description">;

export type {
  Continent,
  CreateContinent,
  ListContinent,
  UpdateContinent,
  DeleteContinent,
};
