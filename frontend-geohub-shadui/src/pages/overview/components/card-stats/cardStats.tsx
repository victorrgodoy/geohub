import { CardItemStats } from "./cardItemStats";
import { useOverviewStats } from "../../../../hooks/overview/useOverviewStats";
import { CardStatsSkeleton } from "../skeletons/cardStatsSkeleton";
import { formatNumber } from "../../../../utils/formatNumber";
import { formatDate } from "../../../../utils/formatDate";

export function CardStats() {
  const { totalPopulation, totalCountry, isLoading } = useOverviewStats();

  if (isLoading) {
    return <CardStatsSkeleton />;
  }

  return (
    <section className="col-span-3">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <CardItemStats
          header="Total Population"
          variant="growth"
          item={{
            total: formatNumber(totalPopulation?.total),
            updatedAt: formatDate(totalPopulation?.updatedAt ?? null),
          }}
        />
        
        <CardItemStats 
          header="Total Countries" 
          variant="users"
          item={{
            total: formatNumber(totalCountry?.total),
            updatedAt: formatDate(totalCountry?.updatedAt ?? null),
          }}
        />
        
        <CardItemStats 
          header="Total Cities" 
          variant="products"
          item={{
            total: formatNumber(totalPopulation?.total || 0),
            updatedAt: formatDate(totalPopulation?.updatedAt ?? null),
          }}
        />
      </div>
    </section>
  );
}