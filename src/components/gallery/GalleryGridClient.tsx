'use client'
import { useState } from 'react'
import type { GalleryImage } from '@/types/content'
import GalleryImageComponent from './GalleryImage'
import LightboxViewer from './LightboxViewer'

export default function GalleryGridClient({ images }: { images: GalleryImage[] }) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  if (!images.length) {
    return (
      <p className="text-[var(--color-text-muted)] text-center py-20">
        No images in this category yet.
      </p>
    )
  }

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {images.map((image, index) => (
          <GalleryImageComponent
            key={image.id}
            image={image}
            onClick={() => setLightboxIndex(index)}
          />
        ))}
      </div>

      {lightboxIndex !== null && (
        <LightboxViewer
          images={images}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onPrev={() => setLightboxIndex((i) => Math.max(0, (i ?? 0) - 1))}
          onNext={() => setLightboxIndex((i) => Math.min(images.length - 1, (i ?? 0) + 1))}
        />
      )}
    </>
  )
}
