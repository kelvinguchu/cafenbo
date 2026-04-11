const POINTS = [
  {
    number: '01',
    title: 'Fresh From Our Ovens',
    text: 'Every dish made from scratch with the finest local ingredients.',
  },
  {
    number: '02',
    title: 'Rooted in Nairobi',
    text: 'Inspired by local Swahili, Indian, and Mediterranean cuisines.',
  },
  {
    number: '03',
    title: 'Versatility & Atmosphere',
    text: 'From casual brunch to romantic dinner — the perfect setting.',
  },
]

export function WhyUs() {
  return (
    <section className="relative py-16 md:py-24 overflow-hidden bg-slate-50">
      <div className="absolute inset-0 bg-[url('/images-webp/KVK03144.webp')] bg-cover bg-center bg-fixed opacity-[0.03] grayscale" />
      <div className="absolute top-0 right-0 w-1/3 h-full bg-linear-to-l from-brand/5 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-1/3 h-full bg-linear-to-t from-slate-200/50 to-transparent pointer-events-none" />

      <div className="container-site relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16 md:mb-20">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-10 h-px bg-brand cursor-pointer" />
            <h2 className="text-sm font-bold tracking-widest text-brand uppercase">Our Promise</h2>
            <div className="w-10 h-px bg-brand cursor-pointer" />
          </div>
          <h3 className="text-3xl md:text-5xl font-serif text-slate-900 leading-tight">
            Why Café NBO
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-y-10 md:gap-y-12 gap-x-8 max-w-5xl mx-auto relative px-2 md:px-0">
          {/* Desktop horizontal line */}
          <div className="hidden md:block absolute top-[20%] left-1/6 right-1/6 h-px bg-slate-200 -z-10" />

          {/* Mobile vertical line */}
          <div className="md:hidden absolute top-8 bottom-12 left-9 w-px bg-slate-200 -z-10" />

          {POINTS.map((point) => (
            <div
              key={point.number}
              className="flex flex-row md:flex-col items-start md:items-center text-left md:text-center group px-2 md:px-4 gap-5 md:gap-0"
            >
              <div className="shrink-0 w-14 h-14 md:w-16 md:h-16 mx-0 md:mx-auto rounded-full bg-white flex items-center justify-center border-2 border-brand/20 group-hover:border-brand/60 group-hover:scale-110 transition-all duration-500 shadow-sm md:mb-6 relative bg-clip-padding cursor-pointer z-10">
                <span className="text-brand text-lg md:text-2xl font-serif italic absolute z-10">
                  {point.number}
                </span>
                <div className="absolute -inset-1 bg-brand/5 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500 cursor-pointer" />
              </div>
              <div className="pt-2 md:pt-0">
                <h4 className="text-lg md:text-xl font-semibold text-slate-900 mb-2 md:mb-4 group-hover:text-brand transition-colors cursor-pointer mt-1 md:mt-0">
                  {point.title}
                </h4>
                <p className="text-sm md:text-base text-slate-600 font-light leading-relaxed md:max-w-xs mx-auto">
                  {point.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
