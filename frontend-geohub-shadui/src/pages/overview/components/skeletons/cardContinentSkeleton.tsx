import { Skeleton } from "../../../../components/ui/skeleton";

export function CardContinentSkeleton() {
  return (
    <div className="col-span-2 border py-4 rounded-md flex flex-col min-h-72 max-h-80">
      <div className="flex justify-between items-center gap-2 mb-4 px-4">
        <div className="flex items-center gap-2">
          <Skeleton className="size-5" />
          <Skeleton className="h-6 w-48" />
        </div>
        <Skeleton className="h-7 w-20" />
      </div>
      <div className="flex-1 overflow-y-auto flex flex-col divide-y divide-border px-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="py-4">
            <Skeleton className="h-6 w-36 mb-2" />
            <Skeleton className="h-4 w-64" />
          </div>
        ))}
      </div>
    </div>
  );
}