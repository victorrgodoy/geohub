import { Country } from 'generated/prisma';

export class ResponseCountryDto {
  name: string;
  population: number;
  official_language: string;
  currency: string;

  constructor(country: Country) {
    this.name = country.cou_name;
    this.population = country.cou_population;
    this.official_language = country.cou_official_language;
    this.currency = country.cou_currency;
  }
}
