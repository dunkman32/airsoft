import { Skeleton } from '@/components/ui/skeleton'

export function ShopSectionSkeleton() {
  return (
    <section className="w-full py-16 px-2">
      <div className="container mx-auto">
        {/* Title Skeleton */}
        <div className="flex justify-center mb-8">
          <Skeleton className="h-10 w-32" />
        </div>

        {/* Shop Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="rounded-lg border border-border overflow-hidden">
              <Skeleton className="w-full h-[200px]" />
              <div className="p-4 space-y-2">
                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-5 w-2/3" />
                <Skeleton className="h-4 w-24" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
