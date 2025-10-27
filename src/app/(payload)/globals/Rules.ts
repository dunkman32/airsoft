import type { GlobalConfig } from 'payload'

export const Rules: GlobalConfig = {
  slug: 'rules',
  access: {
    read: () => true,
  },
  hooks: {
    afterChange: [
      async ({ req }) => {
        // Revalidate the rules page when content changes
        if (req.context.triggerRevalidate !== false) {
          try {
            await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/revalidate?secret=${process.env.REVALIDATION_SECRET}&collection=rules`)
          } catch (error) {
            console.error('Error revalidating rules:', error)
          }
        }
      },
    ],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Title',
    },
    {
      name: 'content',
      type: 'richText',
      required: true,
      label: 'Content',
    },
  ],
}
