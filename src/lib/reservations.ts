import { z } from 'zod'

export const seatingPreferenceOptions = ['indoors', 'outdoors'] as const
export const reservationStatusOptions = ['pending', 'confirmed', 'completed', 'cancelled'] as const

export const reservationDatePattern = /^\d{4}-\d{2}-\d{2}$/
export const reservationTimePattern = /^([01]\d|2[0-3]):([0-5]\d)$/
const reservationPhonePattern = /^[+\d\s()-]+$/

export const reservationSubmissionSchema = z.object({
  name: z.string().trim().min(2, 'Enter your full name.').max(120, 'Name is too long.'),
  phone: z
    .string()
    .trim()
    .min(7, 'Enter a valid phone number.')
    .max(30, 'Phone number is too long.')
    .regex(reservationPhonePattern, 'Enter a valid phone number.'),
  email: z
    .string()
    .trim()
    .min(1, 'Enter your email address.')
    .max(120, 'Email address is too long.')
    .pipe(z.email({ error: 'Enter a valid email address.' })),
  guests: z.coerce.number().int().min(1, 'At least 1 guest is required.'),
  tables: z.coerce.number().int().min(1, 'At least 1 table is required.'),
  seating: z.enum(seatingPreferenceOptions, {
    message: 'Choose whether you prefer indoors or outdoors seating.',
  }),
  date: z
    .string()
    .trim()
    .min(1, 'Choose a reservation date.')
    .regex(reservationDatePattern, 'Choose a valid reservation date.'),
  time: z
    .string()
    .trim()
    .min(1, 'Choose a reservation time.')
    .regex(reservationTimePattern, 'Choose a valid reservation time.'),
  notes: z
    .string()
    .trim()
    .min(1, 'Add a note for your reservation.')
    .max(1000, 'Notes must be 1000 characters or fewer.')
    .transform((value) => value),
  website: z
    .string()
    .optional()
    .transform((value) => (value ?? '').trim())
    .refine((value) => value.length === 0, 'Invalid submission.'),
})

export type ReservationSubmission = z.output<typeof reservationSubmissionSchema>
export type ReservationFieldName = keyof z.input<typeof reservationSubmissionSchema>
export type ReservationFieldErrors = Partial<Record<ReservationFieldName, string>>

export const toReservationRecord = (input: ReservationSubmission) => ({
  fullName: input.name,
  phone: input.phone,
  email: input.email,
  guestCount: input.guests,
  tableCount: input.tables,
  seatingPreference: input.seating,
  reservationDate: input.date,
  reservationTime: input.time,
  notes: input.notes || undefined,
  source: 'website' as const,
  status: 'pending' as const,
})
