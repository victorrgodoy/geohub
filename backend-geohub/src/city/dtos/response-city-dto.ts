import { City } from 'generated/prisma';

export class ResponseCityDto {
  id: number;
  name: string;
  population: number;
  latitude: number;
  longitude: number;
  countryId: number;

  constructor(city: City) {
    this.id = city.cit_id;
    this.name = city.cit_name;
    this.population = city.cit_population;
    this.latitude = city.cit_latitude.toNumber();
    this.longitude = city.cit_longitude.toNumber();
    this.countryId = city.cou_id;
  }
}
