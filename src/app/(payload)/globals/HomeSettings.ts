import type { GlobalConfig } from 'payload'

export const HomeSettings: GlobalConfig = {
  slug: 'home-settings',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: 'Logo',
    },
    {
      name: 'phoneNumber',
      type: 'text',
      required: true,
      label: 'Phone Number',
    },
    {
      name: 'showroomLink',
      type: 'text',
      required: true,
      label: 'Showroom Link',
    },
    {
      name: 'carousel',
      type: 'array',
      label: 'Home Carousel',
      minRows: 1,
      maxRows: 10,
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
          label: 'Carousel Image',
        },
        {
          name: 'link',
          type: 'text',
          required: false,
          label: 'Link URL',
        },
      ],
    },
    {
      name: 'ads',
      type: 'array',
      label: 'Home Ads',
      minRows: 0,
      maxRows: 20,
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
          label: 'Ad Image',
        },
        {
          name: 'link',
          type: 'text',
          required: false,
          label: 'Link URL',
        },
        {
          name: 'title',
          type: 'text',
          required: false,
          label: 'Title',
        },
      ],
    },
    {
      name: 'featuredNews',
      type: 'relationship',
      relationTo: 'news',
      hasMany: true,
      label: 'Featured News',
      admin: {
        description: 'Select news articles to feature on the home page',
      },
    },
  ],
}
