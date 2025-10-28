import axios from "axios";

export const getCountryFlag = async (countryName: string): Promise<string> => {
  try {
    const { data } = await axios.get(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`);
    return data[0]?.flags?.svg || '';
  } catch (err) {
    console.error('Error fetching flag for', countryName, err);
    return '';
  }
};