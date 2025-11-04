import {
  Item,
  ItemActions,
  ItemHeader,
  ItemDescription,
  ItemFooter,
} from "../../../../components/ui/item";

import { Clock } from "lucide-react";

type Item = {
  total: string | undefined;
  updatedAt: string | undefined;
};

type Props = {
  header: string;
  item: Item | undefined;
  variant?: "users" | "revenue" | "growth" | "products";
};

export function CardItemStats({ header, item, variant }: Props) {
  return (
    <Item
      variant="default"
      className={`
        group relative w-full flex flex-col gap-4 p-6 
        transition-all duration-500 ease-out cursor-pointer transform-gpu 
        overflow-hidden rounded-xl border border-border/30
        bg-background/50
        hover:shadow-lg hover:shadow-border/5
        motion-safe:hover:scale-[1.02]
        ${variant === 'users' ? 'hover:border-blue-500/30 hover:shadow-blue-500/5' : ''}
        ${variant === 'revenue' ? 'hover:border-emerald-500/30 hover:shadow-emerald-500/5' : ''}
        ${variant === 'growth' ? 'hover:border-violet-500/30 hover:shadow-violet-500/5' : ''}
        ${variant === 'products' ? 'hover:border-amber-500/30 hover:shadow-amber-500/5' : ''}
      `}
    >
      <div className="relative z-10 flex flex-col gap-4">
        <ItemHeader>
          <div className="space-y-2">
            <span className={`
              text-sm font-medium transition-colors duration-300
              ${variant === 'users' ? 'text-blue-500/90 group-hover:text-blue-500' : ''}
              ${variant === 'revenue' ? 'text-emerald-500/90 group-hover:text-emerald-500' : ''}
              ${variant === 'growth' ? 'text-violet-500/90 group-hover:text-violet-500' : ''}
              ${variant === 'products' ? 'text-amber-500/90 group-hover:text-amber-500' : ''}
              ${!variant ? 'text-foreground/80 group-hover:text-foreground' : ''}
            `}>
              {header}
            </span>
            <ItemDescription className={`
              text-4xl font-bold tracking-tight tabular-nums transition-colors duration-300
              ${variant === 'users' ? 'text-blue-600 group-hover:text-blue-500' : ''}
              ${variant === 'revenue' ? 'text-emerald-600 group-hover:text-emerald-500' : ''}
              ${variant === 'growth' ? 'text-violet-600 group-hover:text-violet-500' : ''}
              ${variant === 'products' ? 'text-amber-600 group-hover:text-amber-500' : ''}
              ${!variant ? 'text-foreground group-hover:text-foreground' : ''}
            `}>
              {item?.total ?? "0"}
            </ItemDescription>
          </div>
          <ItemActions>
            <div className={`
              size-8 rounded-full flex items-center justify-center 
              opacity-0 group-hover:opacity-100 transition-all duration-500
              ${variant === 'users' ? 'bg-blue-500/10' : ''}
              ${variant === 'revenue' ? 'bg-emerald-500/10' : ''}
              ${variant === 'growth' ? 'bg-violet-500/10' : ''}
              ${variant === 'products' ? 'bg-amber-500/10' : ''}
              ${!variant ? 'bg-foreground/10' : ''}
            `}>
              <Clock className={`
                size-4
                ${variant === 'users' ? 'text-blue-500' : ''}
                ${variant === 'revenue' ? 'text-emerald-500' : ''}
                ${variant === 'growth' ? 'text-violet-500' : ''}
                ${variant === 'products' ? 'text-amber-500' : ''}
                ${!variant ? 'text-foreground' : ''}
              `} />
            </div>
          </ItemActions>
        </ItemHeader>

        <ItemFooter>
          <div className="flex items-center gap-2 text-xs">
            <div className={`
              flex items-center gap-2 px-2.5 py-1 rounded-full
              bg-muted/30 text-muted-foreground/70
              transition-colors duration-300
              ${variant === 'users' ? 'group-hover:bg-blue-500/10 group-hover:text-blue-500' : ''}
              ${variant === 'revenue' ? 'group-hover:bg-emerald-500/10 group-hover:text-emerald-500' : ''}
              ${variant === 'growth' ? 'group-hover:bg-violet-500/10 group-hover:text-violet-500' : ''}
              ${variant === 'products' ? 'group-hover:bg-amber-500/10 group-hover:text-amber-500' : ''}
              ${!variant ? 'group-hover:bg-foreground/10 group-hover:text-foreground' : ''}
            `}>
              <Clock className="size-3.5" strokeWidth={1.5} />
              <span>Updated {item?.updatedAt ?? "Never"}</span>
            </div>
          </div>
        </ItemFooter>
      </div>
    </Item>
  );
}