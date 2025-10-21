import { getPayload } from 'payload'
import config from '@payload-config'
import { notFound } from 'next/navigation'
import { ShopInner } from '@/components/ShopInner/ShopInner'
import type { Shop } from '@/app/(payload)/payload-types'

interface PageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params
  const payload = await getPayload({ config })

  const result = await payload.find({
    collection: 'shop',
    where: {
      slug: {
        equals: slug,
      },
    },
    limit: 1,
  })

  const shopItem = result.docs[0]

  if (!shopItem) {
    return {
      title: 'Product Not Found',
    }
  }

  return {
    title: shopItem.title,
    description: shopItem.desc,
  }
}

export default async function ShopPage({ params }: PageProps) {
  const { slug } = await params
  const payload = await getPayload({ config })

  const result = await payload.find({
    collection: 'shop',
    where: {
      slug: {
        equals: slug,
      },
    },
    limit: 1,
  })

  const shopItem = result.docs[0] as Shop

  if (!shopItem) {
    notFound()
  }

  return <ShopInner shopItem={shopItem} />
}
