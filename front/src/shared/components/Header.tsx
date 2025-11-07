import { Home } from "lucide-react";
import { useLocation } from "react-router-dom";

export default function Header() {
    const location = useLocation();

    // Mapear rotas para nomes de exibição
    const getPageTitle = () => {
        if (location.pathname === "/") return "Continents";
        // Adicionar mais rotas conforme necessário
        return "Continents";
    };

    return (
        <header className="pt-8 pb-6 w-full">
            {/* Page Title */}
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                {getPageTitle()}
            </h1>

            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm">
                <Home className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                <span className="text-gray-600 dark:text-gray-400">
                    {getPageTitle()}
                </span>
            </nav>
        </header>
    );
}