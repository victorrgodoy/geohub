import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { UserRepository } from '../repositories/user-repository';
import { User } from 'generated/prisma';
import { CreateUserDto } from '../dtos/create-user-dto';
import { UpdateUserDto } from '../dtos/update-user-dto';

@Injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateUserDto): Promise<User> {
    return await this.prisma.user.create({
      data: {
        use_email: data.email,
        use_password: data.password,
        use_name: data.name,
        use_role: data.role || 'user',
      },
    });
  }

  async findById(id: number): Promise<User | null> {
    return await this.prisma.user.findUnique({
      where: { use_id: id },
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    return await this.prisma.user.findUnique({
      where: { use_email: email },
    });
  }

  async listAll(): Promise<User[]> {
    return await this.prisma.user.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async update(id: number, dto: UpdateUserDto): Promise<User> {
    const updateData: any = {};
    
    if (dto.email !== undefined) updateData.use_email = dto.email;
    if (dto.password !== undefined) updateData.use_password = dto.password;
    if (dto.name !== undefined) updateData.use_name = dto.name;
    if (dto.role !== undefined) updateData.use_role = dto.role;

    return await this.prisma.user.update({
      where: { use_id: id },
      data: updateData,
    });
  }

  async delete(id: number): Promise<void> {
    await this.prisma.user.delete({
      where: { use_id: id },
    });
  }
}
