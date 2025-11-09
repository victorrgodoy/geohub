import { ResponseUserDto } from 'src/user/dtos/response-user-dto';

export class ResponseAuthDto {
  access_token: string;
  user: ResponseUserDto;

  constructor(access_token: string, user: ResponseUserDto) {
    this.access_token = access_token;
    this.user = user;
  }
}
