'use client'
import { useEffect } from 'react'
import Image from 'next/image'
import type { GalleryImage } from '@/types/content'

interface Props {
  images: GalleryImage[]
  currentIndex: number
  onClose: () => void
  onPrev: () => void
  onNext: () => void
}

export default function LightboxViewer({ images, currentIndex, onClose, onPrev, onNext }: Props) {
  const image = images[currentIndex]

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') onPrev()
      if (e.key === 'ArrowRight') onNext()
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [onClose, onPrev, onNext])

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  return (
    <div
      style={{ position: 'fixed', inset: 0, zIndex: 50, background: 'rgba(0,0,0,0.95)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      onClick={onClose}
    >
      {/* Counter */}
      <div style={{
        position: 'absolute', top: 24, left: '50%', transform: 'translateX(-50%)',
        fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.16em',
        color: 'rgba(255,255,255,0.4)',
      }}>
        {String(currentIndex + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}
      </div>

      {/* Close */}
      <button
        onClick={onClose}
        aria-label="Close"
        style={{
          position: 'absolute', top: 20, right: 24,
          background: 'none', border: 'none', cursor: 'pointer',
          color: 'rgba(255,255,255,0.5)', padding: 4,
          transition: 'color 200ms',
        }}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
          <path d="M18 6 6 18M6 6l12 12"/>
        </svg>
      </button>

      {/* Prev */}
      {currentIndex > 0 && (
        <button
          onClick={(e) => { e.stopPropagation(); onPrev() }}
          aria-label="Previous"
          style={{
            position: 'absolute', left: 24, top: '50%', transform: 'translateY(-50%)',
            background: 'none', border: 'none', cursor: 'pointer',
            color: 'rgba(255,255,255,0.5)', padding: 8,
            transition: 'color 200ms',
          }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 5l-7 7 7 7"/>
          </svg>
        </button>
      )}

      {/* Image */}
      <div
        style={{ position: 'relative', maxHeight: '90vh', maxWidth: '90vw', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={image.image_url}
          alt={image.alt_text}
          width={image.width ?? 1200}
          height={image.height ?? 800}
          style={{ objectFit: 'contain', maxHeight: '85vh', width: 'auto' }}
          priority
        />
      </div>

      {/* Next */}
      {currentIndex < images.length - 1 && (
        <button
          onClick={(e) => { e.stopPropagation(); onNext() }}
          aria-label="Next"
          style={{
            position: 'absolute', right: 24, top: '50%', transform: 'translateY(-50%)',
            background: 'none', border: 'none', cursor: 'pointer',
            color: 'rgba(255,255,255,0.5)', padding: 8,
            transition: 'color 200ms',
          }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </button>
      )}

      {/* Caption */}
      {image.title && (
        <div style={{
          position: 'absolute', bottom: 24, left: '50%', transform: 'translateX(-50%)',
          fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.12em',
          textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)',
        }}>
          {image.title}
        </div>
      )}
    </div>
  )
}
