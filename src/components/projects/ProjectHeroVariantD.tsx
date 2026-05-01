'use client'
import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'

interface Props {
  title: string
  category?: string | null
  year?: number | null
  coverImageUrl: string | null
  coverVideoUrl: string | null
  isVideoCover: boolean
}

export default function ProjectHeroVariantD({
  title, category, year, coverImageUrl, coverVideoUrl, isVideoCover,
}: Props) {
  const heroRef = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = heroRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting),
      { rootMargin: '-1px 0px 0px 0px', threshold: 0 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const meta = [category, year].filter(Boolean).join(' · ')

  return (
    <>
      {/* Sticky title bar */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 200,
        height: 52,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 clamp(24px, 4vw, 48px)',
        background: 'rgba(255,255,255,0.92)',
        backdropFilter: 'blur(18px)',
        WebkitBackdropFilter: 'blur(18px)',
        borderBottom: '1px solid var(--fg-5)',
        transform: visible ? 'translateY(0)' : 'translateY(-100%)',
        transition: 'transform 360ms cubic-bezier(0.2,0,0.2,1)',
        pointerEvents: visible ? 'auto' : 'none',
      }}>
        <span style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 500,
          fontSize: 13,
          letterSpacing: '-0.01em',
          textTransform: 'uppercase',
          color: 'var(--fg-1)',
        }}>
          {title}
        </span>
        {meta && (
          <span style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 9,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'var(--fg-4)',
          }}>
            {meta}
          </span>
        )}
      </div>

      {/* Hero */}
      <div ref={heroRef} style={{ width: '100%', background: '#0a0a0a', lineHeight: 0 }}>
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
          />
        ) : null}
      </div>
    </>
  )
}
