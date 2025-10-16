import { Continent } from 'generated/prisma';
import { CreateContinentDto } from '../dtos/create-continent-dto';
import { UpdateContinentDto } from '../dtos/update-continent-dto';

export abstract class ContinentRepository {
  abstract findById(id: number): Promise<Continent>;
  abstract create(create: CreateContinentDto): Promise<Continent>;
  abstract listAll(): Promise<Continent[]>;
  abstract update(id: number, update: UpdateContinentDto): Promise<Continent>;
  abstract delete(id: number): Promise<void>;
}
