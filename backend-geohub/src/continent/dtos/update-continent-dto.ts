import { IsString, IsOptional } from 'class-validator';

export class UpdateContinentDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  description?: string;
}
