import {
  IsInt,
  IsString,
  IsNotEmpty,
  IsNumber,
  Min,
  Max,
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

  @IsNumber({ maxDecimalPlaces: 7 })
  @Min(-90)
  @Max(90)
  @IsOptional()
  latitude: number;

  @IsNumber({ maxDecimalPlaces: 7 })
  @Min(-180)
  @Max(180)
  @IsOptional()
  longitude: number;

  @IsInt()
  @IsOptional()
  countryId: number;  
}
