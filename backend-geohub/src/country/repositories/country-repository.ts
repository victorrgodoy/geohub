import { Country } from 'generated/prisma';
import { CreateCountryDto } from '../dtos/create-country-dto';
import { UpdateCountryDto } from '../dtos/update-country-dto';
import { PaginatedResult } from '../common/interfaces/paginated-result.interface';

export abstract class CountryRepository {
  abstract findById(id: number): Promise<Country>;
  abstract create(create: CreateCountryDto): Promise<Country>;
  abstract listAll(): Promise<Country[]>;
  abstract listPaginated(
    page: number,
    limit: number,
    search?: string,
    continentId?: number,
  ): Promise<PaginatedResult<Country>>;
  abstract update(id: number, update: UpdateCountryDto): Promise<Country>;
  abstract delete(id: number): Promise<void>;
  abstract getTotalPopulation(): Promise<{
    total: number;
    updatedAt: Date | null;
  }>;
  abstract getTotalCountry(): Promise<{
    total: number;
    updatedAt: Date | null;
  }>;
  abstract listTop5ByPopulation(): Promise<Country[]>;
}
