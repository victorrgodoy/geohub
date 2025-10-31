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
  ParseBoolPipe,
} from '@nestjs/common';
import { CityService } from '../service/city.service';
import { CreateCityDto } from '../dtos/create-city-dto';
import { ResponseCityDto } from '../dtos/response-city-dto';
import { City } from 'generated/prisma';
import { UpdateCityDto } from '../dtos/update-city-dto';
import { ParseIntPipe } from '@nestjs/common';

@Controller('/city')
export class CityController {
  constructor(private cityService: CityService) {}

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findById(@Param('id', ParseIntPipe) id :number){
    return await this.cityService.findById(id)
  }

  @Post()
  @HttpCode(HttpStatus.ACCEPTED)
  async create(@Body() city: CreateCityDto): Promise<ResponseCityDto> {
    const created = await this.cityService.create(city);
    return new ResponseCityDto(created)
  }

  @Get('total-city')
  @HttpCode(HttpStatus.OK)
  async getTotalCity(): Promise<{ total: number; updatedAt: Date | null }> {
    return await this.cityService.getTotalCity();
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async listAll(
    @Query('countryName') countryName?: string,
    @Query('continentName') continentName?: string,
    @Query('top5', ParseBoolPipe) top5?: boolean,
  ): Promise<ResponseCityDto[]> {
    let cities: City[];

    if (countryName && continentName) {
      cities = await this.cityService.findByCountryAndContinent(
        countryName,
        continentName,
      );
    } else if (countryName) {
      cities = await this.cityService.findByCountry(countryName);
    } else if (continentName) {
      cities = await this.cityService.findByContinent(continentName);
    } else if (top5) {
      cities = await this.cityService.listTop5ByPopulation();
    } else {
      cities = await this.cityService.listAll();
    }
    return cities.map((c) => new ResponseCityDto(c));
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() city: UpdateCityDto,
  ): Promise<ResponseCityDto> {
    const edited = await this.cityService.update(id, city);
    return new ResponseCityDto(edited)
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.cityService.delete(id);
  }
}
