import { AppTable } from "../../../../components/appTable";
import { useTop5CountriesTable } from "../../../../hooks/overview";
import type { Top5Country } from "../../../../types/Country";
import { TableCountriesSkeleton } from "../skeletons/tableCountriesSkeleton";

export function TableCountry() {
  const { columns, data, isLoading } = useTop5CountriesTable();

  if (isLoading) {
    return <TableCountriesSkeleton />;
  }

  return (
    <div className="overflow-hidden rounded-xl border border-border/30 bg-background/50">
      <div className="flex items-center justify-between p-6 border-b border-border/30">
        <div className="space-y-1.5">
          <h3 className="text-lg font-medium tracking-tight text-foreground/90">
            Top 5 Countries
          </h3>
          <p className="text-sm text-muted-foreground/70">
            Most populated countries in this continent
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground/60">
          <span className="size-2 rounded-full bg-emerald-500/20 ring-2 ring-emerald-500/30" />
          Live data
        </div>
      </div>
      <div className="p-6">
        <div className="overflow-hidden rounded-lg border border-border/30 bg-background/30 backdrop-blur-sm">
          <AppTable<Top5Country>
            columns={columns}
            data={data}
          />
        </div>
      </div>
    </div>
  );
}