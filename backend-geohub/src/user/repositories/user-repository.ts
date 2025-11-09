import { User } from 'generated/prisma';
import { CreateUserDto } from '../dtos/create-user-dto';
import { UpdateUserDto } from '../dtos/update-user-dto';

export abstract class UserRepository {
  abstract create(data: CreateUserDto): Promise<User>;
  abstract findById(id: number): Promise<User | null>;
  abstract findByEmail(email: string): Promise<User | null>;
  abstract listAll(): Promise<User[]>;
  abstract update(id: number, data: UpdateUserDto): Promise<User>;
  abstract delete(id: number): Promise<void>;
}
