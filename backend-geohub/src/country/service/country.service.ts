import { Injectable, NotFoundException } from '@nestjs/common';
import { Country } from 'generated/prisma';
import { CreateCountryDto } from '../dtos/create-country-dto';
import { UpdateCountryDto } from '../dtos/update-country-dto';
import { CountryRepository } from '../repositories/country-repository';
import { PaginatedResult } from '../common/interfaces/paginated-result.interface';

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

  public async findById(id: number): Promise<Country> {
    try {
      return await this.countryRepository.findById(id);
    } catch {
      throw new NotFoundException(`Country with id ${id} not found`);
    }
  }

  public create(country: CreateCountryDto): Promise<Country> {
    return this.countryRepository.create(country);
  }

  public listAll(): Promise<Country[]> {
    return this.countryRepository.listAll();
  }

  public listPaginated(
    page: number,
    limit: number,
    search?: string,
    continentId?: number,
  ): Promise<PaginatedResult<Country>> {
    return this.countryRepository.listPaginated(
      page,
      limit,
      search,
      continentId,
    );
  }

  public async update(id: number, country: UpdateCountryDto): Promise<Country> {
    await this.findById(id);
    return this.countryRepository.update(id, country);
  }

  public async delete(id: number): Promise<void> {
    await this.findById(id);
    return this.countryRepository.delete(id);
  }
}
