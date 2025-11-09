import { City } from 'generated/prisma';
import { CreateCityDto } from '../dtos/create-city-dto';
import { UpdateCityDto } from '../dtos/update-city-dto';

export interface PaginatedResult<T> {
  data: T[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export abstract class CityRepository {
  abstract findById(id: number): Promise<City>;
  abstract create(create: CreateCityDto): Promise<City>;
  abstract listAll(): Promise<City[]>;
  abstract listPaginated(
    page: number,
    limit: number,
    search?: string,
    continentId?: number,
    countryId?: number,
  ): Promise<PaginatedResult<City>>;
  abstract update(id: number, update: UpdateCityDto): Promise<City>;
  abstract delete(id: number): Promise<void>;
  abstract getTotalCity(): Promise<{ total: number; updatedAt: Date | null }>;
  abstract listTop5ByPopulation(): Promise<City[]>;
}
