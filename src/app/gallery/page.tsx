import type { Metadata } from 'next'
import { getGalleryImages, getCategories, getSiteSettings } from '@/lib/queries'
import GalleryCategoryNav from '@/components/gallery/GalleryCategoryNav'
import GalleryGridClient from '@/components/gallery/GalleryGridClient'

export const revalidate = 3600

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings()
  return {
    title: `Gallery — ${settings.site_name}`,
    description: 'Portrait and editorial photography by Matt Banton.',
  }
}

export default async function GalleryPage() {
  const [images, categories] = await Promise.all([getGalleryImages(), getCategories()])

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
          Gallery.
        </h1>
      </div>

      {/* Category nav */}
      <GalleryCategoryNav categories={categories} />

      {/* Grid */}
      <GalleryGridClient images={images} />
    </div>
  )
}
