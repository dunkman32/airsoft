'use server'

import { revalidateTag } from 'next/cache'
import { SHOP_CACHE_TAG } from './queries'

export async function revalidateShop() {
  revalidateTag(SHOP_CACHE_TAG)
}
