'use client'

import type { ComponentProps } from 'react'
import { useMemo, useState } from 'react'
import Image from 'next/image'
import { z } from 'zod'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import {
  type ReservationFieldErrors,
  type ReservationFieldName,
  reservationSubmissionSchema,
} from '@/lib/reservations'

type ReservationInputField = {
  name: Exclude<ReservationFieldName, 'date' | 'notes' | 'seating' | 'website'>
  label: string
  type: ComponentProps<'input'>['type']
  placeholder: string
  autoComplete?: ComponentProps<'input'>['autoComplete']
  min?: ComponentProps<'input'>['min']
}

type ReservationSubmitEvent = Parameters<NonNullable<ComponentProps<'form'>['onSubmit']>>[0]

const FORM_FIELDS: readonly ReservationInputField[] = [
  {
    name: 'name',
    label: 'Full Name',
    type: 'text',
    placeholder: 'John Doe',
    autoComplete: 'name',
  },
  {
    name: 'phone',
    label: 'Phone Number',
    type: 'tel',
    placeholder: '+254 7XX XXX XXX',
    autoComplete: 'tel',
  },
  {
    name: 'email',
    label: 'Email Address',
    type: 'email',
    placeholder: 'john@example.com',
    autoComplete: 'email',
  },
  {
    name: 'guests',
    label: 'Guests',
    type: 'number',
    placeholder: '2',
    min: 1,
  },
  {
    name: 'tables',
    label: 'Tables',
    type: 'number',
    placeholder: '1',
    min: 1,
  },
  {
    name: 'time',
    label: 'Time',
    type: 'time',
    placeholder: '',
  },
]

const feedbackStyles = {
  error: 'border border-red-200 bg-red-50 text-red-700',
  success: 'border border-emerald-200 bg-emerald-50 text-emerald-700',
} as const

const fieldControlClassName =
  'w-full bg-transparent border-b py-2 text-sm text-stone-800 placeholder:text-stone-300 focus:outline-none focus:border-brand focus:ring-0 transition-colors'

const pickerTriggerClassName =
  'flex w-full items-center justify-between gap-4 border-b py-2 text-left text-sm text-stone-800 focus:outline-none focus:border-brand focus:ring-0 transition-colors'

const normalizeFieldErrors = (errors: Record<string, string[] | undefined> | undefined) => {
  const next: ReservationFieldErrors = {}

  if (!errors) return next

  for (const [field, messages] of Object.entries(errors)) {
    if (messages?.[0]) {
      next[field as ReservationFieldName] = messages[0]
    }
  }

  return next
}

const toDateInputValue = (date: Date) => {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')

  return `${year}-${month}-${day}`
}

