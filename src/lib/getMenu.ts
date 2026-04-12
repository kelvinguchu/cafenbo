import { unstable_cache } from 'next/cache'
import { getPayload } from 'payload'
import config from '@payload-config'

export const MENU_REVALIDATE_SECONDS = 300

export type MenuItem = {
  name: string
  description?: string | null
  price: number
  promoPrice?: number | null
  isPromo: boolean
}

export type MenuCategory = {
  category: string
  slug: string
  image: string | null
  imageUrl: string | null
  items: MenuItem[]
}

const resolveServerOrigin = () => {
  const fallbackOrigin = 'http://localhost:3000'
  const configuredOrigin = process.env.NEXT_PUBLIC_SERVER_URL?.trim()

  if (!configuredOrigin) return fallbackOrigin

  try {
    return new URL(configuredOrigin).origin
  } catch {
    return fallbackOrigin
  }
}

const toImagePath = (imageName: string | null | undefined) => {
  if (!imageName) return null

  const normalizedImageName = imageName.replace(/^\/+/, '')

  return `/images-webp/${normalizedImageName}`
}

const toImageUrl = (imageName: string | null | undefined) => {
  const imagePath = toImagePath(imageName)

  if (!imagePath) return null

  return new URL(imagePath, resolveServerOrigin()).toString()
}

const loadMenu = async (): Promise<MenuCategory[]> => {
  const payload = await getPayload({ config })

  const [categories, items] = await Promise.all([
    payload.find({
      collection: 'menu-categories',
      sort: 'sortOrder',
      limit: 100,
      depth: 0,
      overrideAccess: false,
    }),
    payload.find({
      collection: 'menu-items',
      where: {
        available: { equals: true },
      },
      sort: 'sortOrder',
      limit: 500,
      depth: 0,
      overrideAccess: false,
    }),
  ])

  const itemsByCategory = new Map<string, MenuItem[]>()

  for (const item of items.docs) {
    const categoryId = typeof item.category === 'string' ? item.category : item.category?.id

    if (!categoryId) continue

    const categoryItems = itemsByCategory.get(categoryId) ?? []

    categoryItems.push({
      name: item.name,
      description: item.description ?? null,
      price: item.price,
      promoPrice: item.promoPrice ?? null,
      isPromo: item.isPromo ?? false,
    })

    itemsByCategory.set(categoryId, categoryItems)
  }

  return categories.docs
    .map((category) => ({
      category: category.name,
      slug: category.slug || '',
      image: toImagePath(category.image),
      imageUrl: toImageUrl(category.image),
      items: itemsByCategory.get(category.id) ?? [],
    }))
    .filter((category) => category.items.length > 0)
}

export const getMenu = unstable_cache(loadMenu, ['public-menu'], {
  revalidate: MENU_REVALIDATE_SECONDS,
})
