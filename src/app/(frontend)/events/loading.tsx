import { EventsGridSkeleton } from '@/components/EventsGrid/EventsGridSkeleton'

export default function Loading() {
  return (
    <div className="flex gap-2 flex-col">
      <EventsGridSkeleton />
    </div>
  )
}
