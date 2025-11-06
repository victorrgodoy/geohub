import { Users, Globe, Building2, Plus } from "lucide-react";
import { useTotalPopulation, useTotalCountry } from "../modules/countries";
import { useTotalCity } from "../modules/cities";
import { StatCard } from "../modules/overview";
import {
    useListContinent,
    useCreateContinent,
    useUpdateContinent,
    ContinentCard,
    ContinentModal,
    type Continent,
    type CreateContinent
} from "../modules/continents";
import { useState } from "react";

export default function OverviewPage() {
    const { data: totalPopulation, isLoading: isLoadingPopulation } = useTotalPopulation();
    const { data: totalCountries, isLoading: isLoadingCountries } = useTotalCountry();
    const { data: totalCities, isLoading: isLoadingCities } = useTotalCity();

    // Continents
    const { data: continents, isLoading: isLoadingContinents } = useListContinent();
    const createMutation = useCreateContinent();
    const updateMutation = useUpdateContinent();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedContinent, setSelectedContinent] = useState<Continent | null>(null);

    const stats = [
        {
            title: "Total Population",
            value: totalPopulation?.total,
            icon: Users,
            color: "blue" as const,
            updatedAt: totalPopulation?.updatedAt,
            isLoading: isLoadingPopulation,
        },
        {
            title: "Total Countries",
            value: totalCountries?.total,
            icon: Globe,
            color: "green" as const,
            updatedAt: totalCountries?.updatedAt,
            isLoading: isLoadingCountries,
        },
        {
            title: "Total Cities",
            value: totalCities?.total,
            icon: Building2,
            color: "purple" as const,
            updatedAt: totalCities?.updatedAt,
            isLoading: isLoadingCities,
        },
    ];

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

    return (
        <div className="pb-8 space-y-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {stats.map((stat) => (
                    <StatCard key={stat.title} {...stat} />
                ))}
            </div>

            {/* Continents Section */}
            <div>
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                            Continents
                        </h2>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            Explore and manage continents
                        </p>
                    </div>
                    <button
                        onClick={handleOpenCreateModal}
                        className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors duration-200 focus:outline-none cursor-pointer"
                    >
                        <Plus className="w-5 h-5" />
                        New
                    </button>
                </div>

                {/* Continents Grid */}
                {isLoadingContinents ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {[...Array(6)].map((_, i) => (
                            <div
                                key={i}
                                className="h-48 bg-gray-200 dark:bg-gray-800 rounded-xl animate-pulse"
                            />
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {continents?.map((continent) => (
                            <ContinentCard
                                key={continent.id}
                                continent={continent}
                                onEdit={handleOpenEditModal}
                            />
                        ))}
                    </div>
                )}
            </div>

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