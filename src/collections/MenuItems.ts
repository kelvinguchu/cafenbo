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
        description: 'Price in KES',
      },
    },
    {
      name: 'promoPrice',
      type: 'number',
      min: 0,
      admin: {
        description: 'Discounted promo price in KES',
        condition: (data) => data?.isPromo,
      },
    },
    {
      name: 'isPromo',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        position: 'sidebar',
        description: 'Enable promo pricing for this item',
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
