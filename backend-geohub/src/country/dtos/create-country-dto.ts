import { IsInt, IsNotEmpty, IsString, IsPositive, Min } from 'class-validator';

export class CreateCountryDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsInt()
  @IsNotEmpty()
  @IsPositive()
  @Min(1)
  population: number;

  @IsString()
  @IsNotEmpty()
  officialLanguage: string;

  @IsString()
  @IsNotEmpty()
  currency: string;

  @IsInt()
  @IsNotEmpty()
  continentId: number;
}
