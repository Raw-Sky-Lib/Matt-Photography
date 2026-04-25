import type { MetadataRoute } from 'next'
import { getProjectSlugs, getCategories, getPostSlugs } from '@/lib/queries'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://mattbanton.com'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [projectSlugs, categories, postSlugs] = await Promise.all([
    getProjectSlugs(),
    getCategories(),
    getPostSlugs(),
  ])

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE_URL, priority: 1.0, changeFrequency: 'weekly' },
    { url: `${BASE_URL}/projects`, priority: 0.8, changeFrequency: 'weekly' },
    { url: `${BASE_URL}/gallery`, priority: 0.8, changeFrequency: 'weekly' },
    { url: `${BASE_URL}/about`, priority: 0.6, changeFrequency: 'monthly' },
    { url: `${BASE_URL}/journal`, priority: 0.7, changeFrequency: 'weekly' },
    { url: `${BASE_URL}/contact`, priority: 0.5, changeFrequency: 'monthly' },
  ]

  const projectRoutes: MetadataRoute.Sitemap = projectSlugs.map((slug) => ({
    url: `${BASE_URL}/projects/${slug}`,
    priority: 0.7,
    changeFrequency: 'monthly',
  }))

  const categoryRoutes: MetadataRoute.Sitemap = categories.map((cat) => ({
    url: `${BASE_URL}/gallery/${cat.slug}`,
    priority: 0.7,
    changeFrequency: 'monthly',
  }))

  const postRoutes: MetadataRoute.Sitemap = postSlugs.map((slug) => ({
    url: `${BASE_URL}/journal/${slug}`,
    priority: 0.6,
    changeFrequency: 'monthly',
  }))

  return [...staticRoutes, ...projectRoutes, ...categoryRoutes, ...postRoutes]
}
