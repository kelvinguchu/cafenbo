'use client'

import Image from 'next/image'
import { HiOutlineSparkles } from 'react-icons/hi2'
import type { MenuCategory } from '@/lib/getMenu'

type Props = {
  menu: MenuCategory[]
}

const CATEGORY_IMAGES: Record<string, string> = {
  'coffee': '/images-webp/coffee.webp',
  tea: '/images-webp/tea.webp',
  pastries: '/images-webp/KVK03089.webp',
  breakfast: '/images-webp/breakfast4.webp',
  'sweet-treats': '/images-webp/KVK03118.webp',
  starters: '/images-webp/KVK03133.webp',
  sandwiches: '/images-webp/KVK03149.webp',
  burgers: '/images-webp/KVK03319.webp',
  salads: '/images-webp/KVK03107.webp',
  pasta: '/images-webp/KVK03192.webp',
  pizza: '/images-webp/pizza.webp',
  'charcoal-over-pizza': '/images-webp/pizza.webp',
  'clay-oven': '/images-webp/pilau-side.webp',
  'main-dishes': '/images-webp/KVK03230.webp',
}

export function FullMenu({ menu }: Readonly<Props>) {
  if (!menu.length) return null

  const scrollToCategory = (id: string) => {
    const el = document.getElementById(id)
    if (el) {
      window.scrollTo({
        top: el.offsetTop - 100,
        behavior: 'smooth',
      })
    }
  }

  return (
    <div className="bg-slate-50 min-h-screen font-sans w-full overflow-x-hidden">
      {/* ── Page Header ── */}
      <header className="relative h-screen  flex items-center overflow-hidden">
        <Image
          src="/images-webp/brunch.webp"
          alt="Café NBO Menu"
          fill
          className="object-cover object-center"
          priority
          quality={90}
        />
        <div className="absolute inset-0 bg-black/60" />

        <div className="container-site relative z-10 w-full h-full flex flex-col justify-center items-start pt-20">
          <div className="max-w-4xl px-4">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight text-white mb-6 drop-shadow-md">
              Our <span className="text-brand">Menu</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 font-light max-w-xl leading-relaxed mb-10 drop-shadow-sm">
              Discover flavors crafted with passion. From sunlit brunches to soulful evening dining,
              a celebration of Nairobi&apos;s culinary spirit.
            </p>

            {/* Quick Nav Pills (Glassy) */}
            <nav className="flex flex-wrap items-center gap-3">
              {menu.map((cat) => (
                <button
                  key={`nav-${cat.slug}`}
                  onClick={() => scrollToCategory(`cat-${cat.slug}`)}
                  className="px-6 py-3 rounded-full border border-white/30 bg-white/10 backdrop-blur-md text-sm font-bold tracking-widest uppercase text-white hover:bg-brand hover:border-brand hover:text-white transition-all shadow-lg whitespace-nowrap cursor-pointer"
                >
                  {cat.category}
                </button>
              ))}
            </nav>
          </div>
        </div>
      </header>

      {/* ── Menu Tours / Sections ── */}
      <main className="pb-12">
        {menu.map((cat, index) => {
          // Alternate layouts based on index for a dynamic tour
          const isEven = index % 2 === 0

          // Strict direct mapping ONLY. No overrides or DB injection.
          const imageSrc = CATEGORY_IMAGES[cat.slug]

          // Skip rendering section if user did not provide an EXACT mapped image!
          if (!imageSrc) return null

          return (
            <div key={cat.slug} className="relative">
              {index > 0 && (
                <div className="absolute top-0 inset-x-0 flex justify-center items-center -translate-y-1/2 z-20 pointer-events-none">
                  <div className="flex items-center gap-3">
                    <div className="w-16 md:w-32 h-px bg-slate-300" />
                    <div className="w-1.5 h-1.5 rotate-45 bg-brand opacity-80 cursor-pointer" />
                    <div className="w-2 h-2 rotate-45 bg-brand cursor-pointer" />
                    <div className="w-1.5 h-1.5 rotate-45 bg-brand opacity-80 cursor-pointer" />
                    <div className="w-16 md:w-32 h-px bg-slate-300" />
                  </div>
                </div>
              )}
              <section
                id={`cat-${cat.slug}`}
                className={`py-8 md:py-12 ${isEven ? 'bg-slate-50' : 'bg-white'}`}
              >
                <div className="container-site max-w-7xl px-4 md:px-8">
                  <div
                    className={`grid grid-cols-1 xl:grid-cols-12 gap-10 lg:gap-16 items-stretch ${isEven ? '' : 'xl:flex-row-reverse'}`}
                  >
                    {/* Category Image / Section Leader */}
                    <div
                      className={`xl:col-span-5 h-87.5 md:h-112.5 xl:h-auto relative ${isEven ? '' : 'xl:col-start-8 xl:row-start-1'}`}
                    >
                      <div className="w-full h-full rounded-[2rem] overflow-hidden shadow-xl relative">
                        <Image
                          src={imageSrc}
                          alt={cat.category}
                          fill
                          className="object-cover object-center hover:scale-105 transition-transform duration-[2s] ease-out cursor-pointer"
                          sizes="(min-width: 1280px) 40vw, 100vw"
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-slate-900/80 via-slate-900/20 to-transparent" />

                        <div className="absolute bottom-8 left-8 right-8">
                          <div className="w-12 h-1 bg-brand mb-4 shadow-sm cursor-pointer" />
                          <h2 className="text-4xl md:text-5xl font-serif text-white mb-2 drop-shadow-lg">
                            {cat.category}
                          </h2>
                        </div>
                      </div>
                    </div>

                    {/* Menu Items Grid */}
                    <div
                      className={`xl:col-span-7 flex flex-col justify-center py-4 xl:py-8 ${isEven ? '' : 'xl:col-start-1 xl:row-start-1'}`}
                    >
                      <div className="hidden xl:block mb-10">
                        <div className="flex items-center gap-4 mb-4">
                          <span className="text-slate-400 font-bold tracking-widest uppercase text-xs">
                            Course {String(index + 1).padStart(2, '0')}
                          </span>
                          <div className="h-px bg-slate-200 flex-1" />
                        </div>
                        <h2 className="text-5xl font-serif text-slate-800">{cat.category}</h2>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12 mt-6">
                        {cat.items.map((item) => {
                          const hasPromo = item.isPromo && item.promoPrice
                          const savedPct = hasPromo
                            ? Math.round(((item.price - item.promoPrice!) / item.price) * 100)
                            : 0

                          return (
                            <div
                              key={item.name}
                              className="group relative flex flex-col border-b border-slate-200 pb-6 hover:border-brand transition-colors duration-300 cursor-pointer"
                            >
                              <div className="flex justify-between items-start gap-4 mb-2">
                                <h3 className="text-xl font-medium text-slate-900 font-serif leading-tight group-hover:text-brand transition-colors cursor-pointer">
                                  {item.name}
                                </h3>

                                <div className="shrink-0 flex flex-col items-end text-right mt-1">
                                  {hasPromo ? (
                                    <>
                                      <span className="text-xs text-slate-400 line-through tabular-nums leading-none mb-1">
                                        KES {item.price.toLocaleString()}
                                      </span>
                                      <span className="text-sm font-bold text-brand tabular-nums">
                                        KES {item.promoPrice!.toLocaleString()}
                                      </span>
                                    </>
                                  ) : (
                                    <span className="text-sm font-bold text-slate-700 tabular-nums">
                                      KES {item.price.toLocaleString()}
                                    </span>
                                  )}
                                </div>
                              </div>

                              {hasPromo && (
                                <div className="mt-2">
                                  <span className="inline-flex items-center gap-1 bg-brand/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-brand rounded-sm cursor-pointer">
                                    <HiOutlineSparkles className="size-3" />
                                    Special: {savedPct}% off
                                  </span>
                                </div>
                              )}
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          )
        })}
      </main>

      {/* ── Footer Info ── */}
      <div className="bg-slate-50 py-16 text-center border-t border-slate-200 mt-12 pb-24">
        <div className="container-site px-4 flex flex-col items-center">
          <div className="w-16 h-px bg-brand mb-6 cursor-pointer" />
          <h3 className="text-sm text-slate-400 uppercase tracking-widest font-bold mb-4">
            Pricing Information
          </h3>
          <p className="text-slate-600 max-w-md mx-auto font-light leading-relaxed">
            All prices are in{' '}
            <span className="font-medium text-slate-800">Kenya Shillings (KES)</span> and are
            inclusive of 16% VAT and 2% Catering Levy.
          </p>
        </div>
      </div>
    </div>
  )
}
