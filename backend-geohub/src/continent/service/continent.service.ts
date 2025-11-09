import { Injectable } from '@nestjs/common';
import { Continent } from 'generated/prisma';
import { CreateContinentDto } from '../dtos/create-continent-dto';
import { UpdateContinentDto } from '../dtos/update-continent-dto';
import { ContinentRepository } from '../repositories/continent-repository';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class ContinentService {
  constructor(private readonly continentRepository: ContinentRepository) {}

  public async findById(id: number): Promise<Continent> {
    try {
      return await this.continentRepository.findById(id);
    } catch {
      throw new NotFoundException(`Continent with id ${id} not found`);
    }
  }

  public async create(continent: CreateContinentDto): Promise<Continent> {
    return await this.continentRepository.create(continent);
  }

  public async listAll(): Promise<Continent[]> {
    return await this.continentRepository.listAll();
  }

  public async update(
    id: number,
    continent: UpdateContinentDto,
  ): Promise<Continent> {
    await this.findById(id);
    return this.continentRepository.update(id, continent);
  }

  public async delete(id: number): Promise<void> {
    await this.findById(id);
    await this.continentRepository.delete(id);
  }
}
