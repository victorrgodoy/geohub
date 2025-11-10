import { useState } from "react";
import { Plus, Edit, Trash2, MapPin, Building2 } from "lucide-react";
import {
    DataTable,
    Pagination,
    Select,
    SearchInput,
    ConfirmationModal,
    type Column,
    type Action,
} from "../shared/components";
import { useListCountry } from "../modules/countries";
import { useListContinent } from "../modules/continents";
import { useCreateCity, useUpdateCity, useDeleteCity, CityModal, type City, type CreateCity, useListPaginatedCities } from "../modules/cities";
import { formatNumber, formatCoordinate } from "../shared/utils";

function CountryName({ countryId }: { countryId: number }) {
    const { data: countries } = useListCountry();
    const country = countries?.find((c) => c.id === countryId);
    
    if (!country) return <span className="text-gray-400">-</span>;
    return <span className="text-sm text-gray-900 dark:text-white">{country.name}</span>;
}

export default function CitiesPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCountryFilter, setSelectedCountryFilter] = useState<string>("");
    const [selectedContinentFilter, setSelectedContinentFilter] = useState<string>("");    
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedCity, setSelectedCity] = useState<City | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 9;

    const continentId = selectedContinentFilter ? Number(selectedContinentFilter) : undefined;
    const countryId = selectedCountryFilter ? Number(selectedCountryFilter) : undefined;

    const { data: cities, isLoading } = useListPaginatedCities(
      currentPage,
      itemsPerPage,
      searchTerm,
      continentId,
      countryId
    );
    const { data: countries } = useListCountry();
    const { data: continents } = useListContinent();
    const createMutation = useCreateCity();
    const updateMutation = useUpdateCity();
    const deleteMutation = useDeleteCity();

    const handleSearchChange = (value: string) => {
      setSearchTerm(value);
      setCurrentPage(1);
    };

    const handleContinentFilterChange = (value: string) => {
        setSelectedContinentFilter(value);
        setCurrentPage(1);
    };

    const handleCountryFilterChange = (value: string) => {
      setSelectedCountryFilter(value);
      setCurrentPage(1);
    };

    const handleCreateOrUpdate = (data: CreateCity) => {
        if (selectedCity) {
            updateMutation.mutate(
                { id: selectedCity.id, data },
                {
                    onSuccess: () => {
                        setIsModalOpen(false);
                        setSelectedCity(null);
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

    const handleEdit = (city: City) => {
        setSelectedCity(city);
        setIsModalOpen(true);
    };

    const handleDeleteClick = (city: City) => {
        setSelectedCity(city);
        setIsDeleteModalOpen(true);
    };

    const handleDeleteConfirm = () => {
        if (selectedCity) {
            deleteMutation.mutate(selectedCity.id, {
                onSuccess: () => {
                    setIsDeleteModalOpen(false);
                    setSelectedCity(null);
                },
            });
        }
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedCity(null);
    };

    const handleCloseDeleteModal = () => {
        setIsDeleteModalOpen(false);
        setSelectedCity(null);
    };

    const columns: Column<City>[] = [
        {
            key: "city",
            header: "City",
            className: "w-64",
            render: (city) => (
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-purple-50 dark:bg-purple-950/30 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0">
                        <Building2 className="w-5 h-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                        <div className="text-sm font-medium text-gray-900 dark:text-white truncate">
                            {city.name}
                        </div>
                    </div>
                </div>
            ),
        },
        {
            key: "country",
            header: "Country",
            className: "w-48",
            hideOnTablet: true,
            render: (city) => <CountryName countryId={city.countryId} />,
        },
        {
            key: "population",
            header: "Population",
            hideOnMobile: true,
            render: (city) => (
                <span className="text-sm text-gray-900 dark:text-white font-medium">
                    {formatNumber(city.population) || "-"}
                </span>
            ),
        },
        {
            key: "coordinates",
            header: "Coordinates",
            hideOnTablet: true,
            render: (city) => (
                <span className="text-sm text-gray-600 dark:text-gray-400">
                    {formatCoordinate(city.latitude)}, {formatCoordinate(city.longitude)}
                </span>
            ),
        },
    ];

    const actions: Action<City>[] = [
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
                        Manage all cities and their information
                    </p>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors duration-200 focus:outline-none cursor-pointer"
                >
                    <Plus className="w-5 h-5" />
                    Add City
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
                    value={selectedContinentFilter ?? ""}
                    onChange={handleContinentFilterChange}
                    options={[
                        { value: "", label: "All Continents" },
                        ...(continents?.map((continent) => ({
                            value: continent.id,
                            label: continent.name,
                        })) || []),
                    ]}
                    placeholder="All Continents"
                    icon={MapPin}
                    className="sm:w-64"
                    searchable={true}
                />

                <Select
                    value={selectedCountryFilter ?? ""}
                    onChange={handleCountryFilterChange}
                    options={[
                        { value: "", label: "All Countries" },
                        ...(countries?.map((country) => ({
                            value: country.id,
                            label: country.name,
                        })) || []),
                    ]}
                    placeholder="All Countries"
                    icon={MapPin}
                    className="sm:w-64"
                    searchable={true}
                />
            </div>

            <DataTable
                data={cities?.data || []}
                columns={columns}
                actions={actions}
                isLoading={isLoading}
                emptyMessage={
                    searchTerm || selectedCountryFilter || selectedContinentFilter
                        ? "No cities found. Try adjusting your filters."
                        : "No cities found. Get started by adding your first city."
                }
                loadingMessage="Loading cities..."
            />

            {cities?.meta && cities.meta.total > 0 && (
                <div className="mt-4">
                    <Pagination
                        currentPage={currentPage}
                        totalPages={cities?.meta?.totalPages || 1}
                        onPageChange={setCurrentPage}
                        totalItems={cities?.meta?.total || 0}
                        startIndex={(cities?.meta?.page - 1) * cities?.meta?.limit}
                        endIndex={Math.min(cities?.meta?.page * cities?.meta?.limit, cities?.meta?.total)}
                        itemName={`cit${cities?.meta?.total  !== 1 ? "ies" : "y"}`}
                    />
                </div>
            )}

            <CityModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onSubmit={handleCreateOrUpdate}
                city={selectedCity}
                isLoading={createMutation.isPending || updateMutation.isPending}
            />

            <ConfirmationModal
                isOpen={isDeleteModalOpen}
                onClose={handleCloseDeleteModal}
                onConfirm={handleDeleteConfirm}
                title="Delete City"
                message={`Are you sure you want to delete "${selectedCity?.name}"? This action cannot be undone.`}
                confirmText="Delete"
                cancelText="Cancel"
                isLoading={deleteMutation.isPending}
            />
        </div>
    );
}
