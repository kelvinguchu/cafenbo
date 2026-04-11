import { Hero } from '@/components/home/Hero'
import { About } from '@/components/home/About'
import { VisualMenu } from '@/components/home/VisualMenu'
import { WhyUs } from '@/components/home/WhyUs'
import { Reservation } from '@/components/home/Reservation'
import { Contact } from '@/components/home/Contact'
import { getMenu } from '@/lib/getMenu'

export default async function HomePage() {
  const menu = await getMenu()

  return (
    <>
      <Hero />
      <VisualMenu menu={menu} />
      <About />
      <WhyUs />
      <Reservation />
      <Contact />
    </>
  )
}
