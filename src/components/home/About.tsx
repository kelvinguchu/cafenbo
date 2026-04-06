import Image from 'next/image'

const HIGHLIGHTS = [
  'Quality Food',
  'Personal Service',
  'Customer Satisfaction',
]

export function About() {
  return (
    <section id="about" className="section-padding bg-white">
      <div className="container-site">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-stretch">
          <div className="flex flex-col justify-center">
            <div className="w-10 h-0.5 bg-brand mb-6" />
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-black leading-tight">
              Where Culture
              <br />
              Meets Cuisine
            </h2>

            <p className="mt-6 text-black/50 leading-relaxed max-w-lg">
              At Café NBO, we celebrate Nairobi&apos;s vibrant spirit with dishes
              inspired by local tastes and global favorites. Our chefs craft every
              plate with passion, using fresh, locally-sourced ingredients.
            </p>
            <p className="mt-4 text-black/50 leading-relaxed max-w-lg">
              Whether you&apos;re a regular or a traveler, Café NBO is where stories
              are shared and friendships brewed.
            </p>

            <div className="mt-10 flex flex-wrap gap-8">
              {HIGHLIGHTS.map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-brand" />
                  <span className="text-sm font-medium text-black/60 tracking-wide">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative rounded-2xl overflow-hidden min-h-70 sm:min-h-87.5">
            <Image
              src="/images-webp/pilau3.webp"
              alt="Traditional clay pot dish at Café NBO"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
