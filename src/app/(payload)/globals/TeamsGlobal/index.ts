import type { GlobalConfig } from 'payload'

export const TeamsGlobal: GlobalConfig = {
  slug: 'teams-global',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      admin: {
        description: 'Teams page title',
      },
    },
    {
      name: 'content',
      type: 'richText',
      required: true,
      admin: {
        description: 'Teams page content (rich text)',
      },
    },
    {
      name: 'teamHero',
      type: 'upload',
      relationTo: 'media',
      required: true,
      admin: {
        description: 'Team hero image',
      },
    },
  ],
}
