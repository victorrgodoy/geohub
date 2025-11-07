import type { ReactNode } from "react";

export interface Column<T> {
    key: string;
    header: string;
    render: (item: T) => ReactNode;
    className?: string;
    headerClassName?: string;
    hideOnMobile?: boolean;
    hideOnTablet?: boolean;
}

export interface Action<T> {
    icon: React.ComponentType<{ className?: string }>;
    label: string;
    onClick: (item: T) => void;
    variant?: "primary" | "danger" | "secondary" | "button";
    hideOnMobile?: boolean;
    buttonText?: string; 
}

interface DataTableProps<T> {
    data: T[] | undefined;
    columns: Column<T>[];
    actions?: Action<T>[];
    isLoading?: boolean;
    emptyMessage?: string;
    loadingMessage?: string;
}

export default function DataTable<T extends { id: number | string }>({
    data,
    columns,
    actions,
    isLoading = false,
    emptyMessage = "No data available",
    loadingMessage = "Loading data...",
}: DataTableProps<T>) {
    const hasActions = actions && actions.length > 0;

    const getActionClasses = (variant: Action<T>["variant"] = "secondary") => {
        const baseClasses = "rounded-lg transition-colors focus:outline-none cursor-pointer";
        const variants = {
            primary: "p-2 hover:bg-blue-50 dark:hover:bg-blue-950/30 text-blue-600 dark:text-blue-400",
            danger: "p-2 hover:bg-red-50 dark:hover:bg-red-950/30 text-red-600 dark:text-red-400",
            secondary: "p-2 hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400",
            button: "flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium group",
        };
        return `${baseClasses} ${variants[variant]}`;
    };

    if (isLoading) {
        return (
            <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden">
                <div className="p-8 text-center">
                    <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{loadingMessage}</p>
                </div>
            </div>
        );
    }

    if (!data || data.length === 0) {
        return (
            <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden">
                <div className="p-8 text-center">
                    <p className="text-sm text-gray-600 dark:text-gray-400">{emptyMessage}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                        <tr>
                            {columns.map((column) => (
                                <th
                                    key={column.key}
                                    className={`px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider ${column.hideOnMobile ? 'hidden md:table-cell' : ''
                                        } ${column.hideOnTablet ? 'hidden lg:table-cell' : ''} ${column.headerClassName || ''
                                        }`}
                                >
                                    {column.header}
                                </th>
                            ))}
                            {hasActions && (
                                <th className="w-40 px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                    Actions
                                </th>
                            )}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                        {data.map((item) => (
                            <tr
                                key={item.id}
                                className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                            >
                                {columns.map((column) => (
                                    <td
                                        key={column.key}
                                        className={`px-6 py-4 ${column.hideOnMobile ? 'hidden md:table-cell' : ''
                                            } ${column.hideOnTablet ? 'hidden lg:table-cell' : ''} ${column.className || ''
                                            }`}
                                    >
                                        {column.render(item)}
                                    </td>
                                ))}
                                {hasActions && (
                                    <td className="w-40 px-6 py-4">
                                        <div className="flex items-center justify-end gap-2">
                                            {actions.map((action, index) => (
                                                <button
                                                    key={index}
                                                    onClick={() => action.onClick(item)}
                                                    className={`${getActionClasses(action.variant)} ${action.hideOnMobile ? 'hidden sm:flex' : 'flex'
                                                        } ${action.variant === 'button' ? 'items-center' : 'items-center justify-center'}`}
                                                    title={action.label}
                                                    aria-label={action.label}
                                                >
                                                    {action.buttonText && <span>{action.buttonText}</span>}
                                                    <action.icon className={`w-4 h-4 ${action.variant === 'button' ? 'group-hover:translate-x-0.5 transition-transform' : ''}`} />
                                                </button>
                                            ))}
                                        </div>
                                    </td>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
