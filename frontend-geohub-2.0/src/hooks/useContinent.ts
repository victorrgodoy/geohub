import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createContinent, listAllContinent, updateContinent, deleteContinent } from "../services/continent";
import type { UpdateContinent } from "../types/continent";

const useCreateContinent = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: createContinent,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['continents']})
        }
    })
}

const useListContinent = () => {
    return useQuery({
        queryKey: ['continents'],
        queryFn: listAllContinent,        
    })
}
 
const useUpdateContinent = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, data }: { id: number; data: UpdateContinent }) => 
            updateContinent(id, data), 
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['continents'] })
        }
    })
}

const useDeleteContinent = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deleteContinent,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['continents']})
        }
    })
}


export {useCreateContinent, useListContinent, useUpdateContinent, useDeleteContinent};