import Image from 'next/image'

const IMAGES = [
  { src: '/images-webp/1.webp', alt: 'English breakfast in cast iron', className: 'col-span-1 row-span-2' },
  { src: '/images-webp/9.webp', alt: 'Pizza on wooden board', className: 'col-span-1 row-span-1' },
  { src: '/images-webp/2.webp', alt: 'Biryani in clay pot', className: 'col-span-1 row-span-1' },
  { src: '/images-webp/6.webp', alt: 'Breakfast spread overhead', className: 'col-span-1 row-span-1' },
  { src: '/images-webp/pizza.webp', alt: 'Pizza top-down view', className: 'col-span-1 row-span-2' },
  { src: '/images-webp/3.webp', alt: 'Biryani close-up', className: 'col-span-1 row-span-1' },
  { src: '/images-webp/8.webp', alt: 'Tagine on background', className: 'col-span-1 row-span-1' },
  { src: '/images-webp/4.webp', alt: 'Biryani overhead', className: 'col-span-1 row-span-1' },
]

export function Gallery() {
  return (
    <section id="gallery" className="section-padding bg-surface-900">
      <div className="container-site">
        {/* Heading */}
        <div className="text-center mb-14">
          <div className="w-10 h-0.5 bg-brand mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
            Our Kitchen
          </h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 auto-rows-[200px] md:auto-rows-[240px] gap-3">
          {IMAGES.map((img) => (
            <div
              key={img.src}
              className={`relative overflow-hidden rounded-lg group ${img.className}`}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-500" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
