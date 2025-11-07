import { Country } from 'generated/prisma';

export class ResponseCountryDto {
  id: number;
  name: string;
  population: number;
  officialLanguage: string;
  currency: string;
  continentId: number;

  constructor(country: Country) {
    this.id = country.cou_id;
    this.name = country.cou_name;
    this.population = country.cou_population;
    this.officialLanguage = country.cou_official_language;
    this.currency = country.cou_currency;
    this.continentId = country.con_id;
  }
}
