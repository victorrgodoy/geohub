import { Skeleton } from "../../../../components/ui/skeleton";

export function CardStatsSkeleton() {
  return (
    <section className="col-span-3">
      <div className="w-full rounded-md gap-1 flex flex-col sm:flex-row border">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex-1 p-4">
            <Skeleton className="h-5 w-32 mb-2" />
            <Skeleton className="h-8 w-24" />
          </div>
        ))}
      </div>
    </section>
  );
}