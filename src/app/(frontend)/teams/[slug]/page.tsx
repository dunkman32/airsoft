import { getPayload } from 'payload'
import config from '@payload-config'
import { notFound } from 'next/navigation'
import { TeamsInner } from '@/components/TeamsInner/TeamsInner'

interface PageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params
  const payload = await getPayload({ config })

  const result = await payload.find({
    collection: 'teams',
    where: {
      slug: {
        equals: slug,
      },
    },
    limit: 1,
  })

  const teamItem = result.docs[0]

  if (!teamItem) {
    return {
      title: 'Team Not Found',
    }
  }

  return {
    title: teamItem.name,
    description: teamItem.desc,
  }
}

export default async function TeamPage({ params }: PageProps) {
  const { slug } = await params
  const payload = await getPayload({ config })

  const result = await payload.find({
    collection: 'teams',
    where: {
      slug: {
        equals: slug,
      },
    },
    limit: 1,
  })

  const teamItem = result.docs[0] as any

  if (!teamItem) {
    notFound()
  }

  return <TeamsInner teamItem={teamItem} />
}
