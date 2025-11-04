import { Button } from "../../../../components/ui/button";
import { Edit3, Globe2 } from "lucide-react";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemTitle,
  ItemDescription,
} from "../../../../components/ui/item";

type Props = {
  title: string;
  description: string;
  onEdit: () => void;
  onExplore: () => void;
  className?: string;
  style?: React.CSSProperties;
};

export function CardItemContinent({
  title,
  description,
  onEdit,
  onExplore,
  className,
  style,
}: Props) {
  return (
    <Item 
      variant="default" 
      className={`group transition-colors duration-300 hover:bg-accent/10 ${className}`} 
      style={style}
    >
      <ItemContent>
        <div className="space-y-1.5 py-1">
          <ItemTitle className="text-lg font-medium tracking-tight text-foreground/90">
            {title}
          </ItemTitle>
          <ItemDescription className="text-sm text-muted-foreground/70 line-clamp-2 leading-relaxed">
            {description}
          </ItemDescription>
        </div>
      </ItemContent>
      <ItemActions className="gap-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={onEdit}
          className="opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-primary/5 hover:text-primary"
        >
          <Edit3 
            className="h-4 w-4 mr-2" 
            strokeWidth={1.5}
          />
          Edit
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={onExplore}
          className="opacity-0 group-hover:opacity-100 transition-all duration-300 bg-primary/5 hover:bg-primary/10 text-primary border border-primary/20"
        >
          <span className="flex items-center gap-2">
            Explore
            <Globe2 
              className="h-4 w-4" 
              strokeWidth={1.5}
            />
          </span>
        </Button>
      </ItemActions>
    </Item>
  );
}
