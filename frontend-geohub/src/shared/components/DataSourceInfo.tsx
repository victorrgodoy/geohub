import { Info } from "lucide-react";

export function DataSourceInfo() {
    return (
        <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900/50 rounded-lg p-4 mb-6">
            <div className="flex gap-3">
                <Info className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                <div className="flex-1">
                    <h3 className="text-sm font-medium text-blue-900 dark:text-blue-300 mb-1">
                        About the Data
                    </h3>
                    <p className="text-xs text-blue-800 dark:text-blue-400 leading-relaxed">
                        Country data is sourced from the{" "}
                        <a 
                            href="https://restcountries.com" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="font-medium underline hover:text-blue-600 dark:hover:text-blue-300"
                        >
                            REST Countries API
                        </a>
                        , providing real-world information about population, languages, currencies, and more.
                        Global statistics are sourced from{" "}
                        <a 
                            href="https://data.worldbank.org" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="font-medium underline hover:text-blue-600 dark:hover:text-blue-300"
                        >
                            World Bank Open Data
                        </a>
                        .
                    </p>
                </div>
            </div>
        </div>
    );
}
