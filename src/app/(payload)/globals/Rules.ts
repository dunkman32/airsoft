import type { GlobalConfig } from 'payload'

export const Rules: GlobalConfig = {
  slug: 'rules',
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
      name: 'content',
      type: 'richText',
      required: true,
      label: 'Content',
    },
  ],
}
