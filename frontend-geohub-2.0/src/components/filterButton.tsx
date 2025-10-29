import { ListFilter } from "lucide-react";

function FilterButton() {
  return (
    <button
      className="
                btn btn-active btn-sm bg-(--color-background) 
                border-(--color-text)/20 text-(--color-text)/60 
                hover:text-(--color-text)/80
                hover:bg-(--color-background)/90 active:bg-[--color-primary]/70
                active:scale-97 transition    
                "
    >
      <ListFilter size={14} />
      Filter
    </button>
  );
}

export default FilterButton;
