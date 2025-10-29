import { Continent } from 'generated/prisma';

export class ResponseContinentDto {
  id:number
  name: string;
  description: string;
  createdAt?: Date;
  updatedAt?: Date;

  constructor(continent: Continent) {
    this.id = continent.con_id;
    this.name = continent.con_name;
    this.description = continent.con_description;
    this.createdAt = continent.createdAt;
    this.updatedAt = continent.updatedAt;
  }
}
