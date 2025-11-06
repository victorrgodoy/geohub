import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
    createCity,
    listAllCity,
    updateCity,
    deleteCity,
    totalCity,
} from "../services";
import type { CreateCity } from "../types";

const useCreateCity = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: createCity,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["cities"] });
        },
    });
};

const useListCity = () => {
    return useQuery({
        queryKey: ["cities"],
        queryFn: listAllCity,
    });
};

const useUpdateCity = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, data }: { id: number; data: CreateCity }) =>
            updateCity(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["cities"] });
        },
    });
};

const useDeleteCity = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deleteCity,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["cities"] });
        },
    });
};

const useTotalCity = () => {
    return useQuery({
        queryKey: ["total-cities"],
        queryFn: totalCity,
    });
};

export {
    useCreateCity,
    useListCity,
    useUpdateCity,
    useDeleteCity,
    useTotalCity,
};