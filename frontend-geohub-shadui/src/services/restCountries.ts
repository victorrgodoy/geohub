import { restCountriesApi } from "./api";

const getAll = async () => {
  const { data } = await restCountriesApi.get(
    "/all?fields=name,flags,region,languages,currencies,population,subregion",
  );
  return data;
};

export default getAll;