import { useGlobalStats } from "../../worldbank";
import { formatCurrency, formatLargeNumber } from "../../../shared/utils/formatNumber";

export function GlobalInsightsCard() {
  const { data: stats, isLoading, isError } = useGlobalStats();

  if (isLoading) {
    return (
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-6 animate-pulse">
        <div className="h-6 bg-gray-200 dark:bg-gray-800 rounded w-48 mb-4"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="h-20 bg-gray-200 dark:bg-gray-800 rounded"></div>
          <div className="h-20 bg-gray-200 dark:bg-gray-800 rounded"></div>
          <div className="h-20 bg-gray-200 dark:bg-gray-800 rounded"></div>
          <div className="h-20 bg-gray-200 dark:bg-gray-800 rounded"></div>
        </div>
      </div>
    );
  }

  if (isError || !stats) {
    return null;
  }

  const gdpPerCapita = stats.worldPopulation > 0 && stats.globalGDP > 0 
    ? stats.globalGDP / stats.worldPopulation 
    : 0;

  const insights = [
    {
      label: "Global GDP",
      value: stats.globalGDP > 0 ? `$${formatLargeNumber(stats.globalGDP)}` : "N/A",
    },
    {
      label: "Life Expectancy",
      value: stats.lifeExpectancy > 0 ? `${stats.lifeExpectancy.toFixed(1)} years` : "N/A",
    },
    {
      label: "Urban Population",
      value: stats.urbanPopulation > 0 ? `${stats.urbanPopulation.toFixed(1)}%` : "N/A",
    },
    {
      label: "GDP per Capita",
      value: gdpPerCapita > 0 ? formatCurrency(gdpPerCapita) : "N/A",
    },
  ];

  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-6">
      
      <div className="flex items-center gap-2 mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Global Insights
        </h3>
        <span className="ml-auto text-xs text-gray-500 dark:text-gray-400">
          World Bank Data
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {insights.map((insight) => (
          <div
            key={insight.label}
            className="bg-white dark:bg-gray-900/50 rounded-lg p-4 border border-gray-200 dark:border-gray-800"
          >
            <div>
              <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">
                {insight.label}
              </p>
              <p className="text-lg font-bold text-gray-900 dark:text-white truncate">
                {insight.value}
              </p>
            </div>
          </div>
        ))}
      </div>

      <p className="text-xs text-gray-500 dark:text-gray-400 mt-4 text-center">
        Data sourced from{" "}
        <a
          href="https://data.worldbank.org"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-blue-600 dark:hover:text-blue-400"
        >
          World Bank Open Data
        </a>
      </p>
    </div>
  );
}
