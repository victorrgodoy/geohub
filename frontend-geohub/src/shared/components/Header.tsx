import { useLocation } from "react-router-dom";

export default function Header() {
    const location = useLocation();

    const getPageTitle = () => {
        if (location.pathname === "/") return "Overview";
        if (location.pathname === "/continents") return "Continents";
        if (location.pathname === "/countries") return "Countries";
        if (location.pathname === "/cities") return "Cities";
        if (location.pathname.includes("/countries/") && location.pathname.includes("/cities")) return "Cities";
        return "GeoHub";
    };

    // const getBreadcrumb = () => {
    //     const crumbs = [];

    //     if (location.pathname.includes("/countries/") && location.pathname.includes("/cities")) {
    //         crumbs.push(
    //             <Link key="countries" to="/countries" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
    //                 Countries
    //             </Link>
    //         );
    //         crumbs.push(<ChevronRight key="sep1" className="w-4 h-4 text-gray-400" />);
    //         crumbs.push(
    //             <span key="country-name" className="text-gray-900 dark:text-white font-medium">
    //                 Country Name
    //             </span>
    //         );
    //     } else if (location.pathname === "/countries") {
    //         crumbs.push(
    //             <span key="countries" className="text-gray-900 dark:text-white font-medium">
    //                 Countries
    //             </span>
    //         );
    //     } else if (location.pathname === "/cities") {
    //         crumbs.push(
    //             <span key="cities" className="text-gray-900 dark:text-white font-medium">
    //                 Cities
    //             </span>
    //         );
    //     } else if (location.pathname === "/continents") {
    //         crumbs.push(
    //             <span key="continents" className="text-gray-900 dark:text-white font-medium">
    //                 Continents
    //             </span>
    //         );
    //     } else {
    //         crumbs.push(
    //             <span key="overview" className="text-gray-900 dark:text-white font-medium">
    //                 Overview
    //             </span>
    //         );
    //     }

    //     return crumbs;
    // };

    return (
        <header className="mt-3 w-full">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                {getPageTitle()}
            </h1>
        </header>
    );
}