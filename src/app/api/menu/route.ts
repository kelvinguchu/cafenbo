export { MENU_REVALIDATE_SECONDS as revalidate } from '@/lib/getMenu'
import { MENU_REVALIDATE_SECONDS, getMenu } from '@/lib/getMenu'

export async function GET() {
  try {
    const menu = await getMenu()

    return Response.json(
      { menu },
      {
        headers: {
          'Cache-Control': `public, s-maxage=${MENU_REVALIDATE_SECONDS}, stale-while-revalidate=86400`,
        },
      },
    )
  } catch {
    return Response.json({ message: 'Unable to load menu.' }, { status: 500 })
  }
}
