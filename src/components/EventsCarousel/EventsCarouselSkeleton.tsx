import { Skeleton } from '@/components/ui/skeleton'

export function EventsCarouselSkeleton() {
  return (
    <section className="w-full py-16 px-2">
      <div className="container mx-auto">
        {/* Title Skeleton */}
        <div className="flex justify-center mb-8">
          <Skeleton className="h-10 w-32" />
        </div>

        {/* Carousel Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="rounded-lg border border-border overflow-hidden">
              <Skeleton className="w-full h-[200px]" />
              <div className="p-4 space-y-2">
                <Skeleton className="h-3 w-24" />
                <Skeleton className="h-6 w-full" />
                <Skeleton className="h-6 w-3/4" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
