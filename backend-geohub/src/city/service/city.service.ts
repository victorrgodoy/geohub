import { Injectable, NotFoundException } from '@nestjs/common';
import { City } from 'generated/prisma';
import { CreateCityDto } from '../dtos/create-city-dto';
import { UpdateCityDto } from '../dtos/update-city-dto';
import { CityRepository } from '../repositories/city-repository';

@Injectable()
export class CityService {
  constructor(private readonly cityRepository: CityRepository) {}

  async listTop5ByPopulation(): Promise<City[]> {
    return await this.cityRepository.listTop5ByPopulation();
  }

  async getTotalCity(): Promise<{ total: number; updatedAt: Date | null }> {
    return await this.cityRepository.getTotalCity();
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

  public listPaginated(
    page: number,
    limit: number,
    search?: string,
    continentId?: number,
    countryId?: number,
  ): Promise<any> {
    return this.cityRepository.listPaginated(
      page,
      limit,
      search,
      continentId,
      countryId,
    );
  }

  public update(id: number, City: UpdateCityDto): Promise<City> {
    return this.cityRepository.update(id, City);
  }

  public delete(id: number): Promise<void> {
    return this.cityRepository.delete(id);
  }
}
