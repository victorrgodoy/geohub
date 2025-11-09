import axios from 'axios';

export interface CountryData {
  name: {
    common: string;
    official: string;
    nativeName?: Record<string, { official: string; common: string }>;
  };
  region: string;
  subregion?: string;
  population: number;
  languages?: Record<string, string>;
  currencies?: Record<string, { name: string; symbol: string }>;
}

const REST_COUNTRIES_API =
  process.env.REST_COUNTRIES_API_URL || 'https://restcountries.com/v3.1';

export const fetchCountriesData = async (): Promise<CountryData[]> => {
  const response = await axios.get<CountryData[]>(
    `${REST_COUNTRIES_API}/all?fields=name,region,languages,currencies,population,subregion`,
  );
  return response.data;
};
