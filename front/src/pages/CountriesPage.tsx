import { useState } from "react";
import { Plus, Search, Edit, Trash2, Globe, Filter, ArrowRight } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import Pagination from "../shared/components/Pagination";
import {
    useListContinent,
    useFindByIdContinent,
} from "../modules/continents";
import {
    useFindByContinentIdCountry,
    useListCountry,
} from "../modules/countries";

function ContinentName({ continentId }: { continentId: number }) {
    const { data: continent, isLoading, error } = useFindByIdContinent(continentId);

    if (isLoading) return <span className="text-gray-400">Loading...</span>;
    if (error) return <span className="text-red-500">Error</span>;
    if (!continent) return <span className="text-gray-400">-</span>;

    return <span className="text-sm text-gray-900 dark:text-white">{continent.name}</span>;
} 
export default function CountriesPage() {
    const navigate = useNavigate();
    const { continentId } = useParams<{ continentId: string }>();

    const [searchTerm, setSearchTerm] = useState("");
    const [selectedContinentFilter, setSelectedContinentFilter] = useState<string>("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const activeContinentId = continentId ? Number(continentId) : (selectedContinentFilter ? Number(selectedContinentFilter) : 0);
    const { data: continent } = useFindByIdContinent(activeContinentId);
    const { data: countriesByContinent, isLoading: isLoadingByContinent } = useFindByContinentIdCountry(activeContinentId);
    const { data: allCountries, isLoading: isLoadingAll } = useListCountry();
    const { data: continents } = useListContinent();

    const countries = activeContinentId ? countriesByContinent : allCountries;
    const isLoading = activeContinentId ? isLoadingByContinent : isLoadingAll;

    const filteredCountries = countries?.filter((country) => {
        const matchesSearch = country.name.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesSearch;
    });

    const totalPages = Math.ceil((filteredCountries?.length || 0) / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedCountries = filteredCountries?.slice(startIndex, endIndex);

    const handleSearchChange = (value: string) => {
        setSearchTerm(value);
        setCurrentPage(1);
    };

    const handleContinentFilterChange = (value: string) => {
        setSelectedContinentFilter(value);
        setCurrentPage(1);
    };

    const handleViewDetails = (id: number) => {
        navigate(`/countries/${id}/cities`);
    };

    return (
        <div className="pb-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        {continentId && continent
                            ? `Manage countries in ${continent.name}`
                            : "Manage all countries and their information"}
                    </p>
                </div>
                <button
                    className="flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors duration-200 focus:outline-none cursor-pointer"
                >
                    <Plus className="w-5 h-5" />
                    Add Country
                </button>
            </div>

            <div className="mb-6 flex flex-col sm:flex-row gap-4">
                <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search by name..."
                        value={searchTerm}
                        onChange={(e) => handleSearchChange(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none"
                    />
                </div>

                {!continentId && (
                    <div className="sm:w-64 relative">
                        <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <select
                            value={selectedContinentFilter}
                            onChange={(e) => handleContinentFilterChange(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white focus:outline-none cursor-pointer appearance-none"
                        >
                            <option value="">All Continents</option>
                            {continents?.map((cont) => (
                                <option key={cont.id} value={cont.id}>
                                    {cont.name}
                                </option>
                            ))}
                        </select>
                    </div>
                )}
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden">
                {isLoading ? (
                    <div className="p-8 text-center">
                        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
                        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">Loading countries...</p>
                    </div>
                ) : paginatedCountries && paginatedCountries.length > 0 ? (
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                                <tr>
                                    <th className="w-64 px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                        Country
                                    </th>
                                    {!continentId && (
                                        <th className="hidden lg:table-cell w-48 px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                            Continent
                                        </th>
                                    )}
                                    <th className="hidden md:table-cell px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                        Population
                                    </th>
                                    <th className="hidden xl:table-cell px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                        Language
                                    </th>
                                    <th className="hidden xl:table-cell px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                        Currency
                                    </th>
                                    <th className="w-40 px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                {paginatedCountries.map((country) => (
                                    <tr
                                        key={country.id}
                                        className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                                    >
                                        <td className="w-64 px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-lg bg-green-50 dark:bg-green-950/30 text-green-600 dark:text-green-400 flex items-center justify-center shrink-0">
                                                    <Globe className="w-5 h-5" />
                                                </div>
                                                <div className="min-w-0 flex-1">
                                                    <div className="text-sm font-medium text-gray-900 dark:text-white truncate">
                                                        {country.name}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        {!continentId && (
                                            <td className="hidden lg:table-cell w-48 px-6 py-4">
                                                <ContinentName continentId={country.continent_id} />
                                            </td>
                                        )}
                                        <td className="hidden md:table-cell px-6 py-4">
                                            <span className="text-sm text-gray-900 dark:text-white font-medium">
                                                {country.population?.toLocaleString() || "-"}
                                            </span>
                                        </td>
                                        <td className="hidden xl:table-cell px-6 py-4">
                                            <span className="text-sm text-gray-600 dark:text-gray-400">
                                                {country.official_language || "-"}
                                            </span>
                                        </td>
                                        <td className="hidden xl:table-cell px-6 py-4">
                                            <span className="text-sm text-gray-600 dark:text-gray-400">
                                                {country.currency || "-"}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <button
                                                    onClick={() => handleViewDetails(country.id)}
                                                    className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-lg font-medium transition-colors focus:outline-none cursor-pointer group"
                                                    title="View Cities"
                                                >
                                                    <span>More</span>
                                                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                                                </button>
                                                <button
                                                    className="p-2 text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 rounded-lg transition-colors focus:outline-none cursor-pointer"
                                                    title="Edit"
                                                >
                                                    <Edit className="w-4 h-4" />
                                                </button>
                                                <button
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
                        <Globe className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                            No countries found
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                            {searchTerm || selectedContinentFilter
                                ? "Try adjusting your filters"
                                : "Get started by adding your first country"}
                        </p>
                    </div>
                )}
            </div>

            {filteredCountries && filteredCountries.length > 0 && (
                <div className="mt-4">
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={setCurrentPage}
                        totalItems={filteredCountries.length}
                        startIndex={startIndex}
                        endIndex={endIndex}
                        itemName={`countr${filteredCountries.length !== 1 ? "ies" : "y"}`}
                    />
                </div>
            )}
        </div>
    );
}
