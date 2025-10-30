import axios from "axios";

export const getAllCountries = async () => {
  const { data } = await axios.get(
    "https://restcountries.com/v3.1/all?fields=name,flags,region,languages,currencies,population,subregion",
  );
  return data;
};
