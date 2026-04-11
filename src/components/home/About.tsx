import Image from 'next/image'

export function About() {
  return (
    <section id="about" className="py-10 md:py-16 bg-white relative overflow-hidden">
      {/* Subtle background pattern/texture */}
      <div className="absolute top-0 right-0 -mr-32 -mt-32 w-96 h-96 rounded-full bg-slate-50 opacity-50 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-32 -mb-32 w-80 h-80 rounded-full bg-brand/5 opacity-50 blur-3xl pointer-events-none cursor-pointer" />

      <div className="container-site max-w-6xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Content Section */}
          <div className="flex flex-col justify-center order-first lg:order-last">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-0.5 bg-brand cursor-pointer" />
              <h2 className="text-sm font-bold tracking-widest text-brand uppercase">Our Story</h2>
            </div>

            <h3 className="text-3xl md:text-5xl font-serif text-slate-900 leading-tight mb-8">
              A vibrant celebration of Nairobi’s culinary spirit.
            </h3>

            <div className="space-y-6 text-slate-600 font-light text-base md:text-lg leading-relaxed">
              <p>
                Founded on a love for bold flavors and community connection, Café NBO is your
                sanctuary in the bustling heart of the city. We blend vibrant local ingredients with
                global culinary techniques to create an experience that feels both familiar and
                deeply exciting.
              </p>
              <p>
                Every plate we serve is a tribute to the warmth of Nairobi. From sunlit brunches to
                elegant evening dining, we are dedicated to crafting moments that invite you to slow
                down, savor, and share.
              </p>
            </div>

            <div className="mt-10 flex items-center">
              <a
                href="#menu"
                className="inline-block bg-brand/90 hover:bg-brand text-white font-medium px-10 py-4 rounded-full transition-colors duration-300 tracking-wide text-sm shadow-lg cursor-pointer"
              >
                Explore Our Menu
              </a>
            </div>
          </div>

          {/* Images Section */}
          <div className="relative order-last lg:order-first mt-10 lg:mt-0 mr-4 lg:mr-0">
            {/* Main Image */}
            <div className="relative z-10 rounded-2xl overflow-hidden aspect-4/5 w-4/5 shadow-2xl ring-1 ring-black/5 transform -rotate-2 hover:rotate-0 transition-transform duration-700 cursor-pointer">
              <Image
                src="/images-webp/pilau3.webp"
                alt="Traditional clay pot dish at Café NBO"
                fill
                className="object-cover hover:scale-105 transition-transform duration-700 cursor-pointer"
                sizes="(max-width: 1024px) 80vw, 40vw"
              />
              <div className="absolute inset-0 bg-linear-to-tr from-black/20 to-transparent" />
            </div>

            {/* Secondary Floating Image */}
            <div className="absolute -bottom-8 -right-4 md:-right-8 z-20 rounded-2xl overflow-hidden aspect-square w-3/5 shadow-2xl ring-4 ring-white transform rotate-3 hover:scale-105 transition-transform duration-700 bg-white cursor-pointer">
              <Image
                src="/images-webp/KVK03144.webp"
                alt="Fresh ingredients at Café NBO"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 60vw, 30vw"
              />
            </div>

            {/* Decorative Element */}
            <div className="absolute -top-10 -left-10 w-40 h-40 border-2 border-brand/20 rounded-full -z-10" />
            <div className="absolute top-1/2 -right-12 w-24 h-24 bg-brand/10 rounded-full -z-10 blur-xl cursor-pointer" />
          </div>
        </div>
      </div>
    </section>
  )
}
