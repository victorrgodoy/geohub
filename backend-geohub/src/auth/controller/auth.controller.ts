import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from '../service/auth.service';
import { LoginDto } from '../dtos/login-dto';
import { RegisterDto } from '../dtos/register-dto';
import { ResponseAuthDto } from '../dtos/response-auth-dto';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';

@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() dto: LoginDto): Promise<ResponseAuthDto> {
    return await this.authService.login(dto);
  }

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() dto: RegisterDto): Promise<ResponseAuthDto> {
    return await this.authService.register(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  @HttpCode(HttpStatus.OK)
  async getProfile(@Request() req: any) {
    return req.user;
  }
}
