import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
    createCountry,
    listAllCountry,
    updateCountry,
    deleteCountry,
    totalCountry,
    totalPopulation,
    top5Country,
    findByContinentId
} from "../services";
import type { CreateCountry } from "../types";

const useFindByContinentIdCountry = (id: number) => {
    return useQuery({
        queryKey: ["continent-countries", id],
        queryFn: () => findByContinentId(id),
        enabled: !!id,
    });
};

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
        queryKey: ["total-countries"],
        queryFn: totalCountry,
    });
};

const useTotalPopulation = () => {
    return useQuery({
        queryKey: ["total-population"],
        queryFn: totalPopulation,
    });
};

const useTop5Country = () => {
    return useQuery({
        queryKey: ["top5-countries"],
        queryFn: top5Country,
    });
};

export {
    useFindByContinentIdCountry,
    useCreateCountry,
    useListCountry,
    useUpdateCountry,
    useDeleteCountry,
    useTotalCountry,
    useTotalPopulation,
    useTop5Country,
};
