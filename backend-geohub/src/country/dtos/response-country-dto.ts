import { Country } from 'generated/prisma';

export class ResponseCountryDto {
  id: number;
  name: string;
  population: number;
  official_language: string;
  currency: string;
  continent_id: number;

  constructor(country: Country) {
    this.id = country.cou_id;
    this.name = country.cou_name;
    this.population = country.cou_population;
    this.official_language = country.cou_official_language;
    this.currency = country.cou_currency;
    this.continent_id = country.con_id;
  }
}
