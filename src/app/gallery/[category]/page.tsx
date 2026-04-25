import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getGalleryImages, getCategories, getCategoryBySlug } from '@/lib/queries'
import GalleryCategoryNav from '@/components/gallery/GalleryCategoryNav'
import GalleryGridClient from '@/components/gallery/GalleryGridClient'

export const revalidate = 3600

export async function generateStaticParams() {
  const categories = await getCategories()
  return categories.map((cat) => ({ category: cat.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>
}): Promise<Metadata> {
  const { category } = await params
  const cat = await getCategoryBySlug(category)
  return {
    title: cat?.name ?? 'Gallery',
    description: `${cat?.name ?? 'Photography'} by Matt Banton.`,
  }
}

export default async function GalleryCategoryPage({
  params,
}: {
  params: Promise<{ category: string }>
}) {
  const { category } = await params
  const [images, categories, cat] = await Promise.all([
    getGalleryImages(category),
    getCategories(),
    getCategoryBySlug(category),
  ])
  if (!cat) notFound()

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
      <GalleryCategoryNav categories={categories} />
      <GalleryGridClient images={images} />
    </div>
  )
}
