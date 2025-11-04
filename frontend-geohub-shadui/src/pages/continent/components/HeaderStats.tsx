import { Badge } from "../../../components/ui/badge";

interface HeaderStatsProps {
  totalCountries: number;
  totalPopulation: number;
}

export function HeaderStats({ totalCountries, totalPopulation }: HeaderStatsProps) {
  return (
    <div className="flex gap-4 items-center">
      <Badge variant="outline" className="px-4 py-2 text-base font-medium">
        {totalCountries} Countries
      </Badge>
      <Badge variant="outline" className="px-4 py-2 text-base font-medium">
        {totalPopulation.toLocaleString()} Population
      </Badge>
    </div>
  );
}