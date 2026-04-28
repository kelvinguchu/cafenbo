'use client'

import Image from 'next/image'
import { useEffect, useState, useCallback } from 'react'

type MealPeriod = 'breakfast' | 'brunch' | 'lunch' | 'dinner'

function getMealPeriod(): MealPeriod {
  // Use Nairobi time (EAT, UTC+3)
  const now = new Date()
  const nairobiHour = new Date(
    now.toLocaleString('en-US', { timeZone: 'Africa/Nairobi' }),
  ).getHours()

  if (nairobiHour >= 6 && nairobiHour < 11) return 'breakfast'
  if (nairobiHour >= 11 && nairobiHour < 14) return 'brunch'
  if (nairobiHour >= 14 && nairobiHour < 18) return 'lunch'
  return 'dinner'
}

const MEAL_IMAGES: Record<MealPeriod, string[]> = {
  breakfast: [
    '/images-webp/breakfast3.webp',
    '/images-webp/pancakes-and-coffee.webp',
    '/images-webp/yoghurt-fruit-bowl.webp',
    '/images-webp/breakfast6.webp',
    '/images-webp/pancakes.webp',
    '/images-webp/yoghurt-fruit-bowl-2.webp',
    '/images-webp/breakfast4.webp',
  ],
  brunch: [
    '/images-webp/brunch.webp',
    '/images-webp/pancakes-and-coffee.webp',
    '/images-webp/breakfast3.webp',
    '/images-webp/breakfast4.webp',
    '/images-webp/yoghurt-fruit-bowl-2.webp',
    '/images-webp/breakfast2.webp',
  ],
  lunch: [
    '/images-webp/lunch.webp',
    '/images-webp/rice-chicken-tray.webp',
    '/images-webp/sandwiches.webp',
    '/images-webp/pasta.webp',
    '/images-webp/cobb-salad.webp',
    '/images-webp/wings.webp',
  ],
  dinner: [
    '/images-webp/pizza.webp',
    '/images-webp/burgers.webp',
    '/images-webp/pasta-2.webp',
    '/images-webp/clay-pot-rice.webp',
    '/images-webp/wings-2.webp',
    '/images-webp/starters.webp',
  ],
}

function HeroImageSlider({ images, altBase }: { images: string[]; altBase: string }) {
  const [current, setCurrent] = useState(0)

  const next = useCallback(() => {
    setCurrent((i) => (i + 1) % images.length)
  }, [images.length])

  useEffect(() => {
    if (images.length <= 1) return
    const interval = setInterval(next, 10000)
    return () => clearInterval(interval)
  }, [next, images.length])

  return (
    <>
      {images.map((src, i) => (
        <Image
          key={src}
          src={src}
          alt={`${altBase} — slide ${i + 1}`}
          fill
          className={`object-cover object-center transition-opacity duration-1000 ease-in-out ${
            i === current ? 'opacity-100 z-1' : 'opacity-0 z-0'
          }`}
          priority={i === 0}
          quality={90}
        />
      ))}
    </>
  )
}

