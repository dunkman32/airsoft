import { Skeleton } from '@/components/ui/skeleton'

export function HomeCarouselSkeleton() {
  return (
    <div className="container mx-auto">
      <Skeleton className="w-full h-[400px] md:h-[600px] rounded-lg" />
    </div>
  )
}
