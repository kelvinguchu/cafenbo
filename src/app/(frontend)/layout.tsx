import React from 'react'
import { Montserrat } from 'next/font/google'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import './styles.css'

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  display: 'swap',
})

export const metadata = {
  title: 'Café NBO — A Symphony of Flavors in the Heart of Nairobi',
  description:
    'Experience Nairobi\'s vibrant culinary scene at Café NBO, Chaka Place Kilimani. From charcoal-oven pizzas to Swahili biryani and classic English breakfasts — where culture meets cuisine.',
  openGraph: {
    title: 'Café NBO — A Symphony of Flavors in the Heart of Nairobi',
    description:
      'Experience Nairobi\'s vibrant culinary scene at Café NBO, Chaka Place Kilimani.',
    url: 'https://cafenbo.co.ke',
    siteName: 'Café NBO',
    type: 'website',
  },
}

export default async function RootLayout(props: Readonly<{ children: React.ReactNode }>) {
  const { children } = props

  return (
    <html lang="en">
      <body className={montserrat.className}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
}
