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
import { CountryService } from '../service/country.service';
import { CreateCountryDto } from '../dtos/create-country-dto';
import { UpdateCountryDto } from '../dtos/update-country-dto';
import { Country } from 'generated/prisma';
import { ParseIntPipe } from '@nestjs/common';

@Controller('/country')
export class CountryController {
  constructor(private countryService: CountryService) {}

  @Post()
  @HttpCode(HttpStatus.ACCEPTED)
  async create(@Body() country: CreateCountryDto): Promise<Country> {
    return this.countryService.create(country);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async list(
    @Query('continentName') continentName?: string,
  ): Promise<Country[]> {
    if (continentName) {
      return await this.countryService.findByContinent(continentName);
    }
    return await this.countryService.listAll();
  }
  @Put(':id')
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() country: UpdateCountryDto,
  ): Promise<Country> {
    return this.countryService.update(id, country);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.countryService.delete(id);
  }
}
