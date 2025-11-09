import { Body, Controller, HttpCode, HttpStatus, Post, Get, Put, Param, Delete} from '@nestjs/common';
import { ContinentService } from '../service/continent.service';
import { CreateContinentDto } from '../dtos/create-continent-dto';
import { UpdateContinentDto } from '../dtos/update-continent-dto';
import { ResponseContinentDto } from '../dtos/response-continent-dto';
import { ParseIntPipe } from '@nestjs/common';

@Controller('/continent')
export class ContinentController {
  constructor(private continentService: ContinentService) {}

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findById(@Param('id', ParseIntPipe) id: number) {
    const finded = await this.continentService.findById(id);
    return new ResponseContinentDto(finded);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() continent: CreateContinentDto,
  ): Promise<ResponseContinentDto> {
    const created = await this.continentService.create(continent);
    return new ResponseContinentDto(created)
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async listAll(): Promise<ResponseContinentDto[]> {
    const continents = await this.continentService.listAll();
    return continents.map((c) => new ResponseContinentDto(c));
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() continent: UpdateContinentDto,
  ): Promise<ResponseContinentDto> {
    const edited = await this.continentService.update(id, continent);
    return new ResponseContinentDto(edited);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.continentService.delete(id);
  }
}
