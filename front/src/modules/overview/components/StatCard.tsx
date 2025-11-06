import type { LucideIcon } from "lucide-react";
import { formatNumber, formatDate } from "../../../shared/utils";

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
    return (
        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 hover:shadow-lg transition-shadow duration-200">
            {/* Icon and Title */}
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    {title}
                </h3>
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${colorClasses[color]}`}>
                    <Icon className="w-5 h-5" />
                </div>
            </div>

            {/* Value */}
            {isLoading ? (
                <div className="h-9 bg-gray-200 dark:bg-gray-800 rounded animate-pulse" />
            ) : (
                <p className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    {formatNumber(value)}
                </p>
            )}

            {/* Updated At */}
            {updatedAt && (
                <p className="text-xs text-gray-500 dark:text-gray-500">
                    Updated {formatDate(updatedAt)}
                </p>
            )}
        </div>
    );
}
