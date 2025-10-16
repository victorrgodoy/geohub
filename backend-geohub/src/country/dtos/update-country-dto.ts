import { IsInt, IsNotEmpty, IsString, IsPositive, Min, IsOptional } from 'class-validator';

export class UpdateCountryDto {

  @IsInt()
  @IsPositive()
  @Min(1) 
  @IsNotEmpty()
  id: number;

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
}