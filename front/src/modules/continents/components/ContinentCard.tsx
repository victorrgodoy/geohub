import type { Continent } from "../types";
import { Edit, ArrowRight } from "lucide-react";
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

    // Gera o nome do arquivo da imagem baseado no nome do continente
    const getImagePath = (name: string) => {
        // Mapeamento de nomes específicos para os arquivos
        const imageMap: Record<string, string> = {
            'africa': 'africa',
            'europe': 'europe',
            'asia': 'asia',
            'oceania': 'oceania',
            'antarctic': 'antarctica', 
            'americas': 'americas',
        };

        const normalized = name.toLowerCase().trim();
        const imageName = imageMap[normalized] || normalized.replace(/\s+/g, '-');
        return `/images/continents/${imageName}.jpg`;
    };

    return (
        <div className="relative bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden hover:shadow-xl hover:shadow-blue-500/10 hover:border-blue-300 dark:hover:border-blue-700 hover:-translate-y-1 transition-all duration-300 ease-out group cursor-pointer min-h-[320px]" style={{ backfaceVisibility: 'hidden' }}>
            {/* Background Image */}
            <div className="absolute inset-0 overflow-hidden">
                <img 
                    src={getImagePath(continent.name)}
                    alt={continent.name}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover  group-hover:scale-103 transition-all duration-500 ease-out"
                    style={{ backfaceVisibility: 'hidden', transform: 'translateZ(0)' }}
                    onError={(e) => {
                        // Fallback: esconde a imagem se não existir
                        e.currentTarget.style.display = 'none';
                    }}
                />
                {/* Gradient Overlay - Mais leve no light mode */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/60 via-white/50 to-white/40 dark:from-gray-900/75 dark:via-gray-900/70 dark:to-gray-900/60 group-hover:from-white/55 group-hover:via-white/45 group-hover:to-white/35 dark:group-hover:from-gray-900/70 dark:group-hover:via-gray-900/65 dark:group-hover:to-gray-900/55 transition-all duration-300" />
            </div>

            {/* Content */}
            <div className="relative z-10 p-6 flex flex-col h-full">
                {/* Title and Description */}
                <div className="mb-4">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 drop-shadow-sm">
                        {continent.name}
                    </h3>
                    <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-3 drop-shadow-sm">
                        {continent.description}
                    </p>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 mt-auto pt-4">
                    <button
                        onClick={handleExplore}
                        className="flex items-center justify-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-lg font-medium transition-colors duration-150 focus:outline-none cursor-pointer"
                    >
                        Explore
                        <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                    <button
                        onClick={() => onEdit(continent)}
                        className="px-3 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg transition-colors duration-150 focus:outline-none cursor-pointer"
                    >
                        <Edit className="w-3.5 h-3.5" />
                    </button>
                </div>
            </div>
        </div>
    );
}