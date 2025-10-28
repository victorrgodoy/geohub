export const formatNumber = (value: number | undefined, fallback = "N/A"):string => {
    if(value == null) return fallback;
    return new Intl.NumberFormat("us-EN", {notation: "compact", maximumFractionDigits: 1}).format(value)
}