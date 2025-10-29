import { Continent } from 'generated/prisma';

export class ResponseContinentDto {
  name: string;
  description: string;

  constructor(continent: Continent) {
    this.name = continent.con_name;
    this.description = continent.con_description;
  }
}
