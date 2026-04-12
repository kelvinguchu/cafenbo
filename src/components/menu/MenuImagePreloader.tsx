'use client'

import { useEffect } from 'react'

type Props = {
  imageUrls: string[]
  delayMs?: number
}

export function MenuImagePreloader({ imageUrls, delayMs = 160 }: Readonly<Props>) {
  useEffect(() => {
    const uniqueUrls = Array.from(new Set(imageUrls)).filter(Boolean)

    if (!uniqueUrls.length) return

    const preloadedImages: HTMLImageElement[] = []
    const timeoutId = globalThis.setTimeout(() => {
      uniqueUrls.forEach((src) => {
        const image = new globalThis.Image()
        image.decoding = 'async'
        preloadedImages.push(image)
        image.src = src
      })
    }, delayMs)

    return () => {
      globalThis.clearTimeout(timeoutId)
      preloadedImages.forEach((image) => {
        image.src = ''
      })
    }
  }, [delayMs, imageUrls])

  return null
}