function BreakfastHero() {
  return (
    <section id="hero" className="relative h-svh min-h-125 flex items-center overflow-hidden">
      <HeroImageSlider images={MEAL_IMAGES.breakfast} altBase="Breakfast at Café NBO" />
      <div className="absolute inset-0 bg-linear-to-r from-black/80 via-black/40 to-transparent" />
      <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent" />

      <div className="container-site relative z-10 w-full h-full flex flex-col justify-end pb-16 items-start text-left">
        <div className="max-w-2xl bg-black/40 backdrop-blur-md rounded-3xl p-6 md:p-10 border border-white/10">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight text-white mb-4 drop-shadow-md">
            Rise & <span className="text-brand">Shine</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/90 font-light max-w-lg leading-relaxed mb-8">
            Start your day with a vibrant Nairobi breakfast tailored just for you.
          </p>
          <div className="flex gap-4">
            <a
              href="#menu"
              className="inline-block bg-brand/90 hover:bg-brand text-white font-medium px-10 py-4 rounded-full transition-colors duration-300 tracking-wide text-sm shadow-lg cursor-pointer"
            >
              Morning Menu
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

function BrunchHero() {
  return (
    <section id="hero" className="relative h-svh min-h-125 flex items-center overflow-hidden">
      <HeroImageSlider images={MEAL_IMAGES.brunch} altBase="Brunch at Café NBO" />
      <div className="absolute inset-0 bg-black/20" />
      <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-black/70" />

      <div className="container-site relative z-10 w-full h-full flex items-end pb-16 justify-start text-left">
        <div className="bg-black/30 backdrop-blur-md p-8 md:p-12 rounded-3xl shadow-2xl max-w-3xl border border-white/10">
          <h1 className="text-4xl md:text-6xl font-serif text-white mb-6 drop-shadow-lg">
            Brunch at <span className="italic text-brand">Café NBO</span>
          </h1>
          <p className="text-lg text-white/80 font-light mb-8 max-w-lg drop-shadow-sm">
            Light, airy, and utterly delicious. The perfect pause in your busy day.
          </p>
          <a
            href="#menu"
            className="inline-block bg-brand/90 hover:bg-brand text-white font-medium px-10 py-4 rounded-full transition-colors duration-300 tracking-wide text-sm shadow-lg cursor-pointer"
          >
            Discover Brunch
          </a>
        </div>
      </div>
    </section>
  )
}

function LunchHero() {
  return (
    <section id="hero" className="relative h-svh min-h-125 flex items-center overflow-hidden">
      <HeroImageSlider images={MEAL_IMAGES.lunch} altBase="Lunch at Café NBO" />

      <div className="absolute inset-0 bg-linear-to-r from-black/80 via-black/40 to-transparent" />

      <div className="container-site relative z-10 w-full h-full flex flex-col justify-end pb-16 items-start text-left">
        <div className="max-w-xl bg-black/40 backdrop-blur-md rounded-3xl p-6 md:p-10 border border-white/10">
          <h1 className="text-5xl md:text-7xl font-bold text-white uppercase tracking-tighter mb-4 leading-none drop-shadow-md">
            Power <br /> Your <br /> Lunch
          </h1>
          <div className="w-16 h-1 bg-brand mb-6 shadow-sm cursor-pointer" />
          <p className="text-lg text-white/90 mb-8 font-medium max-w-md">
            Bold moves require bold plates. Experience our signature lunchtime creations.
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href="https://glovoapp.com/ke/en/nairobi/cafe-nbo-nbo/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-brand/90 hover:bg-brand text-white font-medium px-10 py-4 rounded-full transition-colors duration-300 tracking-wide text-sm shadow-lg cursor-pointer"
            >
              Order Now
            </a>
            <a
              href="#menu"
              className="inline-block bg-white/90 hover:bg-white text-black font-medium px-10 py-4 rounded-full transition-colors duration-300 tracking-wide text-sm shadow-lg cursor-pointer"
            >
              Menu
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

function DinnerHero() {
  return (
    <section
      id="hero"
      className="relative h-svh min-h-125 flex flex-col justify-center overflow-hidden"
    >
      <HeroImageSlider images={MEAL_IMAGES.dinner} altBase="Dinner at Café NBO" />
      <div className="absolute inset-0 bg-black/40" />
      <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />

      <div className="container-site relative z-10 max-w-4xl mt-auto pb-24 mr-auto text-left">
        <div className="bg-black/40 backdrop-blur-md rounded-3xl p-6 md:p-10 border border-white/10 inline-block w-full">
          <h1 className="text-4xl md:text-6xl font-light tracking-[0.2em] text-white uppercase mb-6 drop-shadow-lg">
            Evening <span className="font-bold">Elegance</span>
          </h1>
          <p className="text-lg md:text-xl text-white/80 max-w-2xl mb-10">
            Wind down with soulful dining, ambient warmth, and a symphony of curated flavors.
          </p>
          <div className="flex flex-col sm:flex-row gap-6">
            <a
              href="#menu"
              className="inline-block bg-brand/90 hover:bg-brand text-white font-medium px-10 py-4 rounded-full transition-colors duration-300 tracking-wide text-sm shadow-lg cursor-pointer"
            >
              View Evening Menu
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export function Hero() {
  const [meal, setMeal] = useState<MealPeriod>('breakfast')
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    setMeal(getMealPeriod())
    setMounted(true)

    // Re-check every minute so the hero transitions if the user stays on the page
    const interval = setInterval(() => {
      setMeal(getMealPeriod())
    }, 60_000)

    return () => clearInterval(interval)
  }, [])

  if (!mounted) {
    return <section id="hero" className="relative h-svh min-h-125 bg-black" />
  }

  return (
    <>
      {meal === 'breakfast' && <BreakfastHero />}
      {meal === 'brunch' && <BrunchHero />}
      {meal === 'lunch' && <LunchHero />}
      {meal === 'dinner' && <DinnerHero />}
    </>
  )
}
