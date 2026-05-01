'use client'
import { useEffect, useState } from 'react'
import Image from 'next/image'

interface Props {
  title: string
  category?: string | null
  year?: number | null
  coverImageUrl: string | null
  coverVideoUrl: string | null
  isVideoCover: boolean
}

export default function ProjectHero({
  title, category, year, coverImageUrl, coverVideoUrl, isVideoCover,
}: Props) {
  const [overlayVisible, setOverlayVisible] = useState(true)

  useEffect(() => {
    const onScroll = () => setOverlayVisible(window.scrollY < 80)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const meta = [category, year].filter(Boolean).join(' · ')

  return (
    <div style={{ position: 'relative', width: '100%', background: '#0a0a0a', lineHeight: 0 }}>
      {isVideoCover && coverVideoUrl?.startsWith('http') ? (
        <video
          src={coverVideoUrl}
          autoPlay muted loop playsInline
          style={{ width: '100%', height: 'auto', display: 'block' }}
        />
      ) : coverImageUrl ? (
        <Image
          src={coverImageUrl}
          alt={title}
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: '100%', height: 'auto', display: 'block' }}
          priority
        />
      ) : null}

      <div style={{
        position: 'absolute',
        bottom: 'clamp(28px, 4vw, 52px)',
        left: 'clamp(24px, 4vw, 48px)',
        zIndex: 2,
        pointerEvents: 'none',
        background: 'rgba(255,255,255,0.88)',
        backdropFilter: 'blur(14px)',
        WebkitBackdropFilter: 'blur(14px)',
        padding: 'clamp(14px, 2vw, 20px) clamp(16px, 2vw, 24px)',
        borderTop: '1px solid rgba(255,255,255,0.5)',
        opacity: overlayVisible ? 1 : 0,
        transform: overlayVisible ? 'translateY(0)' : 'translateY(16px)',
        transition: 'opacity 380ms cubic-bezier(0.2,0,0.2,1), transform 380ms cubic-bezier(0.2,0,0.2,1)',
      }}>
        <h2 style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 500,
          fontSize: 'clamp(22px, 3.5vw, 52px)',
          lineHeight: 0.96,
          letterSpacing: '-0.03em',
          textTransform: 'uppercase',
          color: 'var(--fg-1)',
          margin: 0,
        }}>
          {title}
        </h2>
        {meta && (
          <p style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 9,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: 'var(--fg-4)',
            margin: '8px 0 0',
          }}>
            {meta}
          </p>
        )}
      </div>
    </div>
  )
}
