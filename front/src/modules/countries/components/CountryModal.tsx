import { Globe, MapPin, X } from "lucide-react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Select } from "../../../shared/components";
import { useListContinent } from "../../continents";
import type { Country, CreateCountry } from "../types";

interface CountryModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: CreateCountry) => void;
    country?: Country | null;
    isLoading?: boolean;
}

export default function CountryModal({ isOpen, onClose, onSubmit, country, isLoading }: CountryModalProps) {
    const { data: continents } = useListContinent();
    
    const [formData, setFormData] = useState<CreateCountry>({
        name: "",
        population: 0,
        officialLanguage: "",
        currency: "",
        continentId: 0,
    });

    useEffect(() => {
        if (country) {
            setFormData({
                name: country.name,
                population: country.population,
                officialLanguage: country.officialLanguage,
                currency: country.currency,
                continentId: country.continentId,
            });
        } else {
            setFormData({
                name: "",
                population: 0,
                officialLanguage: "",
                currency: "",
                continentId: 0,
            });
        }
    }, [country, isOpen]);

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
                        {country ? "Edit Country" : "New Country"}
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
                        {/* Country Name */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Country Name
                            </label>
                            <div className="relative">
                                <div className="absolute left-3 top-1/2 -translate-y-1/2">
                                    <MapPin className="w-4 h-4 text-gray-400" />
                                </div>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white focus:outline-none"
                                    placeholder="Enter country name..."
                                    required
                                />
                            </div>
                        </div>

                        {/* Continent */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Continent
                            </label>
                            <Select
                                value={formData.continentId || ""}
                                onChange={(value) => setFormData({ ...formData, continentId: Number(value) || 0 })}
                                options={[
                                    { value: "", label: "Select a continent" },
                                    ...(continents?.map((cont) => ({
                                        value: cont.id,
                                        label: cont.name,
                                    })) || []),
                                ]}
                                icon={Globe}
                                placeholder="Select a continent"
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

                        {/* Official Language */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Official Language
                            </label>
                            <input
                                type="text"
                                value={formData.officialLanguage}
                                onChange={(e) => setFormData({ ...formData, officialLanguage: e.target.value })}
                                className="w-full px-4 py-2.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white focus:outline-none"
                                placeholder="Enter official language..."
                                required
                            />
                        </div>

                        {/* Currency */}
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Currency
                            </label>
                            <input
                                type="text"
                                value={formData.currency}
                                onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
                                className="w-full px-4 py-2.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white focus:outline-none"
                                placeholder="Enter currency..."
                                required
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
                            {isLoading ? "Saving..." : country ? "Update" : "Create"}
                        </button>
                    </div>
                </form>
            </div>
        </div>,
        document.body
    );
}
