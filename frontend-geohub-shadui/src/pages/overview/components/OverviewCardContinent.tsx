import { Button } from "../../../components/ui/button";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "../../../components/ui/item";

type Props = {
  title: string;
  description: string;
  onEdit: () => void;
  onExplore: () => void;
};

export function OverviewCardContinent({
  title,
  description,
  onEdit,
  onExplore,
}: Props) {
  return (
    <Item variant="default">
      <ItemContent>
        <ItemTitle className="text-lg">{title}</ItemTitle>
        <ItemDescription>{description}</ItemDescription>
      </ItemContent>
      <ItemActions>
        <Button
          variant="ghost"
          size="sm"
          className="cursor-pointer"
          onClick={onEdit}
        >
          Edit
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="cursor-pointer"
          onClick={onExplore}
        >
          Explore
        </Button>
      </ItemActions>
    </Item>
  );
}
