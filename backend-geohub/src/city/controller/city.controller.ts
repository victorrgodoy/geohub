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
  Query,
} from '@nestjs/common';
import { CityService } from '../service/city.service';
import { CreateCityDto } from '../dtos/create-city-dto';
import { City } from 'generated/prisma';
import { UpdateCityDto } from '../dtos/update-city-dto';
import { ParseIntPipe } from '@nestjs/common';

@Controller('/city')
export class CityController {
  constructor(private cityService: CityService) {}

  @Post()
  @HttpCode(HttpStatus.ACCEPTED)
  async create(@Body() city: CreateCityDto): Promise<City> {
    return this.cityService.create(city);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async listAll(
    @Query('countryName') countryName?: string,
    @Query('continentName') continentName?: string,
  ): Promise<City[]> {
    if (countryName && continentName) {
      return this.cityService.findByCountryAndContinent(
        countryName,
        continentName,
      );
    }

    if (countryName) {
      return this.cityService.findByCountry(countryName);
    }

    if (continentName) {
      return this.cityService.findByContinent(continentName);
    }

    return this.cityService.listAll();
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() city: UpdateCityDto,
  ): Promise<City> {
    return this.cityService.update(id, city);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.cityService.delete(id);
  }
}
