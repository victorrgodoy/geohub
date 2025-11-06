import { NavLink } from "react-router-dom";
import { Home } from "lucide-react";
import { useTheme } from "../contexts";

export default function Sidebar() {
    const { theme, toggleTheme } = useTheme();

    return (
        <aside className="w-64 bg-white h-screen dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 flex flex-col fixed top-0 left-0">
            {/* Header/Logo */}
            <div className="h-16 flex items-center px-6 border-b border-gray-200 dark:border-gray-800">
                <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
                    GeoHub
                </h1>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4">
                <NavLink
                    to="/"
                    className={({ isActive }) =>
                        `flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${isActive
                            ? "bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400"
                            : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                        }`
                    }
                >
                    <Home className="w-5 h-5" />
                    <span>Overview</span>
                </NavLink>
            </nav>

            {/* Footer com switch moderno */}
            <div className="p-4 border-t border-gray-200 dark:border-gray-800">
                <div className="flex items-center justify-between px-2 py-1">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Dark Mode
                    </span>
                    <button
                        onClick={toggleTheme}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 focus:outline-none cursor-pointer ${theme === "dark" ? "bg-blue-600" : "bg-gray-300"
                            }`}
                        role="switch"
                        aria-checked={theme === "dark"}
                    >
                        <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-lg transition-transform duration-200 ${theme === "dark" ? "translate-x-6" : "translate-x-1"
                                }`}
                        />
                    </button>
                </div>
            </div>
        </aside>
    );
}