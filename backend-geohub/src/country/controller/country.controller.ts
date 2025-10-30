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
  Res,
} from '@nestjs/common';
import { CountryService } from '../service/country.service';
import { CreateCountryDto } from '../dtos/create-country-dto';
import { UpdateCountryDto } from '../dtos/update-country-dto';
import { ResponseCountryDto } from '../dtos/response-country-dto';
import { Country } from 'generated/prisma';
import { ParseIntPipe } from '@nestjs/common';

@Controller('/country')
export class CountryController {
  constructor(private countryService: CountryService) {}

  @Post()
  @HttpCode(HttpStatus.ACCEPTED)
  async create(@Body() country: CreateCountryDto): Promise<ResponseCountryDto> {
    const created = await this.countryService.create(country);
    return new ResponseCountryDto(created)
  }

  @Get('total-country')
  @HttpCode(HttpStatus.OK)
  async getTotalCountries(): Promise<{
    total: number;
    updatedAt: Date | null;
  }> {
    return await this.countryService.getTotalCountry();
  }

  @Get('total-population')
  @HttpCode(HttpStatus.OK)
  async getTotalPopulation(): Promise<{
    total: number;
    updatedAt: Date | null;
  }> {
    return await this.countryService.getTotalPopulation();
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async list(
    @Query('continentName') continentName?: string,
    @Query('top5', ParseBoolPipe) top5?: boolean,
  ): Promise<ResponseCountryDto[]> {
    let countries: Country[];

    if (continentName) {
      countries = await this.countryService.findByContinent(continentName);
    } else if (top5) {
      countries = await this.countryService.listTop5ByPopulation();
    } else {
      countries = await this.countryService.listAll();
    }
    return countries.map((c) => new ResponseCountryDto(c));
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
