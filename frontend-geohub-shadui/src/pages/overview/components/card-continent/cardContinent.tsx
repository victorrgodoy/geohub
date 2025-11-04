import { Earth, Plus } from "lucide-react";
import { Button } from "../../../../components/ui/button";
import { CardItemContinent } from "./cardItemContinent";
import { useListContinent } from "../../../../hooks/continent/index";
import type { Continent } from "../../../../types/Continent";
import { CardContinentSkeleton } from "../skeletons/cardContinentSkeleton";

interface TableContinentProps {
  onNew: () => void;
  onEdit: (continent: Continent) => void;
  onExplore: (continentId: number) => void;
}

export function CardContinent({ onNew, onEdit, onExplore }: TableContinentProps) {
  const { data: continents = [], isLoading } = useListContinent();

  if (isLoading) {
    return <CardContinentSkeleton />;
  }

  return (
    <div className="col-span-2 overflow-hidden rounded-xl border border-border/30 bg-background/50 flex flex-col min-h-128 max-h-160">
      <div className="flex items-center justify-between gap-4 p-6 border-b border-border/30">
        <div className="space-y-1.5">
          <h2 className="text-lg font-medium tracking-tight text-foreground/90">Continents</h2>
          <p className="text-sm text-muted-foreground/70">Manage and explore continental data</p>
        </div>
        <Button 
          onClick={onNew} 
          size="sm"
          variant="outline"
          className="relative overflow-hidden transition-all duration-300 hover:border-primary/30 hover:bg-primary/5 hover:text-primary"
        >
          <Plus className="size-4 mr-2"/>
          Add Continent
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto divide-y divide-border/30">
        {continents.map((continent) => (
          <div 
            key={continent.id} 
            className="animate-in fade-in-50 duration-300"
          >
            <CardItemContinent
              title={continent.name}
              description={continent.description}
              onEdit={() => onEdit(continent)}
              onExplore={() => onExplore(continent.id)}
              className="p-6 hover:bg-muted/50"
            />
          </div>
        ))}

        {continents.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full p-8 text-center">
            <Earth className="size-12 text-muted-foreground/50 mb-4" />
            <p className="text-muted-foreground font-medium">No continents added yet</p>
            <p className="text-sm text-muted-foreground/70">Click the Add button to create your first continent</p>
          </div>
        )}
      </div>
    </div>
  );
}