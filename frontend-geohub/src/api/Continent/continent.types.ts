export interface CreateContinentDto {
  name: string;
  description: string;
}

export interface UpdateContinentDto {
  name?: string;
  description?: string;
}

export interface Continent extends CreateContinentDto {
  id: string;
  createdAt: string;
  updatedAt: string;
}