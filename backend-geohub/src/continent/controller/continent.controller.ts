import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Get,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { ContinentService } from '../service/continent.service';
import { CreateContinentDto } from '../dtos/create-continent-dto';
import { Continent } from 'generated/prisma';
import { UpdateContinentDto } from '../dtos/update-continent-dto';
import { ParseIntPipe } from '@nestjs/common';

@Controller('/continent')
export class ContinentController {
  constructor(private continentService: ContinentService) {}

  @Post()
  @HttpCode(HttpStatus.ACCEPTED)
  async create(@Body() continent: CreateContinentDto): Promise<Continent> {
    return this.continentService.create(continent);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async listAll(): Promise<Continent[]> {
    return this.continentService.listAll();
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() continent: UpdateContinentDto,
  ): Promise<Continent> {
    continent.id = id;
    return this.continentService.update(continent);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.continentService.delete(id);
  }
}
