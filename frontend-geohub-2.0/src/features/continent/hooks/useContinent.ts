import { useEffect, useState } from "react";
import {
  listAllContinent,
  createContinent,
  deleteContinent,
  updateContinent,
  type Continent,
} from "../api/continent";

export const useContinent = () => {
  const [continents, setContinents] = useState<Continent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const data = await listAllContinent();
      setContinents(data || []);
      setLoading(false);
    };
    fetchData();
  }, []);

  const handleCreate = async (continent: Continent) => {
    const created = await createContinent(continent);
    setContinents(prev => [...prev, created])
  }

  const handleDelete = async (id: number) => {
    await deleteContinent(id);          
    setContinents(prev => prev.filter(c => c.id !== id)); 
  }

  const handleEdit = async (id: number, continent: Continent) => {
    const edited = await updateContinent(id, continent);
    setContinents(prev => prev.map((c) => c.id === edited.id ? edited : c))
  }

  return { continents, loading, handleCreate, handleDelete, handleEdit };
};
