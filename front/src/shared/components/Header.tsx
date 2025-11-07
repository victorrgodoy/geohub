import { Home, ChevronRight } from "lucide-react";
import { useLocation, Link, useParams } from "react-router-dom";
import { useFindByIdContinent } from "../../modules/continents";

export default function Header() {
    const location = useLocation();
    const params = useParams();

    // Buscar dados do continente se estiver na rota de countries por continente
    const continentId = params.continentId ? Number(params.continentId) : 0;
    const { data: continent } = useFindByIdContinent(continentId);

    // Mapear rotas para nomes de exibição
    const getPageTitle = () => {
        if (location.pathname === "/") return "Overview";
        if (location.pathname === "/continents") return "Continents";
        if (location.pathname === "/countries") return "Countries";
        if (location.pathname.includes("/continents/") && location.pathname.includes("/countries")) return "Countries";
        if (location.pathname.includes("/countries/") && location.pathname.includes("/cities")) return "Cities";
        return "GeoHub";
    };

    // Gerar breadcrumb
    const getBreadcrumb = () => {
        const crumbs = [];

        // Se estiver em countries via continente
        if (location.pathname.includes("/continents/") && location.pathname.includes("/countries")) {
            crumbs.push(
                <Link key="continents" to="/continents" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                    Continents
                </Link>
            );
            crumbs.push(<ChevronRight key="sep1" className="w-4 h-4 text-gray-400" />);
            if (continent) {
                crumbs.push(
                    <span key="continent-name" className="text-gray-900 dark:text-white font-medium">
                        {continent.name}
                    </span>
                );
            }
        }
        // Se estiver em cities via country
        else if (location.pathname.includes("/countries/") && location.pathname.includes("/cities")) {
            crumbs.push(
                <Link key="countries" to="/countries" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                    Countries
                </Link>
            );
            crumbs.push(<ChevronRight key="sep1" className="w-4 h-4 text-gray-400" />);
            crumbs.push(
                <span key="country-name" className="text-gray-900 dark:text-white font-medium">
                    Country Name
                </span>
            );
        }
        // Se estiver em countries direto
        else if (location.pathname === "/countries") {
            crumbs.push(
                <span key="countries" className="text-gray-900 dark:text-white font-medium">
                    Countries
                </span>
            );
        }
        // Se estiver em continents
        else if (location.pathname === "/continents") {
            crumbs.push(
                <span key="continents" className="text-gray-900 dark:text-white font-medium">
                    Continents
                </span>
            );
        }
        // Overview ou outras páginas
        else {
            crumbs.push(
                <span key="overview" className="text-gray-900 dark:text-white font-medium">
                    Overview
                </span>
            );
        }

        return crumbs;
    };

    return (
        <header className="pt-8 pb-6 w-full">
            {/* Page Title */}
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-5">
                {getPageTitle()}
            </h1>

            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm">
                <ChevronRight className="w-4 h-4 text-gray-400" />
                {getBreadcrumb()}
            </nav>
        </header>
    );
}