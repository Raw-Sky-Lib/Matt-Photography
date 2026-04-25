import Image from 'next/image'
import type { GalleryImage as GalleryImageType } from '@/types/content'

interface Props {
  image: GalleryImageType
  onClick?: () => void
}

export default function GalleryImage({ image, onClick }: Props) {
  return (
    <div
      onClick={onClick}
      style={{ position: 'relative', aspectRatio: '3/4', overflow: 'hidden', cursor: 'pointer' }}
    >
      <Image
        src={image.image_url}
        alt={image.alt_text}
        fill
        style={{ objectFit: 'cover', transition: 'transform 500ms var(--ease-std)' }}
        sizes="(max-width: 768px) 50vw, 33vw"
        className="gallery-img"
      />
    </div>
  )
}
