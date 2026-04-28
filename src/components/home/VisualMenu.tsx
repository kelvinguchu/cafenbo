'use client'
import * as React from 'react'
import Image from 'next/image'
import { HiOutlineSparkles, HiOutlineChevronRight } from 'react-icons/hi2'
import { MenuImagePreloader } from '@/components/menu/MenuImagePreloader'
import type { MenuCategory } from '@/lib/getMenu'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from '@/components/ui/carousel'

type Props = {
  menu: MenuCategory[]
}

const FALLBACK_CATEGORY_IMAGES: Record<string, string> = {
  coffee: '/images-webp/coffee.webp',
  tea: '/images-webp/tea.webp',
  pastries: '/images-webp/pastries.webp',
  breakfast: '/images-webp/breakfast4.webp',
  'sweet-treats': '/images-webp/cake.webp',
  'soft-drinks': '/images-webp/softdrink.webp',
  'cold-drinks': '/images-webp/drink.webp',
  bakery: '/images-webp/cake.webp',
  'all-day-breakfast': '/images-webp/pancakes-and-coffee.webp',
  starters: '/images-webp/starters.webp',
  sandwiches: '/images-webp/sandwiches.webp',
  burgers: '/images-webp/burgers.webp',
  salads: '/images-webp/salad.webp',
  pasta: '/images-webp/pasta.webp',
  pizza: '/images-webp/pizza.webp',
  'charcoal-over-pizza': '/images-webp/pizza.webp',
  'charcoal-oven-pizza': '/images-webp/pizza.webp',
  'clay-oven': '/images-webp/clay-pot-rice.webp',
  'clay-oven-indian-cuisine': '/images-webp/clay-pot-rice.webp',
  extras: '/images-webp/lunch.webp',
  'main-dishes': '/images-webp/rice-chicken-tray.webp',
  'nbo-main-dishes': '/images-webp/rice-chicken-tray.webp',
}

const getCategoryImage = (category: MenuCategory) =>
  FALLBACK_CATEGORY_IMAGES[category.slug] ?? category.image ?? null

