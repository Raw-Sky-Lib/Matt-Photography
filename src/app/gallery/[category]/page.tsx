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
    description: `${cat?.name ?? 'Photography'} — portrait and editorial photography.`,
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
    <div>
      {/* Page header */}
      <div
        className="px-6 md:px-12"
        style={{
          paddingTop: 'clamp(80px, 12vw, 140px)',
          paddingBottom: 'clamp(48px, 6vw, 72px)',
          borderBottom: '0.5px solid var(--fg-5)',
        }}
      >
        <div style={{
          fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 600,
          letterSpacing: '0.2em', textTransform: 'uppercase',
          color: 'var(--fg-4)', marginBottom: 20,
        }}>
          Photography
        </div>
        <h1 style={{
          fontFamily: 'var(--font-display)', fontWeight: 500,
          fontSize: 'clamp(44px, 7vw, 96px)', lineHeight: 0.96,
          letterSpacing: '-0.03em', textTransform: 'uppercase',
          color: 'var(--fg-1)', margin: 0,
        }}>
          {cat.name}.
        </h1>
      </div>

      {/* Category nav */}
      <GalleryCategoryNav categories={categories} />

      {/* Grid */}
      <GalleryGridClient images={images} />
    </div>
  )
}
