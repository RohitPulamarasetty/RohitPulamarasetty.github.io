import type { MetadataRoute } from 'next'

export const dynamic = 'force-static'

const BUILD_DATE = new Date()

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://rohitpulamarasetty.github.io'
  return [
    {
      url: base,
      lastModified: BUILD_DATE,
      changeFrequency: 'monthly',
      priority: 1,
    },
  ]
}
