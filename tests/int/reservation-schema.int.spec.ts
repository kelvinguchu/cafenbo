import { describe, expect, it } from 'vitest'
import { reservationSubmissionSchema, toReservationRecord } from '@/lib/reservations'

describe('reservationSubmissionSchema', () => {
  it('accepts a valid reservation request', () => {
    const parsed = reservationSubmissionSchema.safeParse({
      name: 'Jane Doe',
      phone: '+254 700 123 456',
      email: 'jane@example.com',
      guests: '4',
      tables: '2',
      seating: 'indoors',
      date: '2026-05-01',
      time: '18:30',
      notes: 'Birthday dinner',
      website: '',
    })

    expect(parsed.success).toBe(true)

    if (parsed.success) {
      expect(toReservationRecord(parsed.data)).toMatchObject({
        fullName: 'Jane Doe',
        guestCount: 4,
        tableCount: 2,
        seatingPreference: 'indoors',
        reservationDate: '2026-05-01',
        reservationTime: '18:30',
        status: 'pending',
        source: 'website',
      })
    }
  })

  it('rejects guest counts below one', () => {
    const parsed = reservationSubmissionSchema.safeParse({
      name: 'Jane Doe',
      phone: '+254 700 123 456',
      email: 'jane@example.com',
      guests: '0',
      tables: '1',
      seating: 'indoors',
      date: '2026-05-01',
      time: '18:30',
      notes: '',
      website: '',
    })

    expect(parsed.success).toBe(false)

    if (!parsed.success) {
      expect(parsed.error.flatten().fieldErrors.guests).toContain('At least 1 guest is required.')
    }
  })

  it('rejects table counts below one', () => {
    const parsed = reservationSubmissionSchema.safeParse({
      name: 'Jane Doe',
      phone: '+254 700 123 456',
      email: 'jane@example.com',
      guests: '2',
      tables: '0',
      seating: 'outdoors',
      date: '2026-05-01',
      time: '18:30',
      notes: '',
      website: '',
    })

    expect(parsed.success).toBe(false)

    if (!parsed.success) {
      expect(parsed.error.flatten().fieldErrors.tables).toContain('At least 1 table is required.')
    }
  })

  it('rejects spam submissions through the honeypot field', () => {
    const parsed = reservationSubmissionSchema.safeParse({
      name: 'Jane Doe',
      phone: '+254 700 123 456',
      email: 'jane@example.com',
      guests: '2',
      tables: '1',
      seating: 'indoors',
      date: '2026-05-01',
      time: '18:30',
      notes: '',
      website: 'https://spam.example',
    })

    expect(parsed.success).toBe(false)
  })
})
