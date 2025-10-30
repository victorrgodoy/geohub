import { createContext, useContext  } from "react";
import { type Continent} from "../../features/continent/api/continent";

type ContinentContextProps = {
  continents: Continent[];
  loading: boolean;
  handleCreate: (continent: Continent) => Promise<void>;
  handleDelete: (id: number) => Promise<void>;
  handleEdit: (id: number, continent: Continent) => Promise<void>;
};

export const ContinentContext = createContext<ContinentContextProps>({
  continents: [],
  loading: true,
  handleCreate: async () => {},
  handleDelete: async () => {},
  handleEdit: async () => {},
});

export const useContinent = () => useContext(ContinentContext);