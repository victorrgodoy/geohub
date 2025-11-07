import { useState } from "react";
import { Plus, Search, Edit, Trash2, MapPin, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Pagination from "../shared/components/Pagination";
import {
    useListContinent,
    useCreateContinent,
    useUpdateContinent,
    useDeleteContinent,
    ContinentModal,
    type Continent,
    type CreateContinent,
} from "../modules/continents";

export default function ContinentsManagePage() {
    const navigate = useNavigate();
    const { data: continents, isLoading } = useListContinent();
    const createMutation = useCreateContinent();
    const updateMutation = useUpdateContinent();
    const deleteMutation = useDeleteContinent();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedContinent, setSelectedContinent] = useState<Continent | null>(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const filteredContinents = continents?.filter((continent) =>
        continent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        continent.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const totalPages = Math.ceil((filteredContinents?.length || 0) / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedContinents = filteredContinents?.slice(startIndex, endIndex);

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

    const handleDelete = async (id: number) => {
        if (window.confirm("Are you sure you want to delete this continent? This action cannot be undone.")) {
            try {
                await deleteMutation.mutateAsync(id);
            } catch (error) {
                console.error("Error deleting continent:", error);
            }
        }
    };

    const handleViewDetails = (id: number) => {
        navigate(`/continents/${id}/countries`);
    };

    const handleSearchChange = (value: string) => {
        setSearchTerm(value);
        setCurrentPage(1);
    };

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
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search by name or description..."
                        value={searchTerm}
                        onChange={(e) => handleSearchChange(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none"
                    />
                </div>
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden">
                {isLoading ? (
                    <div className="p-8 text-center">
                        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
                        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">Loading continents...</p>
                    </div>
                ) : paginatedContinents && paginatedContinents.length > 0 ? (
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                                <tr>
                                    <th className="w-64 px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                        Continent
                                    </th>
                                    <th className="hidden md:table-cell px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                        Description
                                    </th>
                                    <th className="w-40 px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                {paginatedContinents.map((continent) => (
                                    <tr
                                        key={continent.id}
                                        className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                                    >
                                        <td className="w-64 px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-lg bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                                                    <MapPin className="w-5 h-5" />
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
                                        </td>
                                        <td className="hidden md:table-cell px-6 py-4">
                                            <div className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                                                {continent.description}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <button
                                                    onClick={() => handleViewDetails(continent.id)}
                                                    className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-lg font-medium transition-colors focus:outline-none cursor-pointer group"
                                                    title="View Countries"
                                                >
                                                    <span>More</span>
                                                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                                                </button>
                                                <button
                                                    onClick={() => handleOpenEditModal(continent)}
                                                    className="p-2 text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 rounded-lg transition-colors focus:outline-none cursor-pointer"
                                                    title="Edit"
                                                >
                                                    <Edit className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(continent.id)}
                                                    className="p-2 text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/30 rounded-lg transition-colors focus:outline-none cursor-pointer"
                                                    title="Delete"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="p-12 text-center">
                        <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                            No continents found
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                            {searchTerm
                                ? "Try adjusting your search terms"
                                : "Get started by adding your first continent"}
                        </p>
                        {!searchTerm && (
                            <button
                                onClick={handleOpenCreateModal}
                                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors focus:outline-none cursor-pointer"
                            >
                                <Plus className="w-4 h-4" />
                                Add Continent
                            </button>
                        )}
                    </div>
                )}
            </div>

            {filteredContinents && filteredContinents.length > 0 && (
                <div className="mt-4">
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={setCurrentPage}
                        totalItems={filteredContinents.length}
                        startIndex={startIndex}
                        endIndex={endIndex}
                        itemName={`continent${filteredContinents.length !== 1 ? "s" : ""}`}
                    />
                </div>
            )}

            {/* Modal */}
            <ContinentModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onSubmit={handleSubmit}
                continent={selectedContinent}
                isLoading={createMutation.isPending || updateMutation.isPending}
            />
        </div>
    );
}
