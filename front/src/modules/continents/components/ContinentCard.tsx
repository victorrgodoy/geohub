import type { Continent } from "../types";
import { Globe, Edit, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface ContinentCardProps {
    continent: Continent;
    onEdit: (continent: Continent) => void;
}

export default function ContinentCard({ continent, onEdit }: ContinentCardProps) {
    const navigate = useNavigate();

    const handleExplore = () => {
        navigate(`/continents/${continent.id}`);
    };

    return (
        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 hover:shadow-lg transition-all duration-200 group">
            {/* Icon and Name */}
            <div className="flex items-start gap-4 mb-3">
                <div className="w-12 h-12 rounded-lg bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                    <Globe className="w-6 h-6" />
                </div>
                <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1 truncate">
                        {continent.name}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                        {continent.description}
                    </p>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2 mt-4">
                <button
                    onClick={handleExplore}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors duration-200 focus:outline-none cursor-pointer"
                >
                    Explore
                    <ArrowRight className="w-4 h-4" />
                </button>
                <button
                    onClick={() => onEdit(continent)}
                    className="px-4 py-2.5 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg font-medium transition-colors duration-200 focus:outline-none cursor-pointer"
                >
                    <Edit className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
}
