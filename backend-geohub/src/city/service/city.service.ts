import { Injectable } from '@nestjs/common';
import { City } from 'generated/prisma';
import { CreateCityDto } from '../dtos/create-city-dto';
import { UpdateCityDto } from '../dtos/update-city-dto';
import { CityRepository } from '../repositories/city-repository';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class CityService {
  constructor(private readonly cityRepository: CityRepository) {}

  public async findByCountry(countryName: string): Promise<City[]> {
    try {
      const result = await this.cityRepository.findByCountry(countryName);

      if (!result || result.length === 0) {
        throw new NotFoundException(
          `No cities found for country ${countryName}`,
        );
      }

      return result;
    } catch (error) {
      throw new NotFoundException(
        `Error fetching cities for country ${countryName}`,
      );
    }
  }

  public async findByContinent(continentName: string): Promise<City[]> {
    try {
      const result = await this.cityRepository.findByContinent(continentName);

      if (!result || result.length === 0) {
        throw new NotFoundException(
          `No cities found for continent ${continentName}`,
        );
      }

      return result;
    } catch (error) {
      throw new NotFoundException(
        `Error fetching cities for continent ${continentName}`,
      );
    }
  }

  public async findByCountryAndContinent(
    countryName: string,
    continentName: string,
  ): Promise<City[]> {
    try {
      const result = await this.cityRepository.findByCountryAndContinent(
        countryName,
        continentName,
      );

      if (!result || result.length === 0) {
        throw new NotFoundException(
          `No cities found for country ${countryName} and continent ${continentName}`,
        );
      }

      return result;
    } catch (error) {
      throw new NotFoundException(
        `Error fetching cities for country ${countryName} and continent ${continentName}`,
      );
    }
  }

  public findById(id: number): Promise<City> {
    return this.cityRepository.findById(id);
  }

  public create(City: CreateCityDto): Promise<City> {
    return this.cityRepository.create(City);
  }

  public listAll(): Promise<City[]> {
    return this.cityRepository.listAll();
  }

  public async update(id: number, City: UpdateCityDto): Promise<City> {
    try {
      return await this.cityRepository.update(id, City);
    } catch {
      throw new NotFoundException(`City with id ${id} not found`);
    }
  }

  public async delete(id: number): Promise<void> {
    try {
      await this.cityRepository.delete(id);
    } catch {
      throw new NotFoundException(`City with id ${id} not found`);
    }
  }
}
