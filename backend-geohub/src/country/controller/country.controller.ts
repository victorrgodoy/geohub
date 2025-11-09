import { Body, Controller, HttpCode, HttpStatus, Post, Get, Put, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { CountryService } from '../service/country.service';
import { CreateCountryDto } from '../dtos/create-country-dto';
import { UpdateCountryDto } from '../dtos/update-country-dto';
import { ResponseCountryDto } from '../dtos/response-country-dto';
import { Country } from 'generated/prisma';
import { ParseIntPipe } from '@nestjs/common';

@Controller('/country')
export class CountryController {
  constructor(private countryService: CountryService) {}

  @Get('stats/total-population')
  @HttpCode(HttpStatus.OK)
  async getTotalPopulation(): Promise<{
    total: number;
    updatedAt: Date | null;
  }> {
    return await this.countryService.getTotalPopulation();
  }

  @Get('stats/total-country')
  @HttpCode(HttpStatus.OK)
  async getTotalCountries(): Promise<{
    total: number;
    updatedAt: Date | null;
  }> {
    return await this.countryService.getTotalCountry();
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async list(
    @Query('continentId') continentId?: string,
    @Query('top5') top5?: string,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
    @Query('search') search?: string,
  ) {
    const top5Bool = top5 === 'true';

    if (page && limit) {
      const pageNumber = parseInt(page) || 1;
      const limitNumber = parseInt(limit) || 10;
      const continentIdNumber = continentId ? Number(continentId) : undefined;

      const result = await this.countryService.listPaginated(
        pageNumber,
        limitNumber,
        search,
        continentIdNumber
      );

      return {
        data: result.data.map((c: Country) => new ResponseCountryDto(c)),
        meta: result.meta,
      };
    }

    let countries: Country[];

    if (top5Bool) {
      countries = await this.countryService.listTop5ByPopulation();
    } else {
      countries = await this.countryService.listAll();
    }
    return countries.map((c) => new ResponseCountryDto(c));
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() country: CreateCountryDto): Promise<ResponseCountryDto> {
    const created = await this.countryService.create(country);
    return new ResponseCountryDto(created)
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findById(@Param('id', ParseIntPipe) id :number){
    const finded = await this.countryService.findById(id)
    return new ResponseCountryDto(finded);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() country: UpdateCountryDto,
  ): Promise<ResponseCountryDto> {
    const edited = await this.countryService.update(id, country);
    return new ResponseCountryDto(edited)
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.countryService.delete(id);
  }
}
