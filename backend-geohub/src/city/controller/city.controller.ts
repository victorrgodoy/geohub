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

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() city: CreateCityDto): Promise<ResponseCityDto> {
    const created = await this.cityService.create(city);
    return new ResponseCityDto(created);
  }

  @Get('stats/total-city')
  @HttpCode(HttpStatus.OK)
  async getTotalCity(): Promise<{ total: number; updatedAt: Date | null }> {
    return await this.cityService.getTotalCity();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findById(@Param('id', ParseIntPipe) id: number) {
    const finded = await this.cityService.findById(id);
    return new ResponseCityDto(finded);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async listAll(
    @Query('countryId') countryId?: string,
    @Query('continentId') continentId?: string,
    @Query('top5') top5?: string,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ) {
    const top5Bool = top5 === 'true';

    // Se tem paginação, retorna paginado
    if (page && limit) {
      const pageNumber = parseInt(page) || 1;
      const limitNumber = parseInt(limit) || 10;
      
      const result = await this.cityService.listPaginated(pageNumber, limitNumber);
      
      return {
        data: result.data.map((c: City) => new ResponseCityDto(c)),
        meta: result.meta,
      };
    }

    // Lógica antiga (sem paginação)
    let cities: City[];

    if (countryId) {
      cities = await this.cityService.findByCountryId(Number(countryId));
    } else if (continentId) {
      cities = await this.cityService.findByContinentId(Number(continentId));
    } else if (top5Bool) {
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
    return new ResponseCityDto(edited);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.cityService.delete(id);
  }
}
