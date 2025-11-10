import { useQuery } from "@tanstack/react-query";
import { getAllCountriesFlags } from "../services/restCountriesApi";

export interface CountryFlag {
  name: { common: string };
  flags: { svg: string; png: string };
  cca2: string;
  cca3: string;
}

export function useCountriesFlags() {
  return useQuery<CountryFlag[], Error>({
    queryKey: ["countries-flags"],
    queryFn: getAllCountriesFlags,
    staleTime: 1000 * 60 * 60,
  });
}
