import { useState } from "react";
import type { Continent } from "../../types/Continent";
import { useCreateContinent, useUpdateContinent, useDeleteContinent } from "../continent/index";

export function useOverviewModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [editingContinent, setEditingContinent] = useState<Continent | null>(null);
  
  const createMutation = useCreateContinent();
  const updateMutation = useUpdateContinent();
  const deleteMutation = useDeleteContinent();

  const openNew = () => {
    setEditingContinent(null);
    setIsOpen(true);
  };

  const openEdit = (continent: Continent) => {
    setEditingContinent(continent);
    setIsOpen(true);
  };

  const close = () => {
    setIsOpen(false);
    setEditingContinent(null);
  };

  const save = async (continent: Continent) => {
    if (continent.id) {
      await updateMutation.mutateAsync({ id: continent.id, data: continent });
    } else {
      await createMutation.mutateAsync(continent);
    }
    close();
  };

  const remove = async (id: number) => {
    await deleteMutation.mutateAsync(id);
    close();
  };

  return {
    isOpen,
    editingContinent,
    isLoading: createMutation.isPending || updateMutation.isPending || deleteMutation.isPending,
    openNew,
    openEdit,
    close,
    save,
    remove,
  };
}