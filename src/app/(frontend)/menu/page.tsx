import { getMenu } from '@/lib/getMenu'
import { Metadata } from 'next'
import { FullMenu } from '@/components/menu/FullMenu'

export const metadata: Metadata = {
  title: 'Menu | Café NBO',
  description:
    'Explore the flavors of Café NBO, featuring fresh local ingredients and vibrant Nairobi flair.',
}

export default async function MenuPage() {
  const menu = await getMenu()

  return (
    <main>
      <FullMenu menu={menu} />
    </main>
  )
}
