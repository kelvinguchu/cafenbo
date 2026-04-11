import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { z } from 'zod'
import { reservationSubmissionSchema, toReservationRecord } from '@/lib/reservations'

const successMessage = 'Reservation request received. We will contact you shortly.'

export const POST = async (request: Request) => {
  let body: unknown

  try {
    body = await request.json()
  } catch {
    return Response.json({ message: 'Invalid request body.' }, { status: 400 })
  }

  const rawBody = body as Record<string, unknown> | null
  const honeypot = typeof rawBody?.website === 'string' ? rawBody.website.trim() : ''

  if (honeypot) {
    return Response.json({ ok: true, message: successMessage }, { status: 202 })
  }

  const parsed = reservationSubmissionSchema.safeParse(body)

  if (!parsed.success) {
    return Response.json(
      {
        message: 'Please review the highlighted fields.',
        errors: z.flattenError(parsed.error).fieldErrors,
      },
      { status: 400 },
    )
  }

  try {
    const payload = await getPayload({ config: configPromise })

    await payload.create({
      collection: 'reservations',
      data: toReservationRecord(parsed.data),
      overrideAccess: true,
    })

    return Response.json({ ok: true, message: successMessage }, { status: 201 })
  } catch {
    return Response.json(
      { message: 'We could not submit your reservation right now. Please try again.' },
      { status: 500 },
    )
  }
}
