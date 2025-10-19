export interface CreateCityDto {
  name: string;
  population: string;
  latitude:string;
  longitude:string
  countryId:number
}

export interface UpdateCityDto {
  name?: string;
  population?: string;
  latitude?:string;
  longitude?:string
  countryId?:number
}

export interface City extends CreateCityDto {
  id: string;
  createdAt: string;
  updatedAt: string;
}
