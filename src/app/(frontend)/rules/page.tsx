import { getPayload } from 'payload'
import config from '@payload-config'
import { RichText } from '@/components/RichText'

export const metadata = {
  title: 'Rules',
  description: 'Airsoft rules and regulations',
}

export default async function RulesPage() {
  const payload = await getPayload({ config })

  const rules = await payload.findGlobal({
    slug: 'rules',
  })

  const formattedDate = rules.updatedAt
    ? new Date(rules.updatedAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })

  return (
    <article className="w-full">
      {/* Header Section - Centered */}
      <div className="container mx-auto px-4 py-12">
        {/* Date - Gray, Small, Centered */}
        <time className="text-sm text-gray-400 block text-center mb-4">
          Last updated: {formattedDate}
        </time>

        {/* Title - Centered */}
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-8 text-brand-orange">
          {rules.title}
        </h1>
      </div>

      {/* Rich Text Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <RichText content={rules.content} />
        </div>
      </div>
    </article>
  )
}
