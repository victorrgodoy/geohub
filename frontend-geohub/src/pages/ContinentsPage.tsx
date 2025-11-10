import { useState } from "react";
import { Plus, Edit, Trash2, Globe } from "lucide-react";
import { DataTable, SearchInput, ConfirmationModal, type Column, type Action } from "../shared/components";
import {
    useListContinent,
    useCreateContinent,
    useUpdateContinent,
    useDeleteContinent,
    ContinentModal,
    type Continent,
    type CreateContinent,
} from "../modules/continents";

export default function ContinentsPage() {
    const { data: continents, isLoading } = useListContinent();
    const createMutation = useCreateContinent();
    const updateMutation = useUpdateContinent();
    const deleteMutation = useDeleteContinent();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedContinent, setSelectedContinent] = useState<Continent | null>(null);
    const [searchTerm, setSearchTerm] = useState("");

    const filteredContinents = continents?.filter((continent) =>
        continent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        continent.description.toLowerCase().includes(searchTerm.toLowerCase())
    );


    const handleSearchChange = (value: string) => {
      setSearchTerm(value);
    };

    const handleOpenCreateModal = () => {
        setSelectedContinent(null);
        setIsModalOpen(true);
    };

    const handleOpenEditModal = (continent: Continent) => {
        setSelectedContinent(continent);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedContinent(null);
    };

    const handleSubmit = async (data: CreateContinent) => {
        try {
            if (selectedContinent) {
                await updateMutation.mutateAsync({ id: selectedContinent.id, data });
            } else {
                await createMutation.mutateAsync(data);
            }
            handleCloseModal();
        } catch (error) {
            console.error("Error saving continent:", error);
        }
    };

    const handleDelete = async (continent: Continent) => {
        setSelectedContinent(continent);
        setIsDeleteModalOpen(true);
    };

    const handleDeleteConfirm = async () => {
        if (selectedContinent) {
            try {
                await deleteMutation.mutateAsync(selectedContinent.id);
                setIsDeleteModalOpen(false);
                setSelectedContinent(null);
            } catch (error) {
                console.error("Error deleting continent:", error);
            }
        }
    };

    const handleCloseDeleteModal = () => {
        setIsDeleteModalOpen(false);
        setSelectedContinent(null);
    };


    const columns: Column<Continent>[] = [
        {
            key: "continent",
            header: "Continent",
            className: "w-64",
            render: (continent) => (
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                        <Globe className="w-5 h-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                        <div className="text-sm font-medium text-gray-900 dark:text-white truncate">
                            {continent.name}
                        </div>
                        <div className="md:hidden text-xs text-gray-500 dark:text-gray-400 line-clamp-1 mt-0.5">
                            {continent.description}
                        </div>
                    </div>
                </div>
            ),
        },
        {
            key: "description",
            header: "Description",
            hideOnMobile: true,
            render: (continent) => (
                <div className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                    {continent.description}
                </div>
            ),
        },
    ];

    const actions: Action<Continent>[] = [
        {
            icon: Edit,
            label: "Edit",
            onClick: (continent) => handleOpenEditModal(continent),
            variant: "secondary",
        },
        {
            icon: Trash2,
            label: "Delete",
            onClick: (continent) => handleDelete(continent),
            variant: "danger",
        },
    ];

    return (
        <div className="pb-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        Manage all continents and their information
                    </p>
                </div>
                <button
                    onClick={handleOpenCreateModal}
                    className="flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors duration-200 focus:outline-none cursor-pointer"
                >
                    <Plus className="w-5 h-5" />
                    Add Continent
                </button>
            </div>

            <div className="mb-6">
                <SearchInput
                    value={searchTerm}
                    onChange={handleSearchChange}
                    placeholder="Search by name or description..."
                />
            </div>

            <DataTable
                data={filteredContinents}
                columns={columns}
                actions={actions}
                isLoading={isLoading}
                emptyMessage={
                    searchTerm
                        ? "No continents found. Try adjusting your search terms."
                        : "No continents found. Get started by adding your first continent."
                }
                loadingMessage="Loading continents..."
            />

            {/* Modal */}
            <ContinentModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onSubmit={handleSubmit}
                continent={selectedContinent}
                isLoading={createMutation.isPending || updateMutation.isPending}
            />

            <ConfirmationModal
                isOpen={isDeleteModalOpen}
                onClose={handleCloseDeleteModal}
                onConfirm={handleDeleteConfirm}
                title="Delete Continent"
                message={`Are you sure you want to delete "${selectedContinent?.name}"? This action cannot be undone.`}
                confirmText="Delete"
                cancelText="Cancel"
                isLoading={deleteMutation.isPending}
            />
        </div>
    );
}
