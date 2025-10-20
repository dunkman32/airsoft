import React from 'react'
import { getPayload } from 'payload'
import config from '@payload-config'
import { AdsCarouselComponent } from '@/components/AdsCarousel/AdsCarousel'

export async function AdsCarousel() {
  const payload = await getPayload({ config })

  const settings = await payload.findGlobal({
    slug: 'home-settings',
  })

  const adsItems = settings.ads || []

  if (adsItems.length === 0) {
    return null
  }

  return <div className='bg-brand-orange p-2'>
    <AdsCarouselComponent adsItems={adsItems} />
  </div>
}
