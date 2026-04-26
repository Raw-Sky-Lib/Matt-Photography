'use client'
import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import type { ProjectSummary } from '@/types/content'

const PLATES = [
  { bg: 'linear-gradient(165deg, #4a3b2e 0%, #2a1f16 45%, #120b07 100%)', glow: 'radial-gradient(ellipse 60% 45% at 35% 28%, rgba(255,198,142,0.22), transparent 60%)' },
  { bg: 'linear-gradient(160deg, #1c1a18 0%, #0a0908 60%, #060505 100%)', glow: 'radial-gradient(ellipse 45% 40% at 42% 30%, rgba(214,175,128,0.14), transparent 60%)' },
  { bg: 'linear-gradient(165deg, #3a4048 0%, #1e2227 50%, #0c0f12 100%)', glow: 'radial-gradient(ellipse 55% 50% at 70% 32%, rgba(188,210,228,0.18), transparent 65%)' },
  { bg: 'linear-gradient(170deg, #6a4a2a 0%, #3a2514 50%, #1a0e07 100%)', glow: 'radial-gradient(ellipse 65% 50% at 30% 25%, rgba(255,190,110,0.35), transparent 60%)' },
  { bg: 'linear-gradient(155deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)', glow: 'radial-gradient(ellipse 50% 40% at 60% 35%, rgba(100,149,237,0.15), transparent 60%)' },
  { bg: 'linear-gradient(170deg, #1a0a0a 0%, #3d1010 50%, #2a0808 100%)', glow: 'radial-gradient(ellipse 55% 45% at 40% 30%, rgba(220,100,100,0.12), transparent 60%)' },
]

interface Props {
  project: ProjectSummary
  index?: number
}

export default function ProjectCard({ project, index = 0 }: Props) {
  const [hover, setHover] = useState(false)
  const plate = PLATES[index % PLATES.length]

  return (
    <Link
      href={`/projects/${project.slug}`}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{ textDecoration: 'none', display: 'block', cursor: 'pointer' }}
    >
      {/* Cover image */}
      <div style={{ position: 'relative', width: '100%', aspectRatio: '3/4', overflow: 'hidden' }}>

        {/* Image with zoom */}
        <div style={{
          position: 'absolute', inset: 0,
          transform: hover ? 'scale(1.05)' : 'scale(1)',
          transition: 'transform 600ms cubic-bezier(0.2,0,0.2,1)',
        }}>
          {project.cover_image_url ? (
            <Image
              src={project.cover_image_url}
              alt={project.title}
              fill
              style={{ objectFit: 'cover' }}
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          ) : (
            <>
              <div style={{ position: 'absolute', inset: 0, background: plate.bg }}/>
              <div style={{ position: 'absolute', inset: 0, background: plate.glow }}/>
              <div style={{
                position: 'absolute', inset: 0, pointerEvents: 'none', opacity: 0.35,
                backgroundImage: 'radial-gradient(rgba(255,255,255,0.06) 0.5px, transparent 0.8px)',
                backgroundSize: '3px 3px', mixBlendMode: 'overlay',
              }}/>
              <div style={{
                position: 'absolute', inset: 0,
                background: 'radial-gradient(ellipse at 50% 50%, transparent 50%, rgba(0,0,0,0.42) 100%)',
              }}/>
            </>
          )}
        </div>

        {/* Index label */}
        <div style={{
          position: 'absolute', top: 16, left: 16, zIndex: 2,
          fontFamily: 'var(--font-mono)', fontSize: 10,
          letterSpacing: '0.12em', color: 'rgba(255,255,255,0.75)',
        }}>
          {String(index + 1).padStart(2, '0')}
        </div>

        {/* Slide-up panel */}
        {project.subtitle && (
          <div style={{
            position: 'absolute', inset: 0, zIndex: 3,
            display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
            pointerEvents: 'none',
          }}>
            <div style={{
              background: 'rgba(255,255,255,0.96)',
              borderTop: '1px solid rgba(0,0,0,0.08)',
              padding: '20px 22px 24px',
              transform: hover ? 'translateY(0)' : 'translateY(101%)',
              transition: 'transform 420ms cubic-bezier(0.2,0,0.2,1)',
            }}>
              <div style={{
                display: 'flex', alignItems: 'center', gap: 10,
                fontFamily: 'var(--font-mono)', fontSize: 9,
                letterSpacing: '0.16em', textTransform: 'uppercase',
                color: 'rgba(0,0,0,0.35)', marginBottom: 12,
              }}>
                {project.category?.name && <span>{project.category.name}</span>}
                {project.category?.name && project.year && <span style={{ opacity: 0.4 }}>·</span>}
                {project.year && <span>{project.year}</span>}
              </div>
              <p style={{
                fontFamily: 'var(--font-sans)', fontSize: 14,
                lineHeight: 1.6, color: 'rgba(0,0,0,0.75)',
                margin: '0 0 16px',
              }}>
                {project.subtitle}
              </p>
              <div style={{
                display: 'flex', alignItems: 'center', gap: 6,
                fontFamily: 'var(--font-mono)', fontSize: 9,
                letterSpacing: '0.14em', textTransform: 'uppercase',
                color: 'rgba(0,0,0,0.35)',
              }}>
                <span>View project</span>
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M13 6l6 6-6 6"/>
                </svg>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Caption */}
      <div style={{
        padding: '20px 0 24px',
        display: 'grid', gridTemplateColumns: '1fr auto',
        alignItems: 'center', gap: 16,
      }}>
        <div>
          <div style={{
            fontFamily: 'var(--font-display)', fontWeight: 500,
            fontSize: 'clamp(15px, 1.5vw, 22px)', lineHeight: 1.08,
            letterSpacing: '-0.01em', textTransform: 'uppercase',
            color: 'var(--fg-1)',
            transform: hover ? 'translateX(6px)' : 'none',
            transition: 'transform 320ms var(--ease-std)',
          }}>
            {project.title}
          </div>
          <div style={{
            marginTop: 6, display: 'flex', gap: 12,
            fontFamily: 'var(--font-mono)', fontSize: 10,
            letterSpacing: '0.1em', color: 'var(--fg-4)',
          }}>
            {project.category?.name && <span>{project.category.name}</span>}
            {project.year && <span>{project.year}</span>}
          </div>
        </div>
        <svg
          width="18" height="18" viewBox="0 0 24 24"
          fill="none" stroke="currentColor" strokeWidth="1.5"
          strokeLinecap="round" strokeLinejoin="round"
          style={{
            color: 'var(--fg-1)', flexShrink: 0,
            transform: hover ? 'translate(3px,-3px)' : 'none',
            transition: 'transform 320ms var(--ease-std)',
          }}
        >
          <path d="M7 17 17 7M7 7h10v10"/>
        </svg>
      </div>
    </Link>
  )
}
