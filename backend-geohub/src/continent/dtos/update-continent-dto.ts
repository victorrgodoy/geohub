import { IsInt, IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateContinentDto {
  @IsInt()
  @IsNotEmpty()
  id: number;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  description?: string;
}
