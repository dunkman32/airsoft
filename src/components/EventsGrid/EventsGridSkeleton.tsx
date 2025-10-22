import { Skeleton } from '@/components/ui/skeleton'

export function EventsGridSkeleton() {
  return (
    <div className="container mx-auto p-3 lg:p-8">
      <Skeleton className="h-10 w-32 mb-8" />

      {/* Events Grid Skeleton - 1 column on mobile, 2 on md, 3 on lg, 4 on xl */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
        {Array.from({ length: 12 }).map((_, index) => (
          <div
            key={index}
            className="relative w-full min-h-[300px] overflow-hidden rounded-lg bg-card border border-border"
          >
            <Skeleton className="w-full h-[200px]" />
            <div className="p-4 space-y-2">
              <Skeleton className="h-3 w-24" />
              <Skeleton className="h-5 w-full" />
              <Skeleton className="h-5 w-3/4" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
