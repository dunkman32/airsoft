import { getPayload } from 'payload'
import config from '@/app/(payload)/payload.config'
import type { Shop } from '@/app/(payload)/payload-types'
import { ShopSection as ShopSectionComponent } from './ShopSection'

export async function ShopSection() {
  const payload = await getPayload({ config })

  const homeSettings = await payload.findGlobal({
    slug: 'home-settings',
    depth: 2,
  })

  // Get featured shop items if they exist in homeSettings
  const featuredShop = (homeSettings?.featuredShop as Shop[] | undefined) || []

  // If no featured shop items, get the latest 8 shop items
  let shopItems = featuredShop

  if (shopItems.length === 0) {
    const shopData = await payload.find({
      collection: 'shop',
      limit: 8,
      depth: 1,
      sort: '-createdAt',
    })
    shopItems = shopData.docs
  }

  return <ShopSectionComponent shopItems={shopItems} itemsPerPage={4} />
}
