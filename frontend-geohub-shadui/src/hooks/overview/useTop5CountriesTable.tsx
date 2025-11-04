import { useTop5Country } from "../country";
import { useMemo } from "react";
import type { Top5Country } from "../../types/Country";
import { formatNumber } from "../../utils/formatNumber";

export function useTop5CountriesTable() {
  const { data: top5Countries, isLoading } = useTop5Country();

  const columns = useMemo(() => [
    { 
      key: 1, 
      name: "name", 
      label: "Country",
      render: (country: Top5Country) => (
        <div className="flex items-center gap-2">
          <span className="font-medium">{country.name}</span>
        </div>
      )
    },
    { 
      key: 2, 
      name: "population", 
      label: "Population",
      render: (country: Top5Country) => (
        <span className="font-medium tabular-nums">
          {formatNumber(country.population)}
        </span>
      )
    },
    { 
      key: 3, 
      name: "official_language", 
      label: "Language",
      render: (country: Top5Country) => (
        <span className="text-muted-foreground">
          {country.official_language}
        </span>
      )
    },
    { 
      key: 4, 
      name: "currency", 
      label: "Currency",
      render: (country: Top5Country) => (
        <span className="text-muted-foreground">
          {country.currency}
        </span>
      )
    },
  ], []);

  const data = useMemo(() => top5Countries ?? [], [top5Countries]);

  return {
    columns,
    data,
    isLoading
  };
}