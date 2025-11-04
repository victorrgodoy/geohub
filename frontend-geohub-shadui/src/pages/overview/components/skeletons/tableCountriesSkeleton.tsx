import { Skeleton } from "../../../../components/ui/skeleton";

export function TableCountriesSkeleton() {
  return (
    <div>
      <Skeleton className="h-7 w-40 mb-4" />
      <div className="w-full border rounded-md">
        <div className="p-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="flex gap-4 py-2">
              <Skeleton className="h-6 w-32" />
              <Skeleton className="h-6 w-24" />
              <Skeleton className="h-6 w-32" />
              <Skeleton className="h-6 w-24" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}