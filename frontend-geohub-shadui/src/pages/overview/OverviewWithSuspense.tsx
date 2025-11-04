import { Suspense } from "react";
import Overview from "./Overview";
import { CardStatsSkeleton } from "./components/skeletons/cardStatsSkeleton";
import { CardContinentSkeleton } from "./components/skeletons/cardContinentSkeleton";
import {TableCountriesSkeleton} from "./components/skeletons/tableCountriesSkeleton";

function LoadingOverview() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
      <div className="md:col-span-2 lg:col-span-3">
        <CardStatsSkeleton />
      </div>
      <section className="md:col-span-2 lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        <div className="md:col-span-2">
          <CardContinentSkeleton />
        </div>
        <div className="md:col-span-1 border rounded-md p-4">
          <h3 className="mb-6">Population by Continent</h3>
          <div className="w-full h-56 flex sm:flex-row justify-center">
            {/* Chart placeholder */}
            <div className="w-56 h-56 rounded-full bg-muted animate-pulse" />
          </div>
        </div>
      </section>
      <section className="md:col-span-2 lg:col-span-3">
        <TableCountriesSkeleton />
      </section>
    </div>
  );
}

export function OverviewWithSuspense() {
  return (
    <Suspense fallback={<LoadingOverview />}>
      <Overview />
    </Suspense>
  );
}