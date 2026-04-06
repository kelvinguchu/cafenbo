'use client'

import { useState, useRef, useCallback, useEffect } from 'react'
import Image from 'next/image'
import {
  HiOutlineChevronLeft,
  HiOutlineChevronRight,
  HiOutlineChevronDown,
  HiOutlineSparkles,
} from 'react-icons/hi2'
import { ScrollArea } from '@/components/ui/scroll-area'
import type { MenuCategory } from '@/lib/getMenu'

type Props = {
  menu: MenuCategory[]
}

/** Map category slugs to all available photos */
const PHOTOS: Record<string, string[]> = {
  breakfast: [
    '/images-webp/breakfast.webp',
    '/images-webp/breakfast4.webp',
    '/images-webp/breakfast3.webp',
  ],
  starters: ['/images-webp/breakfast2.webp'],
  sandwiches: ['/images-webp/breakfast3.webp'],
  salads: ['/images-webp/pilau-closeup.webp'],
  'charcoal-over-pizza': [
    '/images-webp/pizza.webp',
    '/images-webp/pizza-closeup.webp',
    '/images-webp/pizza2.webp',
  ],
  'clay-oven': ['/images-webp/pilau-side.webp', '/images-webp/pilau2.webp'],
  'main-dishes': [
    '/images-webp/pilau.webp',
    '/images-webp/pilau3.webp',
    '/images-webp/pilau-closeup.webp',
  ],
}

/** Fallback bg images for categories without their own photos */
const FALLBACK_IMAGES = [
  '/images-webp/breakfast.webp',
  '/images-webp/pizza.webp',
  '/images-webp/pilau.webp',
]

/** Collect every unique image path for preloading */
const ALL_IMAGES = [...new Set([...Object.values(PHOTOS).flat(), ...FALLBACK_IMAGES])]

