'use client'

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import {
  HiOutlineChevronLeft,
  HiOutlineChevronRight,
  HiOutlineChevronDown,
  HiOutlineSparkles,
} from 'react-icons/hi2'
import { ScrollArea } from '@/components/ui/scroll-area'
import { MenuImagePreloader } from '@/components/menu/MenuImagePreloader'
import type { MenuCategory } from '@/lib/getMenu'

type Props = {
  menu: MenuCategory[]
}

const CATEGORY_IMAGES: Record<string, string> = {
  coffee: '/images-webp/coffee.webp',
  tea: '/images-webp/tea.webp',
  pastries: '/images-webp/pastries.webp',
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

const ALL_IMAGES = Array.from(new Set(Object.values(CATEGORY_IMAGES)))

export function VisualMenu({ menu }: Readonly<Props>) {
  const [active, setActive] = useState(0)
  const [showAll, setShowAll] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const validMenu = menu.filter((cat) => CATEGORY_IMAGES[cat.slug])

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

  if (!validMenu.length) return null

  const cat = validMenu[active] || validMenu[0]
  const bgImage = CATEGORY_IMAGES[cat.slug]

  const prev = () => setActive((p) => (p === 0 ? validMenu.length - 1 : p - 1))
  const next = () => setActive((p) => (p === validMenu.length - 1 ? 0 : p + 1))

  return (
    <section id="menu" className="relative overflow-hidden bg-slate-50">
      <MenuImagePreloader imageUrls={ALL_IMAGES} />

      <div className="relative z-10 py-8 md:py-12">
        <div className="container-site max-w-7xl">
          {/* ── Header ── */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl lg:text-7xl font-serif text-slate-900 mb-6 tracking-tight">
              A Taste of <span className="italic text-brand text-opacity-80">Elegance</span>
            </h2>
            <div className="w-16 h-1 bg-brand mx-auto opacity-80 cursor-pointer" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-stretch transition-all duration-800 ease-in-out">
            {/* ── Menu Categories & Items (Left Column) ── */}
            <div className="lg:col-span-7 flex flex-col h-full z-10 transition-all duration-800 ease-in-out">
              {/* Category Nav */}
              <div
                ref={dropdownRef}
                className="relative flex items-center justify-between mb-10 overflow-visible"
              >
                <button
                  onClick={prev}
                  aria-label="Previous category"
                  className="size-12 rounded-full border border-slate-200 grid place-items-center text-slate-400 hover:text-slate-800 hover:border-slate-300 hover:bg-white shadow-sm hover:shadow transition-all bg-white/50 cursor-pointer"
                >
                  <HiOutlineChevronLeft className="size-5" />
                </button>

                <button
                  onClick={() => setShowAll((s) => !s)}
                  className="flex flex-col items-center group cursor-pointer px-4 relative"
                >
                  <h3 className="text-slate-800 text-2xl md:text-3xl font-semibold tracking-tight flex items-center gap-2 mb-1">
                    {cat.category}
                    <HiOutlineChevronDown
                      className={`size-5 text-slate-400 group-hover:text-brand transition-transform duration-300 ${
                        showAll ? 'rotate-180 text-brand' : ''
                      }`}
                    />
                  </h3>
                  <div className="flex items-center gap-1.5 mt-1">
                    <span className="h-px w-6 bg-slate-300" />
                    <p className="text-slate-400 text-xs font-bold tracking-widest tabular-nums uppercase">
                      {active + 1} / {validMenu.length}
                    </p>
                    <span className="h-px w-6 bg-slate-300" />
                  </div>
                </button>

                <button
                  onClick={next}
                  aria-label="Next category"
                  className="size-12 rounded-full border border-slate-200 grid place-items-center text-slate-400 hover:text-slate-800 hover:border-slate-300 hover:bg-white shadow-sm hover:shadow transition-all bg-white/50 cursor-pointer"
                >
                  <HiOutlineChevronRight className="size-5" />
                </button>

                {/* Dropdown */}
                {showAll && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-4 z-50 w-72 rounded-2xl border border-slate-100 bg-white/95 backdrop-blur-xl shadow-2xl overflow-hidden ring-1 ring-black/5">
                    <ScrollArea className="h-75">
                      <div className="p-3">
                        {validMenu.map((c, i) => (
                          <button
                            key={c.slug}
                            onClick={() => {
                              setActive(i)
                              setShowAll(false)
                            }}
                            className={`w-full text-left px-5 py-3 rounded-xl text-sm transition-all duration-200 mb-1 ${
                              i === active
                                ? 'bg-brand/10 text-brand font-medium'
                                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
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

              {/* Items Grid */}
              <div className="grid grid-cols-1 items-start gap-x-8 gap-y-4">
                {cat.items.slice(0, 8).map((item) => {
                  const hasPromo = item.isPromo && item.promoPrice
                  const savedPct = hasPromo
                    ? Math.round(((item.price - item.promoPrice!) / item.price) * 100)
                    : 0

                  return (
                    <div
                      key={item.name}
                      className={`group relative flex items-baseline justify-between gap-4 py-3 border-b border-slate-200/60 last:border-0 transition-colors ${
                        hasPromo ? 'bg-amber-50/50 rounded-lg px-3 -mx-3 border-none shadow-sm' : ''
                      }`}
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-base text-slate-800 font-medium group-hover:text-brand transition-colors cursor-pointer">
                            {item.name}
                          </span>
                          {hasPromo && (
                            <span className="inline-flex items-center gap-1 rounded bg-amber-100 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-amber-700">
                              <HiOutlineSparkles className="size-3" />
                              {savedPct}%
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="shrink-0 flex flex-col items-end pt-0.5">
                        {hasPromo ? (
                          <>
                            <span className="text-xs text-slate-400 line-through tabular-nums -mb-1 block">
                              {item.price.toLocaleString()}
                            </span>
                            <span className="text-base font-bold text-brand tabular-nums block">
                              {item.promoPrice!.toLocaleString()}
                            </span>
                          </>
                        ) : (
                          <span className="text-base font-bold text-slate-900 tabular-nums">
                            {item.price.toLocaleString()}
                          </span>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>

              <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-6 border-t border-slate-200 pt-8">
                <p className="text-xs text-slate-400 font-medium tracking-wide uppercase text-center sm:text-left">
                  ALL PRICES KES • INC. 16% VAT & 2% LEVY
                </p>
                <a
                  href="/menu"
                  className="group inline-flex items-center justify-center gap-2 text-sm font-bold uppercase tracking-widest text-slate-900 border-b-2 border-slate-900 pb-1 hover:text-brand hover:border-brand transition-colors cursor-pointer"
                >
                  View Full Menu
                  <HiOutlineChevronRight className="size-4 group-hover:translate-x-1 transition-transform cursor-pointer" />
                </a>
              </div>
            </div>

            {/* ── Image Display (Right Column) ── */}
            <div className="lg:col-span-5 relative w-full min-h-87.5 md:min-h-125 h-full mt-8 lg:mt-0 lg:order-last order-first mb-4 lg:mb-0 transition-all duration-800 ease-in-out">
              <div className="absolute inset-0 rounded-[2rem] overflow-hidden shadow-xl ring-1 ring-black/5 transform rotate-2 hover:rotate-0 transition-all duration-800 cursor-pointer group">
                <Image
                  key={`hero-${bgImage}`}
                  src={bgImage}
                  alt={cat.category}
                  fill
                  className="object-cover object-center animate-menu-fade-in group-hover:scale-105 transition-transform duration-[2s] ease-out cursor-pointer"
                  sizes="(min-width: 1024px) 40vw, 100vw"
                />

                {/* Soft gradient overlay for elegance */}
                <div className="absolute inset-0 bg-linear-to-b from-black/10 via-transparent to-black/40 transition-opacity duration-700" />

                {/* Decorative borders */}
                <div className="absolute inset-4 rounded-[1.5rem] border border-white/20 pointer-events-none transition-all duration-700" />
              </div>

              {/* Backing shadow/shape element for depth */}
              <div className="absolute -inset-4 bg-brand/5 rounded-[3rem] -z-10 transform -rotate-3 blur-sm cursor-pointer transition-all duration-700" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
