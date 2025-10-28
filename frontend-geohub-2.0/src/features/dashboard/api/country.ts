import api from "../../../lib/axios"

export interface CountryTotalResponse {
    total: number,
    updatedAt: string | null
}

export interface CountryReponse {
    name: string,
    population: string | number,
    latitude: number,
    longitude: number
}

export const getTotalCountry = async ():Promise<CountryTotalResponse> => {
    const {data} =  await api.get('/country/total-country')
    return data;
}

export const getTotalPopulation = async ():Promise<CountryTotalResponse> => {
    const {data} =  await api.get('/country/total-population')
    return data;
}

export const listTop5Country = async (): Promise<CountryReponse[]> => {
  const { data } = await api.get('/country?top5=true')
  return data;
}