import { getPayload } from 'payload'
import config from '@payload-config'
import { AboutUsCarousel } from './AboutUsCarousel'

export async function AboutUs() {
  const payload = await getPayload({ config })

  const aboutUs = await payload.findGlobal({
    slug: 'about-us',
  })

  return (
    <section className="w-full py-16">
      <div className="container mx-auto px-4">
        {/* Centered Title */}
        <h1 className="text-4xl md:text-5xl font-bold text-brand-charcoal text-center mb-6">
          {aboutUs.title}
        </h1>

        {/* Centered Description */}
        <p className="text-lg text-brand-gray-600 text-center max-w-4xl mx-auto mb-12 leading-relaxed whitespace-pre-line">
          {aboutUs.desc}
        </p>

        {/* Carousel - 3 items full screen */}
        {aboutUs.slides && aboutUs.slides.length > 0 && (
          <AboutUsCarousel slides={aboutUs.slides} />
        )}
      </div>
    </section>
  )
}
