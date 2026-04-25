import type { Metadata } from 'next'
import { getGalleryImages, getCategories } from '@/lib/queries'
import GalleryCategoryNav from '@/components/gallery/GalleryCategoryNav'
import GalleryGridClient from '@/components/gallery/GalleryGridClient'

export const revalidate = 3600

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Gallery',
    description: 'Portrait and editorial photography by Matt Banton.',
  }
}

export default async function GalleryPage() {
  const [images, categories] = await Promise.all([getGalleryImages(), getCategories()])

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
      <GalleryCategoryNav categories={categories} />
      <GalleryGridClient images={images} />
    </div>
  )
}
