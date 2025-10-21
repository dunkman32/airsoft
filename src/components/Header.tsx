import React from 'react'
import Image from 'next/image'
import { Phone, MapPin } from 'lucide-react'
import { getPayload } from 'payload'
import config from '@payload-config'
import type { Media } from '@/app/(payload)/payload-types'
import Link from 'next/link'
import { NavLinks } from './NavLinks'

export async function Header() {
  const payload = await getPayload({ config })

  const settings = await payload.findGlobal({
    slug: 'home-settings',
  })

  const logo = settings.logo as Media | undefined
  const logoUrl = logo?.url || '/logo-transparent.png'

  return (
    <header
      className="w-full py-2 md:py-8 flex justify-center items-center relative px-2 md:px-8"
      style={{
        backgroundImage: 'url(/camo.svg)',
        backgroundRepeat: 'repeat',
        backgroundPosition: 'left top',
      }}
    >
      <div className="flex justify-start items-center gap-6 flex-1">
        <NavLinks phoneNumber={settings.phoneNumber} showroomLink={settings.showroomLink} />
      </div>
      <Link href="/" className="block w-14 md:w-20 h-14 md:h-20">
        <Image
          src={logoUrl}
          alt="Airsoft Logo"
          className="object-contain"
          priority
          width={80}
          height={80}
        />
      </Link>
      <div className="flex-1 max-sm:hidden flex justify-end items-center gap-6 pr-8">
        {settings.phoneNumber && (
          <a
            href={`tel:${settings.phoneNumber}`}
            className="hidden md:flex flex-col items-center gap-2 text-white hover:text-gray-200 transition-colors"
          >
            <Phone size={28} />
            <span className="font-normal text-xs">{settings.phoneNumber}</span>
          </a>
        )}
        {settings.showroomLink && (
          <a
            href={settings.showroomLink}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:flex flex-col items-center gap-2 text-white hover:text-gray-200 transition-colors"
          >
            <MapPin size={28} />
            <span className="font-normal text-xs">Showroom</span>
          </a>
        )}
      </div>
    </header>
  )
}
