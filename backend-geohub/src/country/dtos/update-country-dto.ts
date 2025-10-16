import { IsInt, IsString, IsPositive, Min, IsOptional } from 'class-validator';

export class UpdateCountryDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsInt()
  @IsPositive()
  @Min(1)
  @IsOptional()
  population?: number;

  @IsString()
  @IsOptional()
  official_language?: string;

  @IsString()
  @IsOptional()
  currency?: string;

  @IsInt()
  @IsOptional()
  continentId?: number;
}
