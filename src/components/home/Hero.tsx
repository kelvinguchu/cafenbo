'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'

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

function BreakfastHero() {
  return (
    <section id="hero" className="relative h-svh min-h-125 flex items-center overflow-hidden">
      <Image
        src="/images-webp/breakfast3.webp"
        alt="Hearty breakfast skillet at Café NBO"
        fill
        className="object-cover object-center"
        priority
        quality={90}
      />
      <div className="absolute inset-0 bg-linear-to-r from-black/70 via-black/20 to-transparent" />
      <div className="absolute inset-0 bg-linear-to-t from-black/30 via-transparent to-transparent" />

      <div className="container-site relative z-10 w-full h-full flex flex-col justify-center items-start">
        <div className="max-w-2xl">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight text-white mb-4 drop-shadow-md">
            Rise & <span className="text-brand">Shine</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/90 font-light max-w-lg leading-relaxed mb-8 drop-shadow-sm">
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
      <Image
        src="/images-webp/brunch.webp"
        alt="Fresh brunch bowl at Café NBO"
        fill
        className="object-cover object-center"
        priority
        quality={90}
      />
      <div className="absolute inset-0 bg-black/20" />
      <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-black/70" />

      <div className="container-site relative z-10 w-full h-full flex items-center justify-center text-center">
        <div className="bg-black/30 backdrop-blur-md p-8 md:p-12 rounded-3xl shadow-2xl max-w-3xl border border-white/10">
          <h1 className="text-4xl md:text-6xl font-serif text-white mb-6 drop-shadow-lg">
            Brunch at <span className="italic text-brand">Café NBO</span>
          </h1>
          <p className="text-lg text-white/80 font-light mb-8 max-w-lg mx-auto drop-shadow-sm">
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
      <Image
        src="/images-webp/lunch.webp"
        alt="Stacked club sandwich with fries at Café NBO"
        fill
        className="object-cover object-center"
        priority
        quality={90}
      />

      <div className="absolute inset-0 bg-linear-to-r from-black/80 via-black/40 to-transparent" />

      <div className="container-site relative z-10 w-full h-full flex flex-col justify-center">
        <div className="max-w-xl">
          <h1 className="text-5xl md:text-7xl font-bold text-white uppercase tracking-tighter mb-4 leading-none drop-shadow-md">
            Power <br /> Your <br /> Lunch
          </h1>
          <div className="w-16 h-1 bg-brand mb-6 shadow-sm cursor-pointer" />
          <p className="text-lg text-white/90 mb-8 font-medium max-w-md drop-shadow-sm">
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
      className="relative h-svh min-h-125 flex flex-col justify-center overflow-hidden text-center"
    >
      <Image
        src="/images-webp/dinner.webp"
        alt="Vibrant dinner bowl at Café NBO"
        fill
        className="object-cover object-center"
        priority
        quality={90}
      />
      <div className="absolute inset-0 bg-black/40" />
      <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />

      <div className="container-site relative z-10 mx-auto max-w-4xl mt-auto pb-24">
        <h1 className="text-4xl md:text-6xl font-light tracking-[0.2em] text-white uppercase mb-6 drop-shadow-lg">
          Evening <span className="font-bold">Elegance</span>
        </h1>
        <p className="text-lg md:text-xl text-white/80 mx-auto max-w-2xl font-serif mb-10 drop-shadow-sm">
          Wind down with soulful dining, ambient warmth, and a symphony of curated flavors.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-6">
          <a
            href="#menu"
            className="inline-block bg-brand/90 hover:bg-brand text-white font-medium px-10 py-4 rounded-full transition-colors duration-300 tracking-wide text-sm shadow-lg cursor-pointer"
          >
            View Evening Menu
          </a>
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
