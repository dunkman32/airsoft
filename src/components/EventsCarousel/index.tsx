import { EventsCarouselComponent } from '@/components/EventsCarousel/EventsCarousel'
import type { Event } from '@/app/(payload)/payload-types'
import config from '@payload-config'
import { getPayload } from 'payload'

export async function EventsCarousel() {
  const payload = await getPayload({ config })

  const settings = await payload.findGlobal({
    slug: 'home-settings',
  })

  const featuredEventsIds = settings.featuredEvents

  if (!featuredEventsIds || featuredEventsIds.length === 0) {
    return null
  }

  // Fetch the full events items
  const eventsItems: Event[] = []

  for (const eventId of featuredEventsIds) {
    if (typeof eventId === 'string' || typeof eventId === 'number') {
      const eventItem = await payload.findByID({
        collection: 'events',
        id: eventId,
      })
      if (eventItem) {
        eventsItems.push(eventItem as Event)
      }
    } else if (eventId && typeof eventId === 'object') {
      eventsItems.push(eventId as Event)
    }
  }

  if (eventsItems.length === 0) {
    return null
  }

  return <EventsCarouselComponent eventsItems={eventsItems} />
}
