import { ShopGridSkeleton } from '@/components/ShopGrid/ShopGridSkeleton'
import { Skeleton } from '@/components/ui/skeleton'

export default function Loading() {
  return (
    <div className="flex gap-2 flex-col">
      <ShopGridSkeleton />
      {/* AboutUs skeleton placeholder */}
      <div className="container mx-auto p-3 lg:p-8">
        <Skeleton className="h-64 w-full rounded-lg" />
      </div>
    </div>
  )
}
