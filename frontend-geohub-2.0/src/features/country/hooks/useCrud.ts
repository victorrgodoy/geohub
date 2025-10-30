import { useEffect, useState } from "react";
import {
  listAllCountry,
  createCountry,
  deleteCountry,
  updateCountry,
  type Country,
} from "../api/crud";

export const useCountry = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const data = await listAllCountry();
      setCountries(data || []);
      setLoading(false);
    };
    fetchData();
  }, []);

  const handleCreate = async (country: Country) => {
    const created = await createCountry(country);
    setCountries((prev) => [...prev, created]);
  };

  const handleDelete = async (id: number) => {
    await deleteCountry(id);
    setCountries((prev) => prev.filter((c) => c.id !== id));
  };

  const handleEdit = async (id: number, country: Country) => {
    const edited = await updateCountry(id, country);
    setCountries((prev) => prev.map((c) => (c.id === edited.id ? edited : c)));
  };

  return { countries, loading, handleCreate, handleDelete, handleEdit };
};
