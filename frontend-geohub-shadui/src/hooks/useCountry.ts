import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createCountry,
  listAllCountry,
  updateCountry,
  deleteCountry,
  totalCountry,
  totalPopulation,
  top5Country,
} from "../services/country";
import type { CreateCountry } from "../types/Country";
import { formatDate } from "../utils/formatDate";

const useCreateCountry = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createCountry,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["countries"] });
    },
  });
};

const useListCountry = () => {
  return useQuery({
    queryKey: ["countries"],
    queryFn: listAllCountry,
  });
};

const useUpdateCountry = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: CreateCountry }) =>
      updateCountry(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["countries"] });
    },
  });
};

const useDeleteCountry = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteCountry,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["countries"] });
    },
  });
};

const useTotalCountry = () => {
  return useQuery({
    queryKey: ["total-ountries"],
    queryFn: totalCountry,
  });
};

const useTotalPopulation = () => {
  return useQuery({
    queryKey: ["total-population"],
    queryFn: async () => {
      const data = await totalPopulation();
      return {
        ...data,
        formattedDate: formatDate(data.updatedAt),
      };
    },
  });
};

const useTop5Country = () => {
  return useQuery({
    queryKey: ["top5-countries"],
    queryFn: top5Country,
  });
};

export {
  useCreateCountry,
  useListCountry,
  useUpdateCountry,
  useDeleteCountry,
  useTotalCountry,
  useTotalPopulation,
  useTop5Country,
};
