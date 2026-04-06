'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'

const NAV_LINKS = [
  { label: 'Home', href: '#' },
  { label: 'About', href: '#about' },
  { label: 'Menu', href: '#menu' },
  { label: 'Reserve', href: '#reservation' },
  { label: 'Contact', href: '#contact' },
]

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

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
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <div className="container-site flex items-center justify-between h-16 md:h-20">
        <Link href="/" className="relative z-10 shrink-0">
          <Image
            src="/logo.png"
            alt="Café NBO"
            width={140}
            height={50}
            className={`h-10 md:h-12 w-auto transition-all duration-500 ${
              scrolled ? '' : 'brightness-0 invert'
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
            className="hidden sm:inline-flex items-center gap-2 bg-brand hover:bg-brand-dark text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-colors duration-300"
          >
            Order Now
          </a>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden relative z-10 w-10 h-10 flex flex-col items-center justify-center gap-1.5"
            aria-label="Toggle menu"
          >
            <span
              className={`block w-6 h-0.5 transition-all duration-300 ${
                mobileOpen ? 'rotate-45 translate-y-2 bg-white' : scrolled ? 'bg-black' : 'bg-white'
              }`}
            />
            <span
              className={`block w-6 h-0.5 transition-all duration-300 ${
                mobileOpen ? 'opacity-0' : scrolled ? 'bg-black' : 'bg-white'
              }`}
            />
            <span
              className={`block w-6 h-0.5 transition-all duration-300 ${
                mobileOpen ? '-rotate-45 -translate-y-2 bg-white' : scrolled ? 'bg-black' : 'bg-white'
              }`}
            />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`fixed inset-0 bg-black/95 backdrop-blur-xl transition-all duration-500 lg:hidden flex flex-col items-center justify-center ${
          mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <nav className="flex flex-col items-center gap-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="text-2xl font-semibold tracking-wider text-white/80 hover:text-brand transition-colors duration-300 uppercase"
            >
              {link.label}
            </a>
          ))}
          <a
            href="https://glovoapp.com/ke/en/nairobi/cafe-nbo-nbo/"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 bg-brand hover:bg-brand-dark text-white text-lg font-semibold px-8 py-3 rounded-full transition-colors duration-300"
          >
            Order Now
          </a>
        </nav>
      </div>
    </header>
  )
}
