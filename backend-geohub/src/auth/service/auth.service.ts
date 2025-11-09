import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/service/user.service';
import { LoginDto } from '../dtos/login-dto';
import { RegisterDto } from '../dtos/register-dto';
import { ResponseAuthDto } from '../dtos/response-auth-dto';
import { ResponseUserDto } from 'src/user/dtos/response-user-dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findByEmail(email);
    
    if (!user) {
      return null;
    }

    const isPasswordValid = await bcrypt.compare(password, user.use_password);
    
    if (!isPasswordValid) {
      return null;
    }

    return user;
  }

  async login(dto: LoginDto): Promise<ResponseAuthDto> {
    const user = await this.validateUser(dto.email, dto.password);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = {
      sub: user.use_id,
      email: user.use_email,
      role: user.use_role,
    };

    const access_token = this.jwtService.sign(payload);
    const userResponse = new ResponseUserDto(user);

    return new ResponseAuthDto(access_token, userResponse);
  }

  async register(dto: RegisterDto): Promise<ResponseAuthDto> {
    const user = await this.userService.create(dto);

    const payload = {
      sub: user.use_id,
      email: user.use_email,
      role: user.use_role,
    };

    const access_token = this.jwtService.sign(payload);
    const userResponse = new ResponseUserDto(user);

    return new ResponseAuthDto(access_token, userResponse);
  }
}
