import type { GlobalConfig } from 'payload'

export const AboutUs: GlobalConfig = {
  slug: 'about-us',
  access: {
    read: () => true,
  },
  hooks: {
    afterChange: [
      async ({ req }) => {
        // Revalidate the about us page when content changes
        if (req.context.triggerRevalidate !== false) {
          try {
            await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/revalidate?secret=${process.env.REVALIDATION_SECRET}&collection=about-us`)
          } catch (error) {
            console.error('Error revalidating about us:', error)
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
      name: 'desc',
      type: 'textarea',
      required: true,
      label: 'Description',
    },
    {
      name: 'slides',
      type: 'array',
      label: 'Slides',
      minRows: 0,
      maxRows: 10,
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          label: 'Slide Title',
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
          label: 'Slide Image',
        },
        {
          name: 'link',
          type: 'text',
          required: false,
          label: 'Link URL',
        },
        {
          name: 'desc',
          type: 'textarea',
          required: true,
          label: 'Slide Description',
        },
      ],
    },
  ],
}
