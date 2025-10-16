import {
  IsInt,
  IsString,
  IsNotEmpty,
  IsNumber,
  Min,
  IsOptional,
} from 'class-validator';

export class UpdateCityDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  name: string;

  @IsInt()
  @Min(0)
  @IsOptional()
  population: number;

  @IsNumber({ maxDecimalPlaces: 8 })
  @IsOptional()
  latitude: number;

  @IsNumber({ maxDecimalPlaces: 8 })
  @IsOptional()
  longitude: number;

  @IsInt()
  @IsOptional()
  countryId: number;
}
