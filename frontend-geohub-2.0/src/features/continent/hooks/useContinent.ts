import { useEffect, useState } from "react";
import { listAllContinent, createContinent, type CreateContinent, type ContinentResponse } from "../api/continent";

export const useContinent = () => {
  const [continents, setContinents] = useState<ContinentResponse[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const data = await listAllContinent();
      setContinents(data || []);
      setLoading(false);
    };
    fetchData();
  }, []);

  const addContinent = async (continent: CreateContinent) => {
    await createContinent(continent)
  }

  return { continents, loading, addContinent };
};
