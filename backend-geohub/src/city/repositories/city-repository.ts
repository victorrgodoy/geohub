import { City } from 'generated/prisma';
import { CreateCityDto } from '../dtos/create-city-dto';
import { UpdateCityDto } from '../dtos/update-city-dto';

export abstract class CityRepository {
  abstract findById(id: number): Promise<City>;
  abstract create(create: CreateCityDto): Promise<City>;
  abstract listAll(): Promise<City[]>;
  abstract update(id: number, update: UpdateCityDto): Promise<City>;
  abstract delete(id: number): Promise<void>;

  abstract findByCountry(countryName: string): Promise<City[]>;
  abstract findByContinent(continentName: string): Promise<City[]>;
  abstract findByCountryAndContinent(
    countryName: string,
    continentName: string,
  ): Promise<City[]>;
}
