import { Users, Globe, Building2, ChevronLeft, ChevronRight } from "lucide-react";
import { useTotalPopulation, useTotalCountry } from "../modules/countries";
import { useTotalCity } from "../modules/cities";
import { StatCard } from "../modules/overview";
import { useState, useEffect } from "react";

export default function ContinentsPage() {
    // Statistics
    const { data: totalPopulation, isLoading: isLoadingPopulation } = useTotalPopulation();
    const { data: totalCountries, isLoading: isLoadingCountries } = useTotalCountry();
    const { data: totalCities, isLoading: isLoadingCities } = useTotalCity();

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
                                className={`w-2 h-2 rounded-full transition-all duration-300 ${index === currentStatIndex
                                        ? 'bg-blue-600 w-8'
                                        : 'bg-gray-300 dark:bg-gray-700'
                                    }`}
                                aria-label={`Go to stat ${index + 1}`}
                            />
                        ))}
                    </div>
                </div>
            </div>

        </div>
    );
}
