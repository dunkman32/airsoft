import { Skeleton } from '@/components/ui/skeleton'

export function ShopGridSkeleton() {
  return (
    <div className="container mx-auto p-3 lg:p-8">
      <Skeleton className="h-10 w-32 mb-8" />

      {/* Shop Grid Skeleton - 1 column on mobile, 2 on md, 4 on xl */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
        {Array.from({ length: 12 }).map((_, index) => (
          <div
            key={index}
            className="relative flex items-end w-full min-h-60 overflow-hidden rounded-lg bg-card border border-border"
          >
            <div className="p-4 space-y-2">
              <Skeleton className="h-5 w-3/4" />
              <Skeleton className="h-4 w-24" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
