import { NavLink } from "react-router-dom";
import { Globe, Menu, Home, Flag, Building2 } from "lucide-react";
import { useTheme } from "../contexts";
import { useState, useEffect } from "react";

export default function Sidebar() {
    const { theme, toggleTheme } = useTheme();
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1024) {
                setIsOpen(false);
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <>
            {!isOpen && (
                <button
                    onClick={() => setIsOpen(true)}
                    className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg shadow-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                    aria-label="Open menu"
                >
                    <Menu className="w-6 h-6 text-gray-900 dark:text-white" />
                </button>
            )}

            {isOpen && (
                <div
                    className="lg:hidden fixed top-0 left-0 right-0 bottom-0 bg-black/50 z-40 animate-fadeIn"
                    onClick={() => setIsOpen(false)}
                />
            )}

            <aside className={`w-64 bg-white h-screen dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 flex flex-col fixed top-0 left-0 z-40 transition-transform duration-500 ease-out lg:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="h-16 flex items-center px-6 border-b border-gray-200 dark:border-gray-800 gap-2">
                    <img src="/logo.png" alt="GeoHub Logo" className="w-8 brightness-200"/>
                    <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
                        GeoHub
                    </h1>
                </div>

                <nav className="flex-1 p-4 space-y-1">
                    <NavLink
                        to="/"
                        end
                        onClick={() => setIsOpen(false)}
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
                    <NavLink
                        to="/continents"
                        onClick={() => setIsOpen(false)}
                        className={({ isActive }) =>
                            `flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${isActive
                                ? "bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400"
                                : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                            }`
                        }
                    >
                        <Globe className="w-5 h-5" />
                        <span>Continents</span>
                    </NavLink>
                    <NavLink
                        to="/countries"
                        onClick={() => setIsOpen(false)}
                        className={({ isActive }) =>
                            `flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${isActive
                                ? "bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400"
                                : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                            }`
                        }
                    >
                        <Flag className="w-5 h-5" />
                        <span>Countries</span>
                    </NavLink>
                    <NavLink
                        to="/cities"
                        onClick={() => setIsOpen(false)}
                        className={({ isActive }) =>
                            `flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${isActive
                                ? "bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400"
                                : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                            }`
                        }
                    >
                        <Building2 className="w-5 h-5" />
                        <span>Cities</span>
                    </NavLink>
                </nav>

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
        </>
    );
}