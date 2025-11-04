import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  findById,
  createContinent,
  listAllContinent,
  updateContinent,
  deleteContinent,
} from "../../services/continent";
import type { CreateContinent } from "../../types/Continent";

const useFindByIdContinent = (id: number) => {
  return useQuery({
    queryKey: ["continent", id],
    queryFn: () => findById(id), 
    enabled: !!id
  });
};

const useCreateContinent = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createContinent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["continents"] });
    },
  });
};

const useListContinent = () => {
  return useQuery({
    queryKey: ["continents"],
    queryFn: listAllContinent,
  });
};

const useUpdateContinent = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: CreateContinent }) =>
      updateContinent(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["continents"] });
    },
  });
};

const useDeleteContinent = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteContinent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["continents"] });
    },
  });
};

export {
  useCreateContinent,
  useListContinent,
  useUpdateContinent,
  useDeleteContinent,
  useFindByIdContinent
};
