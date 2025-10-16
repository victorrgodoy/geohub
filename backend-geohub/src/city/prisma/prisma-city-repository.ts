import { City } from 'generated/prisma';
import { CreateCityDto } from '../dtos/create-city-dto';
import { UpdateCityDto } from '../dtos/update-city-dto';
import { CityRepository } from '../repositories/city-repository';
import { PrismaService } from 'src/database/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PrismaCityRepository implements CityRepository {
  constructor(private prisma: PrismaService) {}

  async findByCountry(countryName: string): Promise<City[]> {
    return await this.prisma.city.findMany({
      where: {
        country: {
          cou_name: countryName,
        },
      },
    });
  }

  async findByContinent(continentName: string): Promise<City[]> {
    return await this.prisma.city.findMany({
      where: {
        country: {
          continent: {
            con_name: continentName,
          },
        },
      },
    });
  }

  async findByCountryAndContinent(
    countryName: string,
    continentName: string,
  ): Promise<City[]> {
    return await this.prisma.city.findMany({
      where: {
        country: {
          cou_name: countryName,
          continent: {
            con_name: continentName,
          },
        },
      },
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
