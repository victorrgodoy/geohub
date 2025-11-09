import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { CreateUserDto } from '../dtos/create-user-dto';
import { UpdateUserDto } from '../dtos/update-user-dto';
import { ResponseUserDto } from '../dtos/response-user-dto';
import { UserService } from '../service/user.service';

@Controller('/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() dto: CreateUserDto): Promise<ResponseUserDto> {
    const user = await this.userService.create(dto);
    return new ResponseUserDto(user);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async listAll(): Promise<ResponseUserDto[]> {
    const users = await this.userService.listAll();
    return users.map((user) => new ResponseUserDto(user));
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findById(@Param('id', ParseIntPipe) id: number): Promise<ResponseUserDto> {
    const user = await this.userService.findById(id);
    return new ResponseUserDto(user);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateUserDto,
  ): Promise<ResponseUserDto> {
    const user = await this.userService.update(id, dto);
    return new ResponseUserDto(user);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.userService.delete(id);
  }
}