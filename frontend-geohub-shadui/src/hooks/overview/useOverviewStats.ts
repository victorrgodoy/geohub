import { useTotalPopulation, useTotalCountry } from "../country/index";

export function useOverviewStats() {
  const { data: totalPopulation, isLoading: isLoadingPopulation } = useTotalPopulation();
  const { data: totalCountry, isLoading: isLoadingCountry } = useTotalCountry();

  const isLoading = isLoadingPopulation || isLoadingCountry;

  return {
    totalPopulation,
    totalCountry,
    isLoading,
  };
}