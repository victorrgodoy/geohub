import { cn } from "../../../lib/utils";
import { Globe2 } from "lucide-react";

type ContinentIconProps = {
  name: string;
  className?: string;
};

export function ContinentIcon({ name, className }: ContinentIconProps) {
  const normalizedName = name.toLowerCase().trim();
  
  const getIconColor = () => {
    switch (normalizedName) {
      case "europe":
        return "text-blue-500";
      case "africa":
        return "text-amber-500";
      case "americas":
      case "américa":
      case "america":
        return "text-emerald-500";
      case "asia":
        return "text-rose-500";
      case "oceania":
        return "text-violet-500";
      case "antártida":
      case "antartica":
      case "antártica":
        return "text-sky-400";
      default:
        return "text-slate-500";
    }
  };

  return (
    <Globe2 
      className={cn(
        "h-5 w-5",
        getIconColor(),
        className
      )}
    />
  );
}
