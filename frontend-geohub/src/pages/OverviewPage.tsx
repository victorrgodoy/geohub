import { Users, Globe, MapPin, ChevronLeft, ChevronRight, TrendingUp } from "lucide-react";
import { useTotalPopulation, useTotalCountry, useTop5Country, type Country } from "../modules/countries";
import { useListContinent } from "../modules/continents";
import { StatCard, GlobalInsightsCard } from "../modules/overview";
import { DataTable, DataSourceInfo, type Column } from "../shared/components";
import { useState, useEffect } from "react";
import { formatNumber } from "../shared/utils";

export default function ContinentsPage() {
    const { data: totalPopulation, isLoading: isLoadingPopulation } = useTotalPopulation();
    const { data: totalCountries, isLoading: isLoadingCountries } = useTotalCountry();
    const { data: continents, isLoading: isLoadingContinents } = useListContinent();
    const { data: top5Countries, isLoading: isLoadingTop5 } = useTop5Country();

    const [currentStatIndex, setCurrentStatIndex] = useState(0);

    const stats = [
        {
            title: "Registered Population",
            value: totalPopulation?.total,
            icon: Users,
            color: "blue" as const,
            updatedAt: totalPopulation?.updatedAt,
            isLoading: isLoadingPopulation,
        },
        {
            title: "Registered Countries",
            value: totalCountries?.total,
            icon: Globe,
            color: "green" as const,
            updatedAt: totalCountries?.updatedAt,
            isLoading: isLoadingCountries,
        },
        {
            title: "Registered Continents",
            value: continents?.length,
            icon: MapPin,
            color: "purple" as const,
            updatedAt: undefined,
            isLoading: isLoadingContinents,
        },
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentStatIndex((prev) => (prev + 1) % stats.length);
        }, 4000); 

        return () => clearInterval(interval);
    }, [stats.length]);

    const nextStat = () => {
        setCurrentStatIndex((prev) => (prev + 1) % stats.length);
    };

    const prevStat = () => {
        setCurrentStatIndex((prev) => (prev - 1 + stats.length) % stats.length);
    };


    const top5Columns: Column<Country>[] = [
        {
            key: "rank",
            header: "#",
            className: "w-16",
            render: (country) => {
                const index = top5Countries?.findIndex(c => c.id === country.id) ?? -1;
                return (
                    <div className="flex items-center justify-center">
                        <span className="text-sm font-bold text-blue-600 dark:text-blue-400">
                            {index + 1}
                        </span>
                    </div>
                );
            },
        },
        {
            key: "country",
            header: "Country",
            render: (country) => (
                <div className="text-sm font-medium text-gray-900 dark:text-white truncate">
                    {country.name}
                </div>
            ),
        },
        {
            key: "population",
            header: "Population",
            hideOnMobile: true,
            render: (country) => (
                <span className="text-sm font-semibold text-gray-900 dark:text-white">
                    {formatNumber(country.population)}
                </span>
            ),
        },
        {
            key: "language",
            header: "Language",
            hideOnTablet: true,
            render: (country) => (
                <span className="text-sm text-gray-600 dark:text-gray-400">
                    {country.officialLanguage || "-"}
                </span>
            ),
        },
        {
            key: "currency",
            header: "Currency",
            hideOnTablet: true,
            render: (country) => (
                <span className="text-sm text-gray-600 dark:text-gray-400">
                    {country.currency || "-"}
                </span>
            ),
        },
    ];

    return (
        <div className="pb-8 space-y-8">
            <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    Overview of registered data in the system
                </p>
            </div>

            <DataSourceInfo />

            {/* desktop view card */}
            <div className="relative">
                <div className="hidden md:grid grid-cols-3 gap-6">
                    {stats.map((stat) => (
                        <StatCard key={stat.title} {...stat} />
                    ))}
                </div>
                
          
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
                    <button
                        onClick={prevStat}
                        className="cursor-pointer absolute -left-3 top-1/2 -translate-y-1/2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-full p-1.5 shadow-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors z-10"
                        aria-label="Previous stat"
                    >
                        <ChevronLeft className="w-4 h-4 text-gray-900 dark:text-white" />
                    </button>
                    <button
                        onClick={nextStat}
                        className="cursor-pointer absolute -right-3 top-1/2 -translate-y-1/2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-full p-1.5 shadow-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors z-10"
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

            {/* Global Insights from World Bank */}
            <GlobalInsightsCard />

            {/* Top 5 Countries Section */}
            <div>
                <div className="flex items-center gap-2 mb-4">
                    <TrendingUp className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                        Top 5 Most Populous Countries
                    </h2>
                </div>
                
                <DataTable
                    data={top5Countries}
                    columns={top5Columns}
                    isLoading={isLoadingTop5}
                    emptyMessage="No countries data available"
                    loadingMessage="Loading top countries..."
                />
            </div>

        </div>
    );
}
