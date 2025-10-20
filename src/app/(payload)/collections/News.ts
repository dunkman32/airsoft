import type { CollectionConfig } from 'payload'

export const News: CollectionConfig = {
  slug: 'news',
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['image', 'title', 'slug', 'createdAt'],
  },
  fields: [
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: 'Image',
    },
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
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      label: 'Slug',
      admin: {
        description: 'URL-friendly version of the title',
      },
    },
    {
      name: 'content',
      type: 'richText',
      required: true,
      label: 'Content',
    },
  ],
}
