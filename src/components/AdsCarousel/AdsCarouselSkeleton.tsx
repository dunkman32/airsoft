import { Skeleton } from '@/components/ui/skeleton'

export function AdsCarouselSkeleton() {
  return (
    <div className="py-1">
      <div className="container mx-auto">
        <Skeleton className="w-full h-[200px] md:h-[300px] rounded-lg" />
      </div>
    </div>
  )
}
