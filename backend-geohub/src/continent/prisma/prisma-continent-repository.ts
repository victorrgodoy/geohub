import { Continent } from 'generated/prisma';
import { CreateContinentDto } from '../dtos/create-continent-dto';
import { UpdateContinentDto } from '../dtos/update-continent-dto';
import { ContinentRepository } from '../repositories/continent-repository';
import { PrismaService } from 'src/database/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PrismaContinentRepository implements ContinentRepository {
  constructor(private prisma: PrismaService) {}

  async findById(id: number): Promise<Continent> {
    return this.prisma.continent.findUniqueOrThrow({
      where: {
        con_id: id,
      },
    });
  }

  async create(dto: CreateContinentDto): Promise<Continent> {
    return await this.prisma.continent.create({
      data: {
        con_name: dto.name,
        con_description: dto.description,
      },
    });
  }

  async listAll(): Promise<Continent[]> {
    return await this.prisma.continent.findMany({
      orderBy: { con_name: 'asc' },
    });
  }

  async update(dto: UpdateContinentDto): Promise<Continent> {
    return await this.prisma.continent.update({
      where: {
        con_id: dto.id,
      },
      data: {
        con_name: dto.name,
        con_description: dto.description,
      },
    });
  }
  async delete(id: number): Promise<void> {
    await this.prisma.continent.delete({
      where: {
        con_id: id,
      },
    });
  }
}
