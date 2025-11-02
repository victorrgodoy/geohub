import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createCountry,
  listAllCountry,
  updateCountry,
  deleteCountry,
} from "../services/country";
import type { CreateCountry } from "../types/Country";

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

export {
  useCreateCountry,
  useListCountry,
  useUpdateCountry,
  useDeleteCountry,
};
