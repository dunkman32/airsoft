import type { CollectionConfig } from 'payload'

// Helper function to generate slug from title
const formatSlug = (value: string): string => {
  return value
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
    .trim()
}

export const Events: CollectionConfig = {
  slug: 'events',
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['coverImage', 'title', 'date', 'createdAt'],
  },
  hooks: {
    beforeValidate: [
      async ({ data, req, operation }) => {
        // Auto-generate slug from title if slug is not provided
        if (data?.title && !data?.slug) {
          const baseSlug = formatSlug(data.title)
          let slug = baseSlug
          let counter = 1

          // Check for uniqueness and append number if slug exists
          while (true) {
            const existing = await req.payload.find({
              collection: 'events',
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
  },
  fields: [
    {
      name: 'coverImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: 'Cover Image',
    },
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Title',
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      label: 'Slug',
      admin: {
        description: 'URL-friendly version of the title (auto-generated if left empty)',
      },
      hooks: {
        beforeValidate: [
          ({ value }) => {
            // Format the slug if manually entered
            if (value && typeof value === 'string') {
              return formatSlug(value)
            }
            // If no value, it will be auto-generated from title in collection hook
            return value
          },
        ],
      },
    },
    {
      name: 'content',
      type: 'richText',
      required: true,
      label: 'Content',
    },
    {
      name: 'gallery',
      type: 'array',
      label: 'Gallery',
      minRows: 0,
      maxRows: 20,
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
          label: 'Gallery Image',
        },
        {
          name: 'caption',
          type: 'text',
          required: false,
          label: 'Image Caption',
        },
      ],
    },
    {
      name: 'date',
      type: 'date',
      required: true,
      label: 'Event Date',
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
    },
  ],
}
