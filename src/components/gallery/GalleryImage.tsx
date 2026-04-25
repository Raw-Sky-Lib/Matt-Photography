import Image from 'next/image'
import type { GalleryImage as GalleryImageType } from '@/types/content'

interface Props {
  image: GalleryImageType
  onClick?: (image: GalleryImageType) => void
}

export default function GalleryImage({ image, onClick }: Props) {
  return (
    <div
      onClick={() => onClick?.(image)}
      className="relative aspect-[4/3] overflow-hidden rounded-lg bg-[var(--color-surface)] cursor-pointer group"
    >
      <Image
        src={image.image_url}
        alt={image.alt_text}
        fill
        className="object-cover transition-all duration-300 group-hover:brightness-90"
        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        {...(image.width && image.height
          ? {}
          : {})}
      />
    </div>
  )
}
