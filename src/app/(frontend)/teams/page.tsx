import type { Media, TeamsGlobal as TeamsGlobalType } from '@/app/(payload)/payload-types'
import { RichText } from '@/components/RichText'
import { TeamsGrid } from '@/components/TeamsGrid/TeamsGrid'
import config from '@payload-config'
import Image from 'next/image'
import { getPayload } from 'payload'

interface PageProps {
  searchParams: Promise<{
    page?: string
  }>
}

export const metadata = {
  title: 'Teams',
  description: 'Our teams',
}

export default async function TeamsListPage({ searchParams }: PageProps) {
  const params = await searchParams
  const currentPage = Number(params.page) || 1
  const itemsPerPage = 12

  const payload = await getPayload({ config })

  // Fetch teams global data
  const teamsGlobal = (await payload.findGlobal({
    slug: 'teams-global',
    depth: 2,
  })) as TeamsGlobalType

  // Fetch teams collection
  const result = await payload.find({
    collection: 'teams',
    limit: itemsPerPage,
    page: currentPage,
    sort: '-createdAt',
  })

  const teamsItems = result.docs as any[]
  const totalPages = result.totalPages
  const hasNextPage = result.hasNextPage
  const hasPrevPage = result.hasPrevPage

  const teamHero = teamsGlobal.teamHero as Media | undefined

  return (
    <div className="flex gap-2 flex-col">
      {/* Hero Section with Blurred Background */}
      {teamHero?.url && (
        <div className="relative w-full min-h-[400px] md:min-h-[500px] flex items-center justify-center overflow-hidden mb-8">
          {/* Blurred Background Image */}
          <div className="absolute inset-0">
            <Image
              src={teamHero.url}
              alt=""
              fill
              className="object-cover scale-110"
              priority
            />
            <div className="absolute backdrop-blur-[2px] inset-0 bg-black/40" />
          </div>

          {/* Content Overlay */}
          <div className="relative z-10 container mx-auto px-4 py-12 text-center">
            {/* Title - White, Large, Centered */}
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 drop-shadow-lg">
              {teamsGlobal.title}
            </h1>

            {/* Rich Text Content - White text */}
            {teamsGlobal.content && (
              <RichText
                content={teamsGlobal.content}
                className="prose prose-invert max-w-3xl mx-auto"
              />
            )}
          </div>
        </div>
      )}

      {/* Teams Grid */}
      <TeamsGrid
        teamsItems={teamsItems}
        currentPage={currentPage}
        totalPages={totalPages}
        hasNextPage={hasNextPage}
        hasPrevPage={hasPrevPage}
      />
    </div>
  )
}
