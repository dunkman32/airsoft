import Image from 'next/image'

import { AboutUs } from '@/components/AboutUs/index'
import { AdsCarousel } from '@/components/AdsCarousel'
import { HomeCarousel } from '@/components/HomeCarousel'
import { NewsCarousel } from '@/components/NewsCarousel'
import { EventsCarousel } from '@/components/EventsCarousel'

export default async function HomePage() {
  return (
    <div className="home">
      <AdsCarousel />
      <HomeCarousel />
      <AboutUs />
      <NewsCarousel />
      <EventsCarousel />
      <div className="content">
        <picture>
          <source srcSet="https://raw.githubusercontent.com/payloadcms/payload/main/packages/ui/src/assets/payload-favicon.svg" />
          <Image
            alt="Payload Logo"
            height={65}
            src="https://raw.githubusercontent.com/payloadcms/payload/main/packages/ui/src/assets/payload-favicon.svg"
            width={65}
          />
        </picture>
      </div>
    </div>
  )
}
