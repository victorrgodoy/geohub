import {
  Item,
  ItemActions,
  ItemHeader,
  ItemMedia,
} from "../../../components/ui/item";
import {
  ItemContent,
  ItemDescription,
  ItemFooter,
} from "../../../components/ui/item";
import { Info } from "lucide-react";

type Item = {
  total: number | undefined;
  updatedAt: string | undefined;
};

type Props = {
  header: string;
  item: Item | undefined;
};

export function OverviewCardHeader({ header, item }: Props) {
  return (
    <Item
      variant="default"
      className="w-full flex flex-col sm:flex-row gap-1 rounded-none"
    >
      <ItemHeader>
        {header}
        <ItemActions>
          <Info strokeWidth={1.5} className="size-4 text-data-card" />
        </ItemActions>
      </ItemHeader>
      <ItemContent>
        <ItemDescription className="text-3xl">
          {item?.total ?? 0}
        </ItemDescription>
      </ItemContent>
      <ItemFooter className="text-data-card">
        {item?.updatedAt ?? "No Data"}
      </ItemFooter>
    </Item>
  );
}
