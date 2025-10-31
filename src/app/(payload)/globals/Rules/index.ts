import type { GlobalConfig } from 'payload'
import { revalidateRules } from './actions'

export const Rules: GlobalConfig = {
  slug: 'rules',
  access: {
    read: () => true,
  },
  hooks: {
    afterChange: [
      async () => {
        await revalidateRules()
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