export function VisualMenu({ menu }: Readonly<Props>) {
  const validMenu = menu.filter((cat) => Boolean(getCategoryImage(cat)))
  const allImages = Array.from(
    new Set(validMenu.map(getCategoryImage).filter((value): value is string => Boolean(value))),
  )

  const [selectedIndex, setSelectedIndex] = React.useState(0)
  const [carouselApi, setCarouselApi] = React.useState<CarouselApi | null>(null)

  const handleSetApi = React.useCallback((api: CarouselApi) => {
    setCarouselApi(api)
  }, [])

  React.useEffect(() => {
    if (!carouselApi) return
    const onSelect = () => setSelectedIndex(carouselApi.selectedScrollSnap())
    onSelect()
    carouselApi.on('select', onSelect)
    return () => {
      carouselApi.off('select', onSelect)
    }
  }, [carouselApi])

  const activeCat = validMenu[selectedIndex] ?? validMenu[0]

  if (!validMenu.length) return null

  return (
    <section id="menu" className="relative bg-white py-8 md:py-16 overflow-hidden">
      <MenuImagePreloader imageUrls={allImages} />

      <div className="container-site max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex flex-col items-center text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-serif text-slate-900 mb-4 tracking-tight">
            Our <span className="italic text-brand text-opacity-90">Curated</span> Menu
          </h2>
          <div className="w-12 h-1 bg-brand-dark mx-auto opacity-70" />
        </div>

        {/* Carousel containing whole categories as slides */}
        <Carousel
          opts={{
            align: 'start',
            loop: true,
          }}
          setApi={handleSetApi}
          className="w-full relative"
        >
          <CarouselContent>
            {validMenu.map((cat) => {
              const bgImage = getCategoryImage(cat)
              return (
                <CarouselItem key={cat.slug} className="w-full relative">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-stretch md:max-h-[80vh] px-1">
                    {/* Left Column: Image Area */}
                    <div className="lg:col-span-5 relative w-full h-87.5 sm:h-112.5 lg:h-full lg:max-h-full lg:min-h-0 min-h-125 rounded-3xl overflow-hidden shadow-2xl group border border-slate-100">
                      <Image
                        key={`visual-${bgImage}`}
                        src={bgImage as string}
                        alt={cat.category}
                        fill
                        className="object-cover object-center animate-menu-fade-in group-hover:scale-105 transition-transform duration-[10s] ease-out"
                        sizes="(min-width: 1024px) 40vw, 100vw"
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-black/10" />
                      <div className="absolute bottom-8 left-8 right-8">
                        <h3 className="text-4xl font-serif text-white mb-3 drop-shadow-lg">
                          {cat.category}
                        </h3>
                        <div className="w-12 h-1 bg-brand-light shadow-sm" />
                      </div>
                    </div>

                    {/* Right Column: Menu Items */}
                    <div className="lg:col-span-7 flex flex-col h-full pb-6">
                      <div className="mb-4 pb-2 border-b-2 border-brand/30">
                        <h3 className="text-xl md:text-2xl font-serif font-bold text-slate-900 tracking-tight">
                          Featured Offerings
                        </h3>
                      </div>

                      <div className="space-y-2 md:space-y-3">
                        {cat.items.slice(0, 6).map((item) => {
                          const hasPriceVariants = Boolean(item.priceVariants?.length)
                          const hasPromo = !hasPriceVariants && item.isPromo && item.promoPrice

                          let priceContent: React.ReactNode

                          if (hasPriceVariants) {
                            priceContent = (
                              <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 items-end sm:items-center">
                                {item.priceVariants!.map((variant) => (
                                  <div
                                    key={`${item.name}-${variant.label}`}
                                    className="flex items-baseline gap-1.5"
                                  >
                                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                                      {variant.label}
                                    </span>
                                    <span className="text-base font-bold text-slate-900 tabular-nums">
                                      {variant.price.toLocaleString()}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            )
                          } else if (hasPromo) {
                            priceContent = (
                              <div className="flex flex-col items-end sm:flex-row sm:items-baseline gap-1 sm:gap-2">
                                <span className="text-xs text-slate-400 line-through tabular-nums">
                                  {item.price.toLocaleString()}
                                </span>
                                <span className="text-lg font-bold text-brand tabular-nums leading-none">
                                  {item.promoPrice!.toLocaleString()}
                                </span>
                              </div>
                            )
                          } else {
                            priceContent = (
                              <span className="text-lg font-bold text-slate-900 tabular-nums leading-none">
                                {item.price.toLocaleString()}
                              </span>
                            )
                          }

                          return (
                            <div
                              key={item.name}
                              className="group relative flex justify-between items-end gap-4 border-b border-slate-200 pb-2 hover:border-brand/40 transition-colors"
                            >
                              <div className="flex-1 min-w-0 pr-4">
                                <div className="flex flex-wrap items-center gap-2">
                                  <h4 className="text-lg text-slate-800 font-semibold group-hover:text-brand-dark transition-colors">
                                    {item.name}
                                  </h4>
                                  {hasPromo && (
                                    <span className="shrink-0 inline-flex items-center gap-1 rounded bg-brand/10 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-brand">
                                      <HiOutlineSparkles className="size-3" />
                                      OFFER
                                    </span>
                                  )}
                                </div>
                              </div>

                              <div className="shrink-0 flex flex-col items-end gap-1.5 mb-0.5">
                                {priceContent}
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              )
            })}
          </CarouselContent>

          {/* Desktop nav — side arrows (original design) */}
          <div className="hidden lg:block">
            <CarouselPrevious className="border-brand hover:bg-brand hover:text-white text-brand bg-white shadow-lg hover:shadow-xl transition-colors" />
            <CarouselNext className="border-brand hover:bg-brand hover:text-white text-brand bg-white shadow-lg hover:shadow-xl transition-colors" />
          </div>

          {/* Mobile nav — centered below slides */}
          <div className="flex lg:hidden justify-center items-center gap-4 mt-6">
            <CarouselPrevious className="static translate-y-0 left-auto right-auto top-auto w-12 h-12 border-brand hover:bg-brand hover:text-white text-brand bg-white shadow-lg transition-colors" />
            <span className="text-xs font-bold uppercase tracking-widest text-slate-400">
              Scroll
            </span>
            <CarouselNext className="static translate-y-0 left-auto right-auto top-auto w-12 h-12 border-brand hover:bg-brand hover:text-white text-brand bg-white shadow-lg transition-colors" />
          </div>
        </Carousel>

        {/* Prices + CTA — sits below buttons, never slides */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-100 max-w-4xl mx-auto">
          <p className="text-xs text-slate-500 font-semibold tracking-widest leading-relaxed text-center sm:text-left">
            ALL PRICES KES &bull; INC. 16% VAT & 2% LEVY
          </p>
          <a
            href={`/menu#cat-${activeCat?.slug ?? 'menu'}`}
            className="group inline-flex items-center justify-center gap-2 text-sm font-bold uppercase tracking-widest text-brand hover:text-brand-dark transition-colors whitespace-nowrap"
          >
            Explore {activeCat?.category ?? 'Full Menu'}
            <HiOutlineChevronRight className="size-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  )
}
