import { ListFilter } from "lucide-react";

export const FilterButton = () => {
  return (
    <button
      className="
                flex items-center gap-1 bg-(--color-background) 
                text-(--color-text)/60 font-medium px-4 py-1.5 
                border rounded-sm hover:text-(--color-text)/80 
                hover:bg-(--color-background)/90 active:bg-[--color-primary]/70
                active:scale-97 transition cursor-pointer text-xs
                "
    >
      <ListFilter size={14} />
      Filter
    </button>
  );
}
