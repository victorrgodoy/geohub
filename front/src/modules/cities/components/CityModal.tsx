import { Building2, MapPin, X } from "lucide-react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Select } from "../../../shared/components";
import { useListCountry } from "../../countries";
import type { City, CreateCity } from "../types";

interface CityModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: CreateCity) => void;
    city?: City | null;
    isLoading?: boolean;
}

export default function CityModal({ isOpen, onClose, onSubmit, city, isLoading }: CityModalProps) {
    const { data: countries } = useListCountry();
    
    const [formData, setFormData] = useState<CreateCity>({
        name: "",
        population: 0,
        latitude: 0,
        longitude: 0,
        countryId: 0,
    });

    useEffect(() => {
        if (city) {
            setFormData({
                name: city.name,
                population: city.population,
                latitude: city.latitude,
                longitude: city.longitude,
                countryId: city.countryId,
            });
        } else {
            setFormData({
                name: "",
                population: 0,
                latitude: 0,
                longitude: 0,
                countryId: 0,
            });
        }
    }, [city, isOpen]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
    };

    if (!isOpen) return null;

    return createPortal(
        <div className="fixed top-0 left-0 right-0 bottom-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fadeIn">
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-2xl border border-gray-200 dark:border-gray-800 animate-scaleIn">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-800">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                        {city ? "Edit City" : "New City"}
                    </h2>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors duration-200 focus:outline-none cursor-pointer"
                    >
                        <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* City Name */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                City Name
                            </label>
                            <div className="relative">
                                <div className="absolute left-3 top-1/2 -translate-y-1/2">
                                    <Building2 className="w-4 h-4 text-gray-400" />
                                </div>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white focus:outline-none"
                                    placeholder="Enter city name..."
                                    required
                                />
                            </div>
                        </div>

                        {/* Country */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Country
                            </label>
                            <Select
                                value={formData.countryId || ""}
                                onChange={(value) => setFormData({ ...formData, countryId: Number(value) || 0 })}
                                options={[
                                    { value: "", label: "Select a country" },
                                    ...(countries?.map((country) => ({
                                        value: country.id,
                                        label: country.name,
                                    })) || []),
                                ]}
                                icon={MapPin}
                                placeholder="Select a country"
                                searchable={true}
                            />
                        </div>

                        {/* Population */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Population
                            </label>
                            <input
                                type="number"
                                value={formData.population || ""}
                                onChange={(e) => setFormData({ ...formData, population: Number(e.target.value) || 0 })}
                                className="w-full px-4 py-2.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white focus:outline-none"
                                placeholder="Enter population..."
                                required
                                min="0"
                            />
                        </div>

                        {/* Latitude */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Latitude
                            </label>
                            <input
                                type="number"
                                step="any"
                                value={formData.latitude || ""}
                                onChange={(e) => setFormData({ ...formData, latitude: Number(e.target.value) || 0 })}
                                className="w-full px-4 py-2.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white focus:outline-none"
                                placeholder="Enter latitude (-90 to 90)..."
                                required
                                min="-90"
                                max="90"
                            />
                        </div>

                        {/* Longitude */}
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Longitude
                            </label>
                            <input
                                type="number"
                                step="any"
                                value={formData.longitude || ""}
                                onChange={(e) => setFormData({ ...formData, longitude: Number(e.target.value) || 0 })}
                                className="w-full px-4 py-2.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white focus:outline-none"
                                placeholder="Enter longitude (-180 to 180)..."
                                required
                                min="-180"
                                max="180"
                            />
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3 pt-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 px-4 py-2.5 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg font-medium transition-colors duration-200 focus:outline-none cursor-pointer"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="flex-1 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-colors duration-200 focus:outline-none cursor-pointer"
                        >
                            {isLoading ? "Saving..." : city ? "Update" : "Create"}
                        </button>
                    </div>
                </form>
            </div>
        </div>,
        document.body
    );
}
