import React from 'react'
import Image from 'next/image'
import { getPayload } from 'payload'
import config from '@payload-config'
import type { Media } from '@/app/(payload)/payload-types'
import Link from 'next/link'

export async function Footer() {
  const payload = await getPayload({ config })

  const settings = await payload.findGlobal({
    slug: 'home-settings',
  })

  const logo = settings.logo as Media | undefined
  const logoUrl = logo?.url || '/logo-transparent.png'

  return (
    <footer
      className="w-full py-8 flex justify-center items-center"
      style={{
        backgroundImage: 'url(/camo.svg)',
        backgroundRepeat: 'repeat',
        backgroundPosition: 'left top',
      }}
    >
      <div className="flex justify-center items-center">
        <Link href="/">
          <Image
            src={logoUrl}
            alt="Airsoft Logo"
            className="object-contain"
            priority
            width={80}
            height={80}
          />
        </Link>
      </div>
    </footer>
  )
}
