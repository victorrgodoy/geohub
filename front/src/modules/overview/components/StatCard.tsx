import type { LucideIcon } from "lucide-react";
import { formatNumber, formatDate } from "../../../shared/utils";
import { useEffect, useState } from "react";

interface StatCardProps {
    title: string;
    value: number | undefined;
    icon: LucideIcon;
    color: "blue" | "green" | "purple";
    updatedAt: string | undefined;
    isLoading: boolean;
}

const colorClasses = {
    blue: "bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400",
    green: "bg-green-50 dark:bg-green-950/30 text-green-600 dark:text-green-400",
    purple: "bg-purple-50 dark:bg-purple-950/30 text-purple-600 dark:text-purple-400",
};

export default function StatCard({ title, value, icon: Icon, color, updatedAt, isLoading }: StatCardProps) {
    const [displayValue, setDisplayValue] = useState(0);

    useEffect(() => {
        if (!value || isLoading) return;

        const duration = 2000;
        const steps = 60;
        const increment = value / steps;
        let current = 0;

        const timer = setInterval(() => {
            current += increment;
            if (current >= value) {
                setDisplayValue(value);
                clearInterval(timer);
            } else {
                setDisplayValue(Math.floor(current));
            }
        }, duration / steps);

        return () => clearInterval(timer);
    }, [value, isLoading]);

    return (
        <div className="group bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 hover:shadow-lg hover:border-gray-300 dark:hover:border-gray-700 transition-all duration-300 md:hover:scale-[1.02]">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide">
                    {title}
                </h3>
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110 ${colorClasses[color]}`}>
                    <Icon className="w-6 h-6" />
                </div>
            </div>

            {isLoading ? (
                <div className="h-10 bg-gray-200 dark:bg-gray-800 rounded animate-pulse" />
            ) : (
                <p className="text-4xl font-bold text-gray-900 dark:text-white mb-2 tabular-nums">
                    {formatNumber(displayValue)}
                </p>
            )}

            {updatedAt && (
                <p className="text-xs text-gray-500 dark:text-gray-500">
                    Updated {formatDate(updatedAt)}
                </p>
            )}
        </div>
    );
}
