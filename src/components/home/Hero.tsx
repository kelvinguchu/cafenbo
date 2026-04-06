import Image from 'next/image'

export function Hero() {
  return (
    <section id="hero" className="relative h-svh min-h-125 flex items-center overflow-hidden">
      {/* Background image */}
      <Image
        src="/images-webp/breakfast2.webp"
        alt="Breakfast spread at Café NBO"
        fill
        className="object-cover"
        priority
        quality={90}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-linear-to-r from-black/80 via-black/60 to-black/30" />
      <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-black/20" />

      {/* Content */}
      <div className="container-site relative z-10">
        <div className="max-w-2xl">
          {/* Red accent line */}
          <div className="w-12 h-0.5 bg-brand mb-8" />

          <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white leading-[0.95]">
            Café
            <br />
            <span className="text-brand">NBO</span>
          </h1>

          <p className="mt-6 text-lg md:text-xl text-white/60 font-light max-w-lg">
            A symphony of flavors in the heart of Nairobi
          </p>

          {/* CTAs */}
          <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row gap-3 sm:gap-4">
            <a
              href="#menu"
              className="inline-flex items-center justify-center gap-2 bg-brand hover:bg-brand-dark text-white font-semibold px-8 py-3.5 rounded-full transition-colors duration-300 text-sm tracking-wide"
            >
              View Menu
            </a>
            <a
              href="https://glovoapp.com/ke/en/nairobi/cafe-nbo-nbo/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 border border-white/20 hover:border-white/40 text-white font-medium px-8 py-3.5 rounded-full transition-all duration-300 text-sm tracking-wide"
            >
              Order Now
            </a>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 hidden sm:block">
        <div className="w-5 h-9 border-2 border-white/20 rounded-full flex justify-center">
          <div className="w-0.5 h-2.5 bg-white/40 rounded-full mt-1.5 animate-bounce" />
        </div>
      </div>
    </section>
  )
}
