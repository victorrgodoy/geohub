import { Globe, X } from "lucide-react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Select } from "../../../shared/components";
import type { Continent, CreateContinent } from "../types";

interface ContinentModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: CreateContinent) => void;
    continent?: Continent | null;
    isLoading?: boolean;
}

const CONTINENTS_OPTIONS = [
    "Africa",
    "Americas",
    "Antarctica",
    "Asia",
    "Europe",
    "Oceania",
];

export default function ContinentModal({ isOpen, onClose, onSubmit, continent, isLoading }: ContinentModalProps) {
    const [formData, setFormData] = useState<CreateContinent>({
        name: "",
        description: "",
    });

    useEffect(() => {
        if (continent) {
            setFormData({
                name: continent.name,
                description: continent.description,
            });
        } else {
            setFormData({
                name: "",
                description: "",
            });
        }
    }, [continent, isOpen]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
    };

    if (!isOpen) return null;

    return createPortal(
        <div className="fixed top-0 left-0 right-0 bottom-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fadeIn">
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-md border border-gray-200 dark:border-gray-800 animate-scaleIn">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-800">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                        {continent ? "Edit Continent" : "New Continent"}
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
                    {/* Name Select */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Continent Name
                        </label>
                        <Select
                            value={formData.name}
                            onChange={(value) => setFormData({ ...formData, name: value })}
                            options={[
                                { value: "", label: "Select a continent" },
                                ...CONTINENTS_OPTIONS.map((cont) => ({
                                    value: cont,
                                    label: cont,
                                })),
                            ]}
                            icon={Globe}
                            disabled={!!continent}
                            placeholder="Select a continent"
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Description
                        </label>
                        <textarea
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            rows={4}
                            className="w-full px-4 py-2.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white resize-none focus:outline-none"
                            placeholder="Enter a description..."
                            required
                        />
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
                            {isLoading ? "Saving..." : continent ? "Update" : "Create"}
                        </button>
                    </div>
                </form>
            </div>
        </div>,
        document.body
    );
}
