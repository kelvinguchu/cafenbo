const CONTACT_INFO = [
  {
    label: 'Location',
    value: 'Chaka Place, Kilimani, Nairobi',
    href: 'https://g.co/kgs/e5MQZBK',
  },
  {
    label: 'Phone',
    value: '0708 337 077',
    href: 'tel:0708337077',
  },
  {
    label: 'Delivery',
    value: '+254 727 105 299',
    href: 'tel:+254727105299',
  },
  {
    label: 'Email',
    value: 'Info@cafenbo.co.ke',
    href: 'mailto:Info@cafenbo.co.ke',
  },
]

export function Contact() {
  return (
    <section id="contact" className="py-6 md:py-8 bg-neutral-50 border-t border-black/5">
      <div className="container-site">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {CONTACT_INFO.map((item) => (
            <a
              key={item.label}
              href={item.href}
              target={item.href.startsWith('http') ? '_blank' : undefined}
              rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="group"
            >
              <span className="block text-xs font-medium text-brand uppercase tracking-[0.2em] mb-2">
                {item.label}
              </span>
              <span className="block text-sm text-black/50 group-hover:text-black transition-colors duration-300 cursor-pointer">
                {item.value}
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
