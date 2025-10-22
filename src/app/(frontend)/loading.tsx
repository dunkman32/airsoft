import { AdsCarouselSkeleton } from '@/components/AdsCarousel/AdsCarouselSkeleton'
import { HomeCarouselSkeleton } from '@/components/HomeCarousel/HomeCarouselSkeleton'
import { AboutUsSkeleton } from '@/components/AboutUs/AboutUsSkeleton'
import { NewsCarouselSkeleton } from '@/components/NewsCarousel/NewsCarouselSkeleton'
import { ShopSectionSkeleton } from '@/components/ShopSection/ShopSectionSkeleton'
import { EventsCarouselSkeleton } from '@/components/EventsCarousel/EventsCarouselSkeleton'
import { Skeleton } from '@/components/ui/skeleton'

export default function Loading() {
  return (
    <div className="home">
      <AdsCarouselSkeleton />
      <HomeCarouselSkeleton />
      <AboutUsSkeleton />
      <NewsCarouselSkeleton />
      <ShopSectionSkeleton />
      <EventsCarouselSkeleton />
      <div className="content flex justify-center py-8">
        <Skeleton className="h-16 w-16 rounded-lg" />
      </div>
    </div>
  )
}
