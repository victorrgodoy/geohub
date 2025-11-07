import { City } from 'generated/prisma';
import { CreateCityDto } from '../dtos/create-city-dto';
import { UpdateCityDto } from '../dtos/update-city-dto';
import { CityRepository } from '../repositories/city-repository';
import { PrismaService } from 'src/database/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PrismaCityRepository implements CityRepository {
  constructor(private prisma: PrismaService) {}

  async listTop5ByPopulation(): Promise<City[]> {
    return await this.prisma.city.findMany({
      orderBy: { cit_population: 'desc' },
      take: 5,
    });
  }

  async getTotalCity(): Promise<{ total: number; updatedAt: Date | null }> {
    const result = await this.prisma.city.aggregate({
      _count: true,
      _max: {
        updatedAt: true,
      },
    });

    return {
      total: result._count,
      updatedAt: result._max.updatedAt || null,
    };
  }

  async findByCountryId(countryId: number): Promise<City[]> {
    return await this.prisma.city.findMany({
      where: {
        cou_id: countryId,
      },
      orderBy: { cit_name: 'asc' },
    });
  }

  async findByContinentId(continentId: number): Promise<City[]> {
    return await this.prisma.city.findMany({
      where: {
        country: {
          con_id: continentId,
        },
      },
      orderBy: { cit_name: 'asc' },
    });
  }

  async findById(id: number): Promise<City> {
    return this.prisma.city.findUniqueOrThrow({
      where: {
        cit_id: id,
      },
    });
  }

  async create(dto: CreateCityDto): Promise<City> {
    return await this.prisma.city.create({
      data: {
        cit_name: dto.name,
        cit_population: dto.population,
        cit_latitude: dto.latitude,
        cit_longitude: dto.longitude,
        cou_id: dto.countryId,
      },
    });
  }

  async listAll(): Promise<City[]> {
    return await this.prisma.city.findMany({
      orderBy: { cit_name: 'asc' },
    });
  }

  async update(id: number, dto: UpdateCityDto): Promise<City> {
    return await this.prisma.city.update({
      where: {
        cit_id: id,
      },
      data: {
        cit_name: dto.name,
        cit_population: dto.population,
        cit_latitude: dto.latitude,
        cit_longitude: dto.longitude,
        cou_id: dto.countryId,
      },
    });
  }
  async delete(id: number): Promise<void> {
    await this.prisma.city.delete({
      where: {
        cit_id: id,
      },
    });
  }
}
