import Image from 'next/image'

const FORM_FIELDS = [
  { name: 'name', label: 'Name', type: 'text', placeholder: 'Your name' },
  { name: 'phone', label: 'Phone', type: 'tel', placeholder: '07XX XXX XXX' },
  { name: 'email', label: 'Email', type: 'email', placeholder: 'your@email.com' },
  { name: 'guests', label: 'Guests', type: 'number', placeholder: 'Number of guests' },
  { name: 'date', label: 'Date', type: 'date', placeholder: '' },
  { name: 'time', label: 'Time', type: 'time', placeholder: '' },
]

export function Reservation() {
  return (
    <section id="reservation" className="section-padding bg-white">
      <div className="container-site">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-stretch">
          <div className="flex flex-col justify-center">
            <div className="w-10 h-0.5 bg-brand mb-6" />
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-black leading-tight">
              Book Your Table
            </h2>

            <form className="mt-8 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {FORM_FIELDS.map((field) => (
                  <div key={field.name}>
                    <label
                      htmlFor={`res-${field.name}`}
                      className="block text-xs font-medium text-black/40 mb-1.5 uppercase tracking-wider"
                    >
                      {field.label}
                    </label>
                    <input
                      id={`res-${field.name}`}
                      type={field.type}
                      placeholder={field.placeholder}
                      className="w-full bg-neutral-50 border border-black/8 rounded-lg px-4 py-3 text-sm text-black placeholder:text-black/25 focus:outline-none focus:border-brand/50 focus:ring-1 focus:ring-brand/20 transition-all duration-300"
                    />
                  </div>
                ))}
              </div>

              <div>
                <label
                  htmlFor="res-notes"
                  className="block text-xs font-medium text-black/40 mb-1.5 uppercase tracking-wider"
                >
                  Notes
                </label>
                <textarea
                  id="res-notes"
                  rows={3}
                  placeholder="Any special requests..."
                  className="w-full bg-neutral-50 border border-black/8 rounded-lg px-4 py-3 text-sm text-black placeholder:text-black/25 focus:outline-none focus:border-brand/50 focus:ring-1 focus:ring-brand/20 transition-all duration-300 resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto bg-brand hover:bg-brand-dark text-white font-semibold px-10 py-3.5 rounded-full transition-colors duration-300 text-sm tracking-wide active:scale-95"
              >
                Reserve Now
              </button>
            </form>
          </div>

          <div className="relative rounded-2xl overflow-hidden hidden lg:block min-h-75">
            <Image
              src="/images-webp/pizza-closeup.webp"
              alt="Food at Café NBO"
              fill
              className="object-cover"
              sizes="50vw"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
