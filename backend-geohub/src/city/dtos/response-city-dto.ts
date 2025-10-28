import { City } from 'generated/prisma';

export class ResponseCityDto {
  name: string;
  population: number;
  latitude: number;
  longitude: number;

  constructor(city: City) {
    this.name = city.cit_name;
    this.population = city.cit_population;
    this.latitude = city.cit_latitude.toNumber();
    this.longitude = city.cit_longitude.toNumber();
  }
}