export function VisualMenu({ menu }: Readonly<Props>) {
  const [active, setActive] = useState(0)
  const [showAll, setShowAll] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Persist per-category image position
  const [imageMap, setImageMap] = useState<Record<number, number>>({})
  const imageIdx = imageMap[active] ?? 0
  const setImageIdx = useCallback(
    (idx: number) => setImageMap((m) => ({ ...m, [active]: idx })),
    [active],
  )

  // Close dropdown on outside click
  useEffect(() => {
    if (!showAll) return
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setShowAll(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [showAll])

  if (!menu.length) return null

  const cat = menu[active]
  const images = PHOTOS[cat.slug] ?? []
  const bgImage =
    images[imageIdx % images.length] || FALLBACK_IMAGES[active % FALLBACK_IMAGES.length]

  const prev = () => setActive((p) => (p === 0 ? menu.length - 1 : p - 1))
  const next = () => setActive((p) => (p === menu.length - 1 ? 0 : p + 1))

  return (
    <section id="menu" className="relative overflow-hidden bg-neutral-950">
      {/* Preload all images in a hidden div */}
      <div className="hidden" aria-hidden="true">
        {ALL_IMAGES.map((src) => (
          <Image key={src} src={src} alt="" width={1} height={1} priority />
        ))}
      </div>

      {/* Background image — fills the section */}
      <div className="absolute inset-0">
        <Image
          key={`bg-${bgImage}`}
          src={bgImage}
          alt=""
          fill
          className="object-cover scale-105 blur-xs brightness-[0.25] animate-menu-fade-in"
          sizes="100vw"
          priority
        />
      </div>

      <div className="relative z-10 py-8 md:py-10">
        <div className="container-site">
          {/* ── Header ── */}
          <div className="text-center mb-14">
            <div className="w-10 h-0.5 bg-brand mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">Our Menu</h2>
          </div>

          {/* ── Category Switcher ── */}
          <div ref={dropdownRef} className="relative flex items-center justify-center gap-6 mb-12">
            <button
              onClick={prev}
              aria-label="Previous category"
              className="size-10 rounded-full border border-white/20 grid place-items-center text-white/50 hover:text-white hover:border-white/50 hover:bg-white/5 transition-all"
            >
              <HiOutlineChevronLeft className="size-5" />
            </button>

            <button
              onClick={() => setShowAll((s) => !s)}
              className="text-center min-w-48 group cursor-pointer"
            >
              <h3 className="text-white text-xl md:text-2xl font-bold tracking-tight inline-flex items-center gap-2">
                {cat.category}
                <HiOutlineChevronDown
                  className={`size-4 text-white/40 group-hover:text-white/70 transition-transform duration-200 ${
                    showAll ? 'rotate-180' : ''
                  }`}
                />
              </h3>
              <p className="text-white/30 text-xs mt-1 tabular-nums">
                {active + 1} / {menu.length}
              </p>
            </button>

            <button
              onClick={next}
              aria-label="Next category"
              className="size-10 rounded-full border border-white/20 grid place-items-center text-white/50 hover:text-white hover:border-white/50 hover:bg-white/5 transition-all"
            >
              <HiOutlineChevronRight className="size-5" />
            </button>

            {/* Category dropdown */}
            {showAll && (
              <div className="absolute top-full mt-3 z-20 w-72 rounded-xl border border-white/10 bg-neutral-900/95 backdrop-blur-xl shadow-2xl">
                <ScrollArea className="h-80">
                  <div className="p-2">
                    {menu.map((c, i) => (
                      <button
                        key={c.slug}
                        onClick={() => {
                          setActive(i)
                          setShowAll(false)
                        }}
                        className={`w-full text-left px-4 py-2.5 rounded-lg text-sm transition-colors ${
                          i === active
                            ? 'bg-brand/15 text-brand font-semibold'
                            : 'text-white/60 hover:text-white hover:bg-white/5'
                        }`}
                      >
                        {c.category}
                      </button>
                    ))}
                  </div>
                </ScrollArea>
              </div>
            )}
          </div>

          {/* ── Image Gallery + Menu Grid ── */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-start">
            {/* Image column — hidden on mobile, bg image covers instead */}
            <div className="hidden lg:block">
              <div className="relative lg:aspect-auto lg:h-full min-h-72 max-h-150 rounded-2xl overflow-hidden">
                <Image
                  key={`hero-${bgImage}`}
                  src={bgImage}
                  alt={cat.category}
                  fill
                  className="object-cover animate-menu-zoom-in"
                  sizes="(min-width: 1024px) 40vw, 100vw"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-black/20" />

                {/* Image nav dots — only when multiple images */}
                {images.length > 1 && (
                  <div className="absolute bottom-4 inset-x-0 flex justify-center gap-2">
                    {images.map((src) => (
                      <button
                        key={src}
                        onClick={() => setImageIdx(images.indexOf(src))}
                        aria-label={`View photo ${images.indexOf(src) + 1}`}
                        className={`h-1.5 rounded-full transition-all duration-300 ${
                          src === images[imageIdx % images.length]
                            ? 'w-6 bg-white'
                            : 'w-1.5 bg-white/40 hover:bg-white/60'
                        }`}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Menu items column */}
            <div className="flex flex-col">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 content-start">
                {cat.items.map((item) => {
                  const hasPromo = item.isPromo && item.promoPrice
                  const savedPct = hasPromo
                    ? Math.round(((item.price - item.promoPrice!) / item.price) * 100)
                    : 0

                  return (
                    <div
                      key={item.name}
                      className={`group relative rounded-xl px-5 py-4 backdrop-blur-md transition-all duration-200 ${
                        hasPromo
                          ? 'bg-brand/10 border border-brand/20'
                          : 'bg-white/6 border border-white/8 hover:bg-white/10'
                      }`}
                    >
                      {/* Promo tag */}
                      {hasPromo && (
                        <span className="absolute -top-2 right-3 inline-flex items-center gap-1 rounded-full bg-brand px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-white">
                          <HiOutlineSparkles className="size-2.5" />
                          {savedPct}% off
                        </span>
                      )}

                      <div className="flex items-start justify-between gap-3">
                        <span className="text-sm font-medium text-white/80 leading-snug group-hover:text-white transition-colors">
                          {item.name}
                        </span>

                        {hasPromo ? (
                          <div className="shrink-0 text-right">
                            <span className="block text-[10px] text-white/25 line-through tabular-nums">
                              {item.price.toLocaleString()}
                            </span>
                            <span className="block text-sm font-bold text-brand tabular-nums">
                              {item.promoPrice!.toLocaleString()}
                            </span>
                          </div>
                        ) : (
                          <span className="shrink-0 text-sm font-bold text-brand tabular-nums">
                            {item.price.toLocaleString()}
                          </span>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>

              <p className="text-[11px] text-white/15 mt-auto pt-8 text-center lg:text-left tracking-wide">
                All prices in KES · Inclusive of 16% VAT &amp; 2% Catering Levy
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
