import { Country } from 'generated/prisma';
import { CountryRepository } from '../repositories/country-repository';
import { CreateCountryDto } from '../dtos/create-country-dto';
import { UpdateCountryDto } from '../dtos/update-country-dto';
import { PrismaService } from 'src/database/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PrismaCountryRepository implements CountryRepository {
  constructor(private prisma: PrismaService) {}

  async listTop5ByPopulation(): Promise<Country[]> {
    return await this.prisma.country.findMany({
      orderBy: { cou_population: 'desc' },
      take: 5,
    });
  }

  async getTotalCountry(): Promise<{ total: number; updatedAt: Date | null }> {
    const data = await this.prisma.country.aggregate({
      _count: { cou_id: true },
      _max: { updatedAt: true },
    });

    return {
      total: data._count.cou_id,
      updatedAt: data._max.updatedAt,
    };
  }

  async getTotalPopulation(): Promise<{
    total: number;
    updatedAt: Date | null;
  }> {
    const data = await this.prisma.country.aggregate({
      _sum: { cou_population: true },
      _max: { updatedAt: true },
    });

    return {
      total: data._sum.cou_population ?? 0,
      updatedAt: data._max.updatedAt,
    };
  }

  async findByContinentId(id: number): Promise<Country[]> {
    return await this.prisma.country.findMany({
      where: {
        con_id: id
      }
    }) 
  }

  async findById(id: number): Promise<Country> {
    return this.prisma.country.findUniqueOrThrow({
      where: {
        cou_id: id,
      },
    });
  }

  async create(dto: CreateCountryDto): Promise<Country> {
    return await this.prisma.country.create({
      data: {
        cou_name: dto.name,
        cou_population: dto.population,
        cou_official_language: dto.official_language,
        cou_currency: dto.currency,
        con_id: dto.continentId,
      },
    });
  }

  async listAll(): Promise<Country[]> {
    return await this.prisma.country.findMany({
      orderBy: { cou_name: 'asc' },
    });
  }

  async update(id: number, dto: UpdateCountryDto): Promise<Country> {
    return await this.prisma.country.update({
      where: {
        cou_id: id,
      },
      data: {
        cou_name: dto.name,
        cou_population: dto.population,
        cou_official_language: dto.official_language,
        cou_currency: dto.currency,
        con_id: dto.continentId,
      },
    });
  }
  async delete(id: number): Promise<void> {
    await this.prisma.country.delete({
      where: {
        cou_id: id,
      },
    });
  }
}
