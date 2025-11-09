import { User } from 'generated/prisma';

export class ResponseUserDto {
  id: number;
  name: string;
  email: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(user: User) {
    this.id = user.use_id;
    this.name = user.use_name;
    this.email = user.use_email;
    this.role = user.use_role;
    this.createdAt = user.createdAt;
    this.updatedAt = user.updatedAt;
  }
}