const formatDateLabel = (value: string) => {
  if (!value) return 'Select a date'

  const [year, month, day] = value.split('-').map(Number)
  const date = new Date(year, month - 1, day)

  return new Intl.DateTimeFormat('en-KE', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(date)
}

export function Reservation() {
  const [fieldErrors, setFieldErrors] = useState<ReservationFieldErrors>({})
  const [feedback, setFeedback] = useState<{ type: 'error' | 'success' | null; message: string }>({
    type: null,
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [selectedDate, setSelectedDate] = useState('')
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false)

  const minReservationDay = useMemo(() => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    return today
  }, [])

  const selectedDateValue = useMemo(() => {
    if (!selectedDate) return undefined

    const [year, month, day] = selectedDate.split('-').map(Number)
    return new Date(year, month - 1, day)
  }, [selectedDate])

  const clearFieldError = (fieldName: ReservationFieldName) => {
    setFieldErrors((current) => {
      if (!current[fieldName]) return current

      const next = { ...current }
      delete next[fieldName]
      return next
    })
  }

  const handleSubmit = async (event: ReservationSubmitEvent) => {
    event.preventDefault()

    const form = event.currentTarget
    const rawValues = Object.fromEntries(new FormData(form).entries())
    const parsed = reservationSubmissionSchema.safeParse(rawValues)

    if (!parsed.success) {
      setFieldErrors(normalizeFieldErrors(z.flattenError(parsed.error).fieldErrors))
      setFeedback({ type: 'error', message: 'Please review the highlighted fields.' })
      return
    }

    setFieldErrors({})
    setFeedback({ type: null, message: '' })
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/reservation-requests', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(parsed.data),
      })

      const result = (await response.json().catch(() => null)) as {
        message?: string
        errors?: Record<string, string[] | undefined>
      } | null

      if (!response.ok) {
        setFieldErrors(normalizeFieldErrors(result?.errors))
        setFeedback({
          type: 'error',
          message: result?.message ?? 'We could not submit your reservation right now.',
        })
        return
      }

      form.reset()
      setSelectedDate('')
      setFeedback({
        type: 'success',
        message: result?.message ?? 'Reservation request received. We will contact you shortly.',
      })
    } catch {
      setFeedback({
        type: 'error',
        message: 'We could not submit your reservation right now. Please try again.',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="reservation" className="bg-stone-50 py-8 md:py-24 overflow-hidden">
      <div className="w-[96vw] mx-auto overflow-hidden">
        <div className="bg-white rounded-3xl shadow-sm border border-stone-100 overflow-hidden flex flex-col lg:flex-row items-stretch max-w-full">
          <div className="flex-1 p-8 md:p-12 lg:p-16 flex flex-col justify-center">
            <div className="mb-10">
              <span className="text-brand font-medium tracking-[0.2em] uppercase text-xs mb-3 block">
                Reserve Your Table
              </span>
              <h2 className="text-3xl md:text-4xl font-light text-stone-900 mb-4">
                Experience Café NBO
              </h2>
            </div>

            <form className="space-y-6" noValidate onSubmit={handleSubmit}>
              <div className="sr-only" aria-hidden="true">
                <label htmlFor="res-website">Website</label>
                <input
                  id="res-website"
                  name="website"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
                {FORM_FIELDS.map((field) => (
                  <div key={field.name} className="flex flex-col">
                    <label
                      htmlFor={`res-${field.name}`}
                      className="text-[10px] font-bold text-stone-400 mb-2 uppercase tracking-widest"
                    >
                      {field.label}
                    </label>
                    <input
                      id={`res-${field.name}`}
                      name={field.name}
                      type={field.type}
                      placeholder={field.placeholder}
                      required
                      autoComplete={field.autoComplete}
                      min={field.min}
                      inputMode={field.type === 'number' ? 'numeric' : undefined}
                      aria-invalid={Boolean(fieldErrors[field.name])}
                      aria-describedby={
                        fieldErrors[field.name] ? `res-${field.name}-error` : undefined
                      }
                      onChange={() => clearFieldError(field.name)}
                      className={`${fieldControlClassName} ${
                        fieldErrors[field.name] ? 'border-red-300' : 'border-stone-200'
                      }`}
                    />
                    {fieldErrors[field.name] && (
                      <p id={`res-${field.name}-error`} className="mt-2 text-xs text-red-600">
                        {fieldErrors[field.name]}
                      </p>
                    )}
                  </div>
                ))}

                <div className="flex flex-col">
                  <label
                    htmlFor="res-date"
                    className="text-[10px] font-bold text-stone-400 mb-2 uppercase tracking-widest"
                  >
                    Reservation Date
                  </label>
                  <input id="res-date" name="date" type="hidden" value={selectedDate} />
                  <Popover open={isDatePickerOpen} onOpenChange={setIsDatePickerOpen}>
                    <PopoverTrigger
                      className={cn(
                        pickerTriggerClassName,
                        fieldErrors.date ? 'border-red-300' : 'border-stone-200',
                      )}
                      aria-invalid={Boolean(fieldErrors.date)}
                      aria-required="true"
                    >
                      <span className={selectedDate ? 'text-stone-800' : 'text-stone-300'}>
                        {formatDateLabel(selectedDate)}
                      </span>
                      <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-400">
                        Pick
                      </span>
                    </PopoverTrigger>
                    <PopoverContent sideOffset={10} className="w-auto max-w-[calc(100vw-1rem)] p-2">
                      <Calendar
                        mode="single"
                        selected={selectedDateValue}
                        onSelect={(date) => {
                          if (!date) return

                          setSelectedDate(toDateInputValue(date))
                          clearFieldError('date')
                          setIsDatePickerOpen(false)
                        }}
                        disabled={{ before: minReservationDay }}
                        className="p-0"
                        classNames={{
                          root: 'w-fit',
                        }}
                      />
                    </PopoverContent>
                  </Popover>
                  {fieldErrors.date && (
                    <p id="res-date-error" className="mt-2 text-xs text-red-600">
                      {fieldErrors.date}
                    </p>
                  )}
                </div>

                <div className="flex flex-col">
                  <label
                    htmlFor="res-seating"
                    className="text-[10px] font-bold text-stone-400 mb-2 uppercase tracking-widest"
                  >
                    Seating Preference
                  </label>
                  <select
                    id="res-seating"
                    name="seating"
                    defaultValue=""
                    required
                    aria-invalid={Boolean(fieldErrors.seating)}
                    aria-describedby={fieldErrors.seating ? 'res-seating-error' : undefined}
                    onChange={() => clearFieldError('seating')}
                    className={`${fieldControlClassName} ${
                      fieldErrors.seating ? 'border-red-300' : 'border-stone-200'
                    }`}
                  >
                    <option value="" disabled>
                      Select seating
                    </option>
                    <option value="indoors">Indoors</option>
                    <option value="outdoors">Outdoors</option>
                  </select>
                  {fieldErrors.seating && (
                    <p id="res-seating-error" className="mt-2 text-xs text-red-600">
                      {fieldErrors.seating}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex flex-col pt-2">
                <label
                  htmlFor="res-notes"
                  className="text-[10px] font-bold text-stone-400 mb-2 uppercase tracking-widest"
                >
                  Special Requests
                </label>
                <textarea
                  id="res-notes"
                  name="notes"
                  rows={2}
                  required
                  placeholder="Any dietary requirements or special occasions..."
                  aria-invalid={Boolean(fieldErrors.notes)}
                  aria-describedby={fieldErrors.notes ? 'res-notes-error' : undefined}
                  onChange={() => clearFieldError('notes')}
                  className={`${fieldControlClassName} resize-none ${
                    fieldErrors.notes ? 'border-red-300' : 'border-stone-200'
                  }`}
                />
                {fieldErrors.notes && (
                  <p id="res-notes-error" className="mt-2 text-xs text-red-600">
                    {fieldErrors.notes}
                  </p>
                )}
              </div>

              {feedback.type && (
                <div className={`rounded-2xl px-4 py-3 text-sm ${feedbackStyles[feedback.type]}`}>
                  {feedback.message}
                </div>
              )}

              <div className="pt-6">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto bg-brand/90 hover:bg-brand disabled:bg-stone-300 disabled:cursor-not-allowed text-white font-medium px-10 py-4 rounded-full transition-colors duration-300 tracking-wide text-sm cursor-pointer"
                >
                  {isSubmitting ? 'Submitting...' : 'Confirm Reservation'}
                </button>
              </div>
            </form>
          </div>

          <div className="w-full lg:w-[45%] relative min-h-[50vh] lg:min-h-full hidden md:block">
            <Image
              src="/images-webp/pizza-closeup.webp"
              alt="Reservation at Café NBO"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 45vw"
            />
            <div className="absolute inset-0 bg-stone-900/10 mix-blend-multiply" />
          </div>
        </div>
      </div>
    </section>
  )
}
