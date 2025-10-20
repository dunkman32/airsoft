import type { GlobalConfig } from 'payload'

export const AboutUs: GlobalConfig = {
  slug: 'about-us',
  access: {
    read: () => true,
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
