import { getPayload } from 'payload'
import config from '@payload-config'

export type MenuItem = {
  name: string
  price: number
  promoPrice?: number | null
  isPromo?: boolean | null
}

export type MenuCategory = {
  category: string
  slug: string
  image: string | null
  items: MenuItem[]
}

export async function getMenu(): Promise<MenuCategory[]> {
  const payload = await getPayload({ config })

  const categories = await payload.find({
    collection: 'menu-categories',
    sort: 'sortOrder',
    limit: 100,
    depth: 0,
  })

  const menu: MenuCategory[] = []

  for (const cat of categories.docs) {
    const items = await payload.find({
      collection: 'menu-items',
      where: {
        and: [
          { category: { equals: cat.id } },
          { available: { equals: true } },
        ],
      },
      sort: 'sortOrder',
      limit: 200,
      depth: 0,
    })

    menu.push({
      category: cat.name,
      slug: cat.slug || '',
      image: cat.image ? `/images-webp/${cat.image}` : null,
      items: items.docs.map((item) => ({
        name: item.name,
        price: item.price,
        promoPrice: item.promoPrice ?? null,
        isPromo: item.isPromo ?? false,
      })),
    })
  }

  return menu
}
