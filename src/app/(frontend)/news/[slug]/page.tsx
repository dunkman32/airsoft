import { getPayload } from 'payload'
import config from '@payload-config'
import { notFound } from 'next/navigation'
import { NewsInner } from '@/components/NewsInner/NewsInner'
import type { News } from '@/app/(payload)/payload-types'

interface PageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params
  const payload = await getPayload({ config })

  const result = await payload.find({
    collection: 'news',
    where: {
      slug: {
        equals: slug,
      },
    },
    limit: 1,
  })

  const newsItem = result.docs[0]

  if (!newsItem) {
    return {
      title: 'News Not Found',
    }
  }

  return {
    title: newsItem.title,
    description: newsItem.desc,
  }
}

export default async function NewsPage({ params }: PageProps) {
  const { slug } = await params
  const payload = await getPayload({ config })

  const result = await payload.find({
    collection: 'news',
    where: {
      slug: {
        equals: slug,
      },
    },
    limit: 1,
  })

  const newsItem = result.docs[0] as News

  if (!newsItem) {
    notFound()
  }

  return <NewsInner newsItem={newsItem} />
}
