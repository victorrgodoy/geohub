import { IsInt, IsString, IsNotEmpty, IsNumber, Min } from 'class-validator';

export class CreateCityDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsInt()
  @Min(0)
  population: number;

  @IsNumber({ maxDecimalPlaces: 8 })
  latitude: number;

  @IsNumber({ maxDecimalPlaces: 8 })
  longitude: number;

  @IsInt()
  countryId: number;
}
