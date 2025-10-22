import { Skeleton } from '@/components/ui/skeleton'

export function AboutUsSkeleton() {
  return (
    <section className="w-full py-16 px-2">
      <div className="container mx-auto">
        {/* Title Skeleton */}
        <div className="flex justify-center mb-6">
          <Skeleton className="h-12 w-64" />
        </div>

        {/* Description Skeleton */}
        <div className="max-w-4xl mx-auto mb-12 space-y-3">
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-3/4 mx-auto" />
        </div>

        {/* Carousel Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {Array.from({ length: 3 }).map((_, index) => (
            <Skeleton key={index} className="w-full h-[300px] rounded-lg" />
          ))}
        </div>
      </div>
    </section>
  )
}
