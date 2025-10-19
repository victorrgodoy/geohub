export interface CreateCountryDto {
  name: string;
  population: string;
  official_language:string;
  currency:string
  continentId:number
}

export interface UpdateCountryDto {
  name?: string;
  population?: string;
  official_language?:string;
  currency?:string
  continentId?:number
}

export interface Country extends CreateCountryDto {
  id: string;
  createdAt: string;
  updatedAt: string;
}