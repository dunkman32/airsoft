'use server'

import { revalidateTag } from 'next/cache'
import { ABOUT_US_CACHE_TAG } from './queries'

export async function revalidateAboutUs() {
  revalidateTag(ABOUT_US_CACHE_TAG)
}
