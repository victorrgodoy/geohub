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
        cou_official_language: dto.officialLanguage,
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

  async listPaginated(
    page: number,
    limit: number,
    search?: string,
    continentId?: number
  ): Promise<any> {
    const skip = (page - 1) * limit;

    const where: any = {};
    if (search) {
      where.cou_name = { contains: search, mode: 'insensitive' };
    }
    if (continentId) {
      where.con_id = continentId;
    }

    const [data, total] = await Promise.all([
      this.prisma.country.findMany({
        skip,
        take: limit,
        orderBy: { cou_name: 'asc' },
        where,
      }),
      this.prisma.country.count({ where }),
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

  async update(id: number, dto: UpdateCountryDto): Promise<Country> {
    const updateData: any = {};
    
    if (dto.name !== undefined) updateData.cou_name = dto.name;
    if (dto.population !== undefined) updateData.cou_population = dto.population;
    if (dto.officialLanguage !== undefined) updateData.cou_official_language = dto.officialLanguage;
    if (dto.currency !== undefined) updateData.cou_currency = dto.currency;
    if (dto.continentId !== undefined) updateData.con_id = dto.continentId;

    return await this.prisma.country.update({
      where: { cou_id: id },
      data: updateData,
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
