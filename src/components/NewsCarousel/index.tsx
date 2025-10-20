import { NewsCarouselComponent } from '@/components/NewsCarousel/NewsCarousel'
import type { News } from '@/app/(payload)/payload-types'
import config from '@payload-config'
import { getPayload } from 'payload'

export async function NewsCarousel() {
  const payload = await getPayload({ config })

  const settings = await payload.findGlobal({
    slug: 'home-settings',
  })

  const featuredNewsIds = settings.featuredNews

  if (!featuredNewsIds || featuredNewsIds.length === 0) {
    return null
  }

  // Fetch the full news items
  const newsItems: News[] = []

  for (const newsId of featuredNewsIds) {
    if (typeof newsId === 'string' || typeof newsId === 'number') {
      const newsItem = await payload.findByID({
        collection: 'news',
        id: newsId,
      })
      if (newsItem) {
        newsItems.push(newsItem as News)
      }
    } else if (newsId && typeof newsId === 'object') {
      newsItems.push(newsId as News)
    }
  }

  if (newsItems.length === 0) {
    return null
  }

  return <NewsCarouselComponent newsItems={newsItems} />
}
