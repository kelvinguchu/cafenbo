import { getMenu } from '@/lib/getMenu'

export const revalidate = 300

export async function GET() {
  try {
    const menu = await getMenu()

    return Response.json(
      { menu },
      {
        headers: {
          'Cache-Control': `public, s-maxage=${revalidate}, stale-while-revalidate=86400`,
        },
      },
    )
  } catch {
    return Response.json({ message: 'Unable to load menu.' }, { status: 500 })
  }
}
