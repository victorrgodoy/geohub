import { Plus, Users, Globe, Building2, ChevronLeft, ChevronRight } from "lucide-react";
import {
    useListContinent,
    useCreateContinent,
    useUpdateContinent,
    ContinentCard,
    ContinentModal,
    type Continent,
    type CreateContinent
} from "../modules/continents";
import { useTotalPopulation, useTotalCountry } from "../modules/countries";
import { useTotalCity } from "../modules/cities";
import { StatCard } from "../modules/overview";
import { useState, useEffect } from "react";

export default function ContinentsPage() {
    // Statistics
    const { data: totalPopulation, isLoading: isLoadingPopulation } = useTotalPopulation();
    const { data: totalCountries, isLoading: isLoadingCountries } = useTotalCountry();
    const { data: totalCities, isLoading: isLoadingCities } = useTotalCity();

    // Continents
    const { data: continents, isLoading: isLoadingContinents } = useListContinent();
    const createMutation = useCreateContinent();
    const updateMutation = useUpdateContinent();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedContinent, setSelectedContinent] = useState<Continent | null>(null);
    const [currentStatIndex, setCurrentStatIndex] = useState(0);

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

    // Carrossel automático
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentStatIndex((prev) => (prev + 1) % stats.length);
        }, 4000); // Muda a cada 4 segundos

        return () => clearInterval(interval);
    }, [stats.length]);

    const nextStat = () => {
        setCurrentStatIndex((prev) => (prev + 1) % stats.length);
    };

    const prevStat = () => {
        setCurrentStatIndex((prev) => (prev - 1 + stats.length) % stats.length);
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

    return (
        <div className="pb-8 space-y-8">
            {/* Description */}
            <p className="text-gray-600 dark:text-gray-400 mt-5">
                Explore and manage continents around the world
            </p>

            {/* Stats Carousel */}
            <div className="relative">
                {/* Desktop: 3 cards visíveis */}
                <div className="hidden md:grid grid-cols-3 gap-6">
                    {stats.map((stat) => (
                        <StatCard key={stat.title} {...stat} />
                    ))}
                </div>

                {/* Mobile: Carrossel */}
                <div className="md:hidden relative overflow-hidden px-1">
                    <div 
                        className="flex transition-transform duration-500 ease-out"
                        style={{ transform: `translateX(-${currentStatIndex * 100}%)` }}
                    >
                        {stats.map((stat) => (
                            <div key={stat.title} className="w-full shrink-0 px-1">
                                <StatCard {...stat} />
                            </div>
                        ))}
                    </div>

                    {/* Navigation Arrows */}
                    <button
                        onClick={prevStat}
                        className="absolute -left-3 top-1/2 -translate-y-1/2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-full p-1.5 shadow-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors z-10"
                        aria-label="Previous stat"
                    >
                        <ChevronLeft className="w-4 h-4 text-gray-900 dark:text-white" />
                    </button>
                    <button
                        onClick={nextStat}
                        className="absolute -right-3 top-1/2 -translate-y-1/2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-full p-1.5 shadow-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors z-10"
                        aria-label="Next stat"
                    >
                        <ChevronRight className="w-4 h-4 text-gray-900 dark:text-white" />
                    </button>

                    {/* Dots Indicator */}
                    <div className="flex justify-center gap-2 mt-4">
                        {stats.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentStatIndex(index)}
                                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                                    index === currentStatIndex 
                                        ? 'bg-blue-600 w-8' 
                                        : 'bg-gray-300 dark:bg-gray-700'
                                }`}
                                aria-label={`Go to stat ${index + 1}`}
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* Continents Section */}
            <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    See More
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
                    Click on any continent card to explore its countries and cities
                </p>

                {/* Continents Grid */}
            {isLoadingContinents ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {[...Array(6)].map((_, i) => (
                        <div
                            key={i}
                            className="h-80 bg-gray-200 dark:bg-gray-800 rounded-xl animate-pulse"
                        />
                    ))}
                </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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

            {/* Floating Action Button (FAB) */}
            <button
                onClick={handleOpenCreateModal}
                className="fixed bottom-8 right-8 w-16 h-16 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-2xl hover:shadow-blue-500/50 flex items-center justify-center transition-all duration-300 hover:scale-110 focus:outline-none cursor-pointer z-40 group"
                aria-label="Create new continent"
            >
                <Plus className="w-7 h-7 transition-transform duration-300 group-hover:rotate-90" />
            </button>
        </div>
    );
}
