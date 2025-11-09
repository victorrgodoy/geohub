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

  async listPaginated(page: number, limit: number): Promise<any> {
    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      this.prisma.city.findMany({
        skip,
        take: limit,
        orderBy: { cit_name: 'asc' },
      }),
      this.prisma.city.count(),
    ]);

    return {
      data,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async update(id: number, dto: UpdateCityDto): Promise<City> {
    const updateData: any = {};
    
    if (dto.name !== undefined) updateData.cit_name = dto.name;
    if (dto.population !== undefined) updateData.cit_population = dto.population;
    if (dto.latitude !== undefined) updateData.cit_latitude = dto.latitude;
    if (dto.longitude !== undefined) updateData.cit_longitude = dto.longitude;
    if (dto.countryId !== undefined) updateData.cou_id = dto.countryId;

    return await this.prisma.city.update({
      where: { cit_id: id },
      data: updateData,
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
