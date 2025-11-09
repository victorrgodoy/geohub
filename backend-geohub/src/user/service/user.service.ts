import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { User } from 'generated/prisma';
import { CreateUserDto } from '../dtos/create-user-dto';
import { UpdateUserDto } from '../dtos/update-user-dto';
import { UserRepository } from '../repositories/user-repository';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async create(dto: CreateUserDto): Promise<User> {
    const existingUser = await this.userRepository.findByEmail(dto.email);
    if (existingUser) {
      throw new ConflictException('Email already in use');
    }


    const hashedPassword = await bcrypt.hash(dto.password, 10);
    return await this.userRepository.create({
      ...dto,
      password: hashedPassword,
    });
  }

  async findById(id: number): Promise<User> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    return await this.userRepository.findByEmail(email);
  }

  async listAll(): Promise<User[]> {
    return await this.userRepository.listAll();
  }

  async update(id: number, dto: UpdateUserDto): Promise<User> {
    await this.findById(id);
 
    if (dto.email) {
      const existingUser = await this.userRepository.findByEmail(dto.email);
      if (existingUser && existingUser.use_id !== id) {
        throw new ConflictException('Email already in use');
      }
    }

    if (dto.password) {
      dto.password = await bcrypt.hash(dto.password, 10);
    }

    return await this.userRepository.update(id, dto);
  }

  async delete(id: number): Promise<void> {
    await this.findById(id);
    await this.userRepository.delete(id);
  }
}
