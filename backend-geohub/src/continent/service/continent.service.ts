import { Injectable } from '@nestjs/common';
import { Continent } from 'generated/prisma';
import { CreateContinentDto } from '../dtos/create-continent-dto';
import { UpdateContinentDto } from '../dtos/update-continent-dto';
import { ContinentRepository } from '../repositories/continent-repository';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class ContinentService {
  constructor(private readonly continentRepository: ContinentRepository) {}

  public findById(id: number): Promise<Continent> {
    return this.continentRepository.findById(id);
  }

  public create(continent: CreateContinentDto): Promise<Continent> {
    return this.continentRepository.create(continent);
  }

  public listAll(): Promise<Continent[]> {
    return this.continentRepository.listAll();
  }

  public async update(
    id: number,
    continent: UpdateContinentDto,
  ): Promise<Continent> {
    try {
      return await this.continentRepository.update(id, continent);
    } catch {
      throw new NotFoundException(`Continent with id ${id} not found`);
    }
  }

  public async delete(id: number): Promise<void> {
    try {
      await this.continentRepository.delete(id);
    } catch {
      throw new NotFoundException(`Continent with id ${id} not found`);
    }
  }
}
