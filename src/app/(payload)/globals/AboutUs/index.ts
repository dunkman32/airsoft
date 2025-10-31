import type { GlobalConfig } from 'payload'
import { revalidateAboutUs } from './actions'

export const AboutUs: GlobalConfig = {
  slug: 'about-us',
  access: {
    read: () => true,
  },
  hooks: {
    afterChange: [
      async () => {
        await revalidateAboutUs()
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
