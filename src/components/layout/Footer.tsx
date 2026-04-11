import Image from 'next/image'
import { FiFacebook, FiInstagram } from 'react-icons/fi'
import { FaTiktok, FaGoogle } from 'react-icons/fa'

const QUICK_LINKS = [
  { label: 'Home', href: '#' },
  { label: 'About', href: '#about' },
  { label: 'Menu', href: '#menu' },
  { label: 'Reserve', href: '#reservation' },
  { label: 'Contact', href: '#contact' },
]

const SOCIALS = [
  { label: 'Facebook', href: 'https://www.facebook.com/cafenbo', icon: FiFacebook },
  { label: 'Instagram', href: 'https://www.instagram.com/cafenbo/', icon: FiInstagram },
  { label: 'TikTok', href: 'https://www.tiktok.com/discover/cafe-nbo-kilimani', icon: FaTiktok },
  { label: 'Google', href: 'https://g.co/kgs/e5MQZBK', icon: FaGoogle },
]

export function Footer() {
  return (
    <footer className="bg-stone-50 text-stone-800 border-t border-stone-200">
      <div className="container-site py-12 md:py-16">
        <div className="mb-12">
          <Image
            src="/logo.png"
            alt="Café NBO"
            width={160}
            height={56}
            className="h-12 w-auto mb-4"
          />
          <p className="text-stone-500 max-w-md text-sm leading-relaxed">
            Born from a dream to create a space that combines the vibrancy of Nairobi with culinary
            artistry, Café NBO is more than a café.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-14">
          <div>
            <h4 className="text-xs font-bold tracking-[0.2em] uppercase text-brand mb-5">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {QUICK_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href.startsWith('#') ? `/${link.href}` : link.href}
                    className="text-sm text-stone-600 hover:text-brand transition-colors duration-300 cursor-pointer"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold tracking-[0.2em] uppercase text-brand mb-5">
              Opening Hours
            </h4>
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium text-stone-800">Monday — Friday</p>
                <p className="text-sm text-stone-500">7:00 AM — 11:00 PM</p>
              </div>
              <div>
                <p className="text-sm font-medium text-stone-800">Weekends &amp; Holidays</p>
                <p className="text-sm text-stone-500">8:00 AM — 10:00 PM</p>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold tracking-[0.2em] uppercase text-brand mb-5">
              Contact
            </h4>
            <div className="space-y-3 text-sm">
              <p className="text-stone-500">Chaka Place, Kilimani, Nairobi</p>
              <a
                href="tel:0708337077"
                className="block text-stone-600 hover:text-brand transition-colors cursor-pointer"
              >
                0708 337 077
              </a>
              <a
                href="mailto:Info@cafenbo.co.ke"
                className="block text-stone-600 hover:text-brand transition-colors cursor-pointer"
              >
                Info@cafenbo.co.ke
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold tracking-[0.2em] uppercase text-brand mb-5">
              Follow Us
            </h4>
            <div className="flex gap-3">
              {SOCIALS.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-9 h-9 flex items-center justify-center rounded-full border border-stone-200 bg-white text-stone-500 hover:text-brand hover:border-brand/40 shadow-sm hover:shadow transition-all duration-300 cursor-pointer"
                >
                  <social.icon size={16} />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-stone-400">
            © {new Date().getFullYear()} Café NBO. All rights reserved.
          </p>
          <p className="text-xs text-stone-400">
            Prices inclusive of 16% VAT &amp; 2% Catering Levy
          </p>
        </div>
      </div>
    </footer>
  )
}
