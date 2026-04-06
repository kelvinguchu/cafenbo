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
    <section className="relative py-6 md:py-8 overflow-hidden bg-surface-800">
      <div className="container-site relative z-10 py-12 md:py-16">
        <div className="text-center mb-12">
          <div className="w-10 h-0.5 bg-brand mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">Why Café NBO</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 max-w-4xl mx-auto">
          {POINTS.map((point) => (
            <div key={point.number} className="text-center">
              <span className="text-brand text-4xl font-bold">{point.number}</span>
              <h3 className="text-lg font-semibold text-white mt-4 mb-3">{point.title}</h3>
              <p className="text-sm text-white/50 leading-relaxed">{point.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
