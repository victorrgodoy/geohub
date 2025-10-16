import { Injectable } from '@nestjs/common';
import { Country } from 'generated/prisma';
import { CreateCountryDto } from '../dtos/create-country-dto';
import { UpdateCountryDto } from '../dtos/update-country-dto';
import { CountryRepository } from '../repositories/country-repository';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class CountryService {
  constructor(private readonly countryRepository: CountryRepository) {}

  public async findByContinent(continentName: string): Promise<Country[]> {
    const countries =
      await this.countryRepository.findByContinent(continentName);
    if (!countries || countries.length === 0) {
      throw new NotFoundException(
        `No countries found for continent ${continentName}`,
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

  public async update(id: number, country: UpdateCountryDto): Promise<Country> {
    try {
      return await this.countryRepository.update(id, country);
    } catch {
      throw new NotFoundException(`Country with id ${id} not found`);
    }
  }

  public async delete(id: number): Promise<void> {
    try {
      await this.countryRepository.delete(id);
    } catch {
      throw new NotFoundException(`Country with id ${id} not found`);
    }
  }
}
