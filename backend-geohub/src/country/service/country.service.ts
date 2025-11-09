import { Injectable } from '@nestjs/common';
import { Country } from 'generated/prisma';
import { CreateCountryDto } from '../dtos/create-country-dto';
import { UpdateCountryDto } from '../dtos/update-country-dto';
import { CountryRepository } from '../repositories/country-repository';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class CountryService {
  constructor(private readonly countryRepository: CountryRepository) {}

  async listTop5ByPopulation(): Promise<Country[]> {
    return await this.countryRepository.listTop5ByPopulation();
  }

  async getTotalCountry(): Promise<{ total: number; updatedAt: Date | null }> {
    return await this.countryRepository.getTotalCountry();
  }

  async getTotalPopulation(): Promise<{
    total: number;
    updatedAt: Date | null;
  }> {
    return await this.countryRepository.getTotalPopulation();
  }

  public async findByContinentId(id: number): Promise<Country[]> {
    const countries =
      await this.countryRepository.findByContinentId(id);
    if (!countries || countries.length === 0) {
      throw new NotFoundException(
        `No countries found for continent with ID: ${id}`,
      );
    }
    return countries;
  }

  public findById(id: number): Promise<Country> {
    return this.countryRepository.findById(id);
  }

  public create(country: CreateCountryDto): Promise<Country> {
    return this.countryRepository.create(country);
  }

  public listAll(): Promise<Country[]> {
    return this.countryRepository.listAll();
  }

  public listPaginated(page: number, limit: number): Promise<any> {
    return this.countryRepository.listPaginated(page, limit);
  }

  public update(id: number, country: UpdateCountryDto): Promise<Country> {
    return this.countryRepository.update(id, country);
  }

  public delete(id: number): Promise<void> {
    return this.countryRepository.delete(id);
  }
}
