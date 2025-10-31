import { useEffect, useState } from "react";
import {
  getTotalCity,
  type CityTotalResponse,
  listTop5City,
  type CityResponse,
} from "../api/city";
import {
  getTotalCountry,
  getTotalPopulation,
  listTop5Country,
  type CountryTotalResponse,
  type CountryReponse,
} from "../api/country";
import { getCountryFlag } from "../api/flag";
import { formatNumber } from "../../../utils/formatNumber";

export const useDashboard = () => {
  const [totalCity, setTotalCity] = useState<CityTotalResponse>();
  const [totalCountry, setTotalCountry] = useState<CountryTotalResponse>();
  const [totalPopulation, setTotalPopulation] =
    useState<CountryTotalResponse>();
  const [top5City, setTop5City] = useState<CityResponse[]>([]);
  const [top5Country, setTop5Country] = useState<CountryReponse[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const [
        cityTotal,
        countryTotal,
        populationTotal,
        citiesTop5,
        countriesTop5,
      ] = await Promise.all([
        getTotalCity(),
        getTotalCountry(),
        getTotalPopulation(),
        listTop5City(),
        listTop5Country(),
      ]);

      const formattedTop5City = citiesTop5.map((city) => ({
        ...city,
        population: formatNumber(Number(city.population)),
      }));

      const formattedTop5Country = await Promise.all(
        countriesTop5.map(async (country) => ({
          ...country,
          population: formatNumber(Number(country.population)),
          flag: await getCountryFlag(country.name),
        })),
      );

      setTotalCity(cityTotal);
      setTotalCountry(countryTotal);
      setTotalPopulation(populationTotal);
      setTop5City(formattedTop5City);
      setTop5Country(formattedTop5Country);
    };
    fetchData();
  }, []);

  return { totalCity, totalCountry, totalPopulation, top5City, top5Country };
};
