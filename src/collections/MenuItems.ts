import type { CollectionConfig } from 'payload'
import { anyone } from '../access/anyone'
import { isAdmin } from '../access/isAdmin'

export const MenuItems: CollectionConfig = {
  slug: 'menu-items',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'category', 'price', 'promoPrice', 'isPromo', 'available'],
  },
  access: {
    read: anyone,
    create: isAdmin,
    update: isAdmin,
    delete: isAdmin,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'price',
      type: 'number',
      required: true,
      min: 0,
      admin: {
        description: 'Base price in KES. If variants are set, use the default or lowest price.',
      },
    },
    {
      name: 'priceVariants',
      type: 'array',
      labels: {
        singular: 'price variant',
        plural: 'price variants',
      },
      admin: {
        description: 'Optional size or portion prices shown instead of the base price.',
      },
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
        },
        {
          name: 'price',
          type: 'number',
          required: true,
          min: 0,
        },
      ],
    },
    {
      name: 'promoPrice',
      type: 'number',
      min: 0,
      admin: {
        description: 'Discounted promo price in KES',
        condition: (data) => data?.isPromo && !data?.priceVariants?.length,
      },
    },
    {
      name: 'isPromo',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        position: 'sidebar',
        description: 'Enable promo pricing for this item',
        condition: (data) => !data?.priceVariants?.length,
      },
    },
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'menu-categories',
      required: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'available',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        position: 'sidebar',
        description: 'Uncheck to hide from the menu',
      },
    },
    {
      name: 'sortOrder',
      type: 'number',
      defaultValue: 0,
      admin: {
        position: 'sidebar',
      },
    },
  ],
}
