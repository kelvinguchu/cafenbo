import type { Metadata } from 'next'
import React from 'react'
import { Raleway } from 'next/font/google'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import './styles.css'


const raleway = Raleway({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://cafenbo.co.ke'),
  title: 'Café NBO — A Symphony of Flavors in the Heart of Nairobi',
  description:
    "Experience Nairobi's vibrant culinary scene at Café NBO, Chaka Place Kilimani. From charcoal-oven pizzas to Swahili biryani and classic English breakfasts — where culture meets cuisine.",
  icons: {
    icon: '/favicon.png',
  },
  openGraph: {
    title: 'Café NBO — A Symphony of Flavors in the Heart of Nairobi',
    description: "Experience Nairobi's vibrant culinary scene at Café NBO, Chaka Place Kilimani.",
    url: 'https://cafenbo.co.ke',
    siteName: 'Café NBO',
    type: 'website',
    images: [
      {
        url: '/images-webp/breakfast2.webp',
        alt: 'Café NBO breakfast skillet',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Café NBO — A Symphony of Flavors in the Heart of Nairobi',
    description: "Experience Nairobi's vibrant culinary scene at Café NBO, Chaka Place Kilimani.",
    images: [
      {
        url: '/images-webp/breakfast2.webp',
        alt: 'Café NBO breakfast skillet',
      },
    ],
  },
}

export default async function RootLayout(props: Readonly<{ children: React.ReactNode }>) {
  const { children } = props

  return (
    <html lang="en">
      <body className={raleway.className}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
}
