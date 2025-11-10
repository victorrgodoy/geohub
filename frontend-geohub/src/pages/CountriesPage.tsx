import { useState } from "react";
import { Plus, Edit, Trash2, MapPin, Globe } from "lucide-react";
import { DataTable, Pagination, Select, SearchInput, ConfirmationModal, type Column, type Action } from "../shared/components";
import {
    useListContinent,
} from "../modules/continents";
import {
    useCreateCountry,
    useUpdateCountry,
    useDeleteCountry,
    useListPaginatedCountries,
    CountryModal,
    type Country,
    type CreateCountry,
} from "../modules/countries";
import { formatNumber } from "../shared/utils";
import { useCountriesFlags } from "../shared/hooks/useCountriesFlags";

function ContinentName({ continentId }: { continentId: number }) {
    const { data: continents } = useListContinent();
    const continent = continents?.find((c) => c.id === continentId);
    
    if (!continent) return <span className="text-gray-400">-</span>;
    return <span className="text-sm text-gray-900 dark:text-white">{continent.name}</span>;
} 

export default function CountriesPage() {
    const { data: countriesFlags } = useCountriesFlags();
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedContinentFilter, setSelectedContinentFilter] = useState<string>("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 9;

    const continentId = selectedContinentFilter ? Number(selectedContinentFilter) : undefined;
    const { data: countries, isLoading } = useListPaginatedCountries(
      currentPage,
      itemsPerPage,
      searchTerm,
      continentId
    );
    const { data: continents } = useListContinent();
    const createMutation = useCreateCountry();
    const updateMutation = useUpdateCountry();
    const deleteMutation = useDeleteCountry();

    const handleSearchChange = (value: string) => {
      setSearchTerm(value);
      setCurrentPage(1);
    };

    const handleContinentFilterChange = (value: string) => {
        setSelectedContinentFilter(value);
        setCurrentPage(1);
    };

    const handleCreateOrUpdate = (data: CreateCountry) => {
        if (selectedCountry) {
            updateMutation.mutate(
                { id: selectedCountry.id, data },
                {
                    onSuccess: () => {
                        setIsModalOpen(false);
                        setSelectedCountry(null);
                    },
                }
            );
        } else {
            createMutation.mutate(data, {
                onSuccess: () => {
                    setIsModalOpen(false);
                },
            });
        }
    };

    const handleEdit = (country: Country) => {
        setSelectedCountry(country);
        setIsModalOpen(true);
    };

    const handleDeleteClick = (country: Country) => {
        setSelectedCountry(country);
        setIsDeleteModalOpen(true);
    };

    const handleDeleteConfirm = () => {
        if (selectedCountry) {
            deleteMutation.mutate(selectedCountry.id, {
                onSuccess: () => {
                    setIsDeleteModalOpen(false);
                    setSelectedCountry(null);
                },
            });
        }
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedCountry(null);
    };

    const handleCloseDeleteModal = () => {
        setIsDeleteModalOpen(false);
        setSelectedCountry(null);
    };

    const columns: Column<Country>[] = [
        {
            key: "country",
            header: "Country",
            className: "w-64",
            render: (country) => {
                const flag = countriesFlags?.find(
                    (f) => f.name.common.toLowerCase() === country.name.toLowerCase()
                );
                return (
                    <div className="flex items-center gap-3">
                        {flag ? (
                            <img
                                src={flag.flags.svg || flag.flags.png}
                                alt={`Flag of ${country.name}`}
                                className="w-10 h-10 rounded object-cover"
                                loading="lazy"
                            />
                        ) : (
                            <div className="w-10 h-10 rounded-lg bg-green-50 dark:bg-green-950/30 text-green-600 dark:text-green-400 flex items-center justify-center shrink-0">
                                <MapPin className="w-5 h-5" />
                            </div>
                        )}
                        <div className="min-w-0 flex-1">
                            <div className="text-sm font-medium text-gray-900 dark:text-white truncate">
                                {country.name}
                            </div>
                        </div>
                    </div>
                );
            },
        },
    ];


    columns.push({
        key: "continent",
        header: "Continent",
        className: "w-48",
        hideOnTablet: true,
        render: (country) => <ContinentName continentId={country.continentId} />,
    });

    columns.push(
        {
            key: "population",
            header: "Population",
            hideOnMobile: true,
            render: (country) => (
                <span className="text-sm text-gray-900 dark:text-white font-medium">
                    {formatNumber(country.population) || "-"}
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
        }
    );

    const actions: Action<Country>[] = [
        {
            icon: Edit,
            label: "Edit",
            onClick: handleEdit,
            variant: "secondary",
        },
        {
            icon: Trash2,
            label: "Delete",
            onClick: handleDeleteClick,
            variant: "danger",
        },
    ];

    return (
        <div className="pb-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        Manage all countries and their information
                    </p>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors duration-200 focus:outline-none cursor-pointer"
                >
                    <Plus className="w-5 h-5" />
                    Add Country
                </button>
            </div>

            <div className="mb-6 flex flex-col sm:flex-row gap-4">
                <SearchInput
                    value={searchTerm}
                    onChange={handleSearchChange}
                    placeholder="Search by name..."
                    className="flex-1"
                />

                <Select
                    value={selectedContinentFilter}
                    onChange={handleContinentFilterChange}
                    options={[
                        { value: "", label: "All Continents" },
                        ...(continents?.map((cont) => ({
                            value: cont.id,
                            label: cont.name,
                        })) || []),
                    ]}
                    placeholder="All Continents"
                    icon={Globe}
                    className="sm:w-64"
                    searchable={true}
                />
            </div>

            <DataTable
                data={countries?.data || []}
                columns={columns}
                actions={actions}
                isLoading={isLoading}
                emptyMessage={
                    searchTerm || selectedContinentFilter
                        ? "No countries found. Try adjusting your filters."
                        : "No countries found. Get started by adding your first country."
                }
                loadingMessage="Loading countries..."
            />

            {countries?.meta && countries.meta.total > 0 && (
                <div className="mt-4">
                    <Pagination
                        currentPage={countries?.meta?.page || 1}
                        totalPages={countries?.meta?.totalPages || 1}
                        onPageChange={setCurrentPage}
                        totalItems={countries?.meta?.total || 0}
                        startIndex={(countries?.meta?.page - 1) * countries?.meta?.limit}
                        endIndex={Math.min(countries?.meta?.page * countries?.meta?.limit, countries?.meta?.total)}
                        itemName={`countr${countries?.meta?.total !== 1 ? "ies" : "y"}`}
                    />
                </div>
            )}

            <CountryModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onSubmit={handleCreateOrUpdate}
                country={selectedCountry}
                isLoading={createMutation.isPending || updateMutation.isPending}
            />

            <ConfirmationModal
                isOpen={isDeleteModalOpen}
                onClose={handleCloseDeleteModal}
                onConfirm={handleDeleteConfirm}
                title="Delete Country"
                message={`Are you sure you want to delete "${selectedCountry?.name}"? This action cannot be undone.`}
                confirmText="Delete"
                cancelText="Cancel"
                isLoading={deleteMutation.isPending}
            />
        </div>
    );
}
