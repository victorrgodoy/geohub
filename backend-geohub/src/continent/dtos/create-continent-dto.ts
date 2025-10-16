import { IsString, IsNotEmpty } from 'class-validator';

export class CreateContinentDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;
}
