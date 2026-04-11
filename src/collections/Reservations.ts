import type { CollectionConfig, PayloadRequest } from 'payload'
import { isAdmin } from '../access/isAdmin'
import {
  reservationDatePattern,
  reservationStatusOptions,
  reservationTimePattern,
  seatingPreferenceOptions,
} from '../lib/reservations'

const adminOnly = ({ req: { user } }: { req: PayloadRequest }) => {
  return user?.roles?.includes('admin') ?? false
}

export const Reservations: CollectionConfig = {
  slug: 'reservations',
  labels: {
    singular: 'Reservation',
    plural: 'Reservations',
  },
  admin: {
    useAsTitle: 'fullName',
    defaultColumns: [
      'fullName',
      'reservationDate',
      'reservationTime',
      'guestCount',
      'tableCount',
      'seatingPreference',
      'status',
      'createdAt',
    ],
  },
  access: {
    read: isAdmin,
    create: isAdmin,
    update: isAdmin,
    delete: isAdmin,
    admin: adminOnly,
  },
  fields: [
    {
      name: 'fullName',
      type: 'text',
      required: true,
      maxLength: 120,
    },
    {
      name: 'phone',
      type: 'text',
      required: true,
      maxLength: 30,
    },
    {
      name: 'email',
      type: 'email',
      required: true,
      index: true,
    },
    {
      name: 'guestCount',
      label: 'Guests',
      type: 'number',
      required: true,
      min: 1,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'tableCount',
      label: 'Tables',
      type: 'number',
      required: true,
      min: 1,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'seatingPreference',
      type: 'select',
      required: true,
      options: seatingPreferenceOptions.map((value) => ({
        label: value === 'indoors' ? 'Indoors' : 'Outdoors',
        value,
      })),
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'reservationDate',
      type: 'text',
      required: true,
      index: true,
      admin: {
        position: 'sidebar',
        description: 'Use YYYY-MM-DD.',
      },
      validate: (value: unknown) => {
        if (typeof value !== 'string' || value.trim().length === 0) {
          return 'Reservation date is required.'
        }

        return reservationDatePattern.test(value) || 'Use YYYY-MM-DD.'
      },
    },
    {
      name: 'reservationTime',
      type: 'text',
      required: true,
      admin: {
        position: 'sidebar',
        description: 'Use 24-hour HH:MM format.',
      },
      validate: (value: unknown) => {
        if (typeof value !== 'string' || value.trim().length === 0) {
          return 'Reservation time is required.'
        }

        return reservationTimePattern.test(value) || 'Use HH:MM in 24-hour format.'
      },
    },
    {
      name: 'notes',
      type: 'textarea',
      maxLength: 1000,
    },
    {
      name: 'source',
      type: 'select',
      defaultValue: 'website',
      options: [{ label: 'Website', value: 'website' }],
      required: true,
      admin: {
        position: 'sidebar',
        readOnly: true,
      },
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'pending',
      options: reservationStatusOptions.map((value) => ({
        label: value.charAt(0).toUpperCase() + value.slice(1),
        value,
      })),
      admin: {
        position: 'sidebar',
      },
    },
  ],
  timestamps: true,
}
