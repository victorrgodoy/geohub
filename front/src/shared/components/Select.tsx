import { useState, useRef, useEffect } from "react";
import { Check, ChevronDown, X } from "lucide-react";

interface SelectOption {
    value: string | number;
    label: string;
}

interface SelectProps {
    value: string | number;
    onChange: (value: string) => void;
    options: SelectOption[];
    placeholder?: string;
    icon?: React.ComponentType<{ className?: string }>;
    className?: string;
    searchable?: boolean;
    disabled?: boolean;
}

export default function Select({
    value,
    onChange,
    options,
    placeholder = "Select an option",
    icon: Icon,
    className = "",
    searchable = false,
    disabled = false,
}: SelectProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const selectRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const selectedOption = options.find((opt) => String(opt.value) === String(value));

    const filteredOptions = searchable
        ? options.filter((option) =>
              option.label.toLowerCase().includes(searchTerm.toLowerCase())
          )
        : options;

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
                setIsOpen(false);
                setSearchTerm("");
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    useEffect(() => {
        if (isOpen && searchable && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isOpen, searchable]);

    const handleSelect = (optionValue: string | number) => {
        onChange(String(optionValue));
        setIsOpen(false);
        setSearchTerm("");
    };

    const handleClear = (e: React.MouseEvent) => {
        e.stopPropagation();
        onChange("");
        setSearchTerm("");
    };

    const handleToggle = () => {
        if (disabled) return;
        if (!searchable) {
            setIsOpen(!isOpen);
        } else {
            setIsOpen(true);
        }
    };

    return (
        <div ref={selectRef} className={`relative ${className}`}>
       
            <div
                onClick={handleToggle}
                className={`w-full flex items-center gap-3 px-3 py-2.5 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white transition-colors ${
                    disabled 
                        ? 'opacity-50 cursor-not-allowed' 
                        : 'hover:border-gray-400 dark:hover:border-gray-600 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500 cursor-pointer'
                }`}
            >
                {Icon && (
                    <Icon className="w-4 h-4 text-gray-400 shrink-0" />
                )}
                
                {searchable && isOpen ? (
                    <input
                        ref={inputRef}
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Type to search..."
                        className="flex-1 text-sm bg-transparent focus:outline-none min-w-0"
                        onClick={(e) => e.stopPropagation()}
                    />
                ) : (
                    <span className="flex-1 text-sm truncate min-w-0">
                        {selectedOption ? selectedOption.label : placeholder}
                    </span>
                )}

                <div className="flex items-center gap-1 shrink-0">
                    {value && !disabled && (
                        <button
                            type="button"
                            onClick={handleClear}
                            className="p-0.5  hover:bg-gray-200 dark:hover:bg-gray-700 rounded transition-colors"
                        >
                            <X className="w-3.5 h-3.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300" />
                        </button>
                    )}
                    <ChevronDown
                        className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${
                            isOpen ? "rotate-180" : ""
                        }`}
                    />
                </div>
            </div>

            {/* Dropdown */}
            {isOpen && !disabled && (
                <div className="absolute z-50 w-full mt-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg shadow-lg max-h-60 overflow-auto scrollbar-custom">
                    {filteredOptions.length === 0 ? (
                        <div className="px-4 py-6 text-center text-sm text-gray-500 dark:text-gray-400">
                            No results found
                        </div>
                    ) : (
                        filteredOptions.map((option) => {
                            const isSelected = String(option.value) === String(value);
                            return (
                                <button
                                    key={option.value}
                                    type="button"
                                    onClick={() => handleSelect(option.value)}
                                    className={`w-full cursor-pointer flex items-center justify-between px-4 py-2.5 text-sm text-left hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors ${
                                        isSelected
                                            ? "bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400"
                                            : "text-gray-900 dark:text-white"
                                    }`}
                                >
                                    <span>{option.label}</span>
                                    {isSelected && <Check className="w-4 h-4" />}
                                </button>
                            );
                        })
                    )}
                </div>
            )}
        </div>
    );
}
