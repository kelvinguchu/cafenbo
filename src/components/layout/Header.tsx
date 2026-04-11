'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'

const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/#about' },
  { label: 'Menu', href: '/menu' },
  { label: 'Reserve', href: '/#reservation' },
  { label: 'Contact', href: '/#contact' },
]

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  let headerAppearanceClass = 'bg-transparent'

  if (mobileOpen) {
    headerAppearanceClass = 'bg-transparent shadow-none'
  } else if (scrolled) {
    headerAppearanceClass = 'bg-white/95 backdrop-blur-md shadow-sm'
  }

  const getFirstLineClass = (mobileOpen: boolean, scrolled: boolean) => {
    if (mobileOpen) return 'rotate-45 translate-y-2 bg-white'
    return scrolled ? 'bg-black' : 'bg-white'
  }

  const getSecondLineClass = (mobileOpen: boolean, scrolled: boolean) => {
    if (mobileOpen) return 'opacity-0'
    return scrolled ? 'bg-black' : 'bg-white'
  }

  const getThirdLineClass = (mobileOpen: boolean, scrolled: boolean) => {
    if (mobileOpen) return '-rotate-45 -translate-y-2 bg-white'
    return scrolled ? 'bg-black' : 'bg-white'
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${headerAppearanceClass}`}
      >
        <div className="container-site flex items-center justify-between h-16 md:h-20">
          <Link href="/" className="relative z-10 shrink-0">
            <Image
              src="/logo.png"
              alt="Café NBO"
              width={140}
              height={50}
              className={`h-10 md:h-12 w-auto transition-all duration-500 ${
                scrolled && !mobileOpen ? '' : 'brightness-0 invert'
              }`}
              priority
            />
          </Link>

          <nav className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className={`text-sm font-medium tracking-wide transition-colors duration-300 uppercase ${
                  scrolled ? 'text-black/60 hover:text-brand' : 'text-white/80 hover:text-white'
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <a
              href="https://glovoapp.com/ke/en/nairobi/cafe-nbo-nbo/"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-2 bg-brand hover:bg-brand-dark text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-colors duration-300 cursor-pointer"
            >
              Order Now
            </a>

            <button
              type="button"
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden relative z-10 w-10 h-10 flex flex-col items-center justify-center gap-1.5"
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
            >
              <span
                className={`block w-6 h-0.5 transition-all duration-300 ${getFirstLineClass(mobileOpen, scrolled)}`}
              />
              <span
                className={`block w-6 h-0.5 transition-all duration-300 ${getSecondLineClass(mobileOpen, scrolled)}`}
              />
              <span
                className={`block w-6 h-0.5 transition-all duration-300 ${getThirdLineClass(mobileOpen, scrolled)}`}
              />
            </button>
          </div>
        </div>
      </header>

      <div
        id="mobile-menu"
        className={`fixed inset-0 z-40 lg:hidden transition-opacity duration-500 ${
          mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        aria-hidden={!mobileOpen}
      >
        <div className="absolute inset-0 bg-black/95" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,49,49,0.18),transparent_35%)]" />
        <nav className="relative flex min-h-dvh flex-col items-center justify-center gap-8 px-6 pt-20">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="text-2xl font-semibold tracking-wider text-white/80 hover:text-brand transition-colors duration-300 uppercase cursor-pointer"
            >
              {link.label}
            </a>
          ))}
          <a
            href="https://glovoapp.com/ke/en/nairobi/cafe-nbo-nbo/"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 bg-brand hover:bg-brand-dark text-white text-lg font-semibold px-8 py-3 rounded-full transition-colors duration-300 cursor-pointer"
          >
            Order Now
          </a>
        </nav>
      </div>
    </>
  )
}
