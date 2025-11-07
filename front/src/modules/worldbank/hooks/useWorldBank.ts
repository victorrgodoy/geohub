import { useQuery } from "@tanstack/react-query";
import { fetchGlobalStats } from "../services/worldbank";

export const useGlobalStats = () => {
  return useQuery({
    queryKey: ["worldbank-global-stats"],
    queryFn: fetchGlobalStats,
    staleTime: 1000 * 60 * 60 * 24,
    retry: 2,
  });
};
