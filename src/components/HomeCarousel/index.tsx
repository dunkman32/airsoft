import { HomeCarouselComponent } from '@/components/HomeCarousel/HomeCarousel'
import config from '@payload-config'
import { getPayload } from 'payload'

export async function HomeCarousel() {
  const payload = await getPayload({ config })

  const settings = await payload.findGlobal({
    slug: 'home-settings',
  })

  const carouselItems = settings.carousel || []

  if (carouselItems.length === 0) {
    return null
  }

  return <HomeCarouselComponent carouselItems={carouselItems} />
}
