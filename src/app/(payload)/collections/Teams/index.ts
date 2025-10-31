import type { CollectionConfig } from 'payload'
import { revalidateTeams } from './actions'

// Helper function to generate slug from name
const formatSlug = (value: string): string => {
  return value
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
    .trim()
}

export const Teams: CollectionConfig = {
  slug: 'teams',
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'desc'],
  },
  hooks: {
    beforeValidate: [
      async ({ data, req, operation }) => {
        // Auto-generate slug from name if slug is not provided
        if (data?.name && !data?.slug) {
          const baseSlug = formatSlug(data.name)
          let slug = baseSlug
          let counter = 1

          // Check for uniqueness and append number if slug exists
          while (true) {
            const existing = await req.payload.find({
              collection: 'teams',
              where: {
                slug: {
                  equals: slug,
                },
              },
              limit: 1,
            })

            // If no existing document with this slug, or if it's the same document being updated
            if (
              existing.docs.length === 0 ||
              (operation === 'update' && existing.docs[0].id === data.id)
            ) {
              break
            }

            // Slug exists, try with a number suffix
            slug = `${baseSlug}-${counter}`
            counter++
          }

          data.slug = slug
        }

        return data
      },
    ],
    afterChange: [
      async () => {
        await revalidateTeams()
      },
    ],
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      admin: {
        description: 'Team name',
      },
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      label: 'Slug',
      admin: {
        description: 'URL-friendly version of the name (auto-generated if left empty)',
      },
      hooks: {
        beforeValidate: [
          ({ value }) => {
            // Format the slug if manually entered
            if (value && typeof value === 'string') {
              return formatSlug(value)
            }
            // If no value, it will be auto-generated from name in collection hook
            return value
          },
        ],
      },
    },
    {
      name: 'desc',
      type: 'textarea',
      required: true,
      admin: {
        description: 'Team description',
      },
    },
    {
      name: 'hero',
      type: 'upload',
      relationTo: 'media',
      required: true,
      admin: {
        description: 'Team hero image',
      },
    },
    {
      name: 'gallery',
      type: 'array',
      label: 'Gallery',
      admin: {
        description: 'Team image gallery',
      },
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
      ],
    },
  ],
}
