'use client'
import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import WipeButton from '@/components/ui/WipeButton'
import type { FeaturedWorkSection as FeaturedWorkSectionType, ProjectSummary } from '@/types/content'

const PLATES = [
  { bg: 'linear-gradient(165deg, #4a3b2e 0%, #2a1f16 45%, #120b07 100%)', glow: 'radial-gradient(ellipse 60% 45% at 35% 28%, rgba(255,198,142,0.22), transparent 60%)' },
  { bg: 'linear-gradient(160deg, #1c1a18 0%, #0a0908 60%, #060505 100%)', glow: 'radial-gradient(ellipse 45% 40% at 42% 30%, rgba(214,175,128,0.14), transparent 60%)' },
  { bg: 'linear-gradient(165deg, #3a4048 0%, #1e2227 50%, #0c0f12 100%)', glow: 'radial-gradient(ellipse 55% 50% at 70% 32%, rgba(188,210,228,0.18), transparent 65%)' },
  { bg: 'linear-gradient(170deg, #6a4a2a 0%, #3a2514 50%, #1a0e07 100%)', glow: 'radial-gradient(ellipse 65% 50% at 30% 25%, rgba(255,190,110,0.35), transparent 60%)' },
  { bg: 'linear-gradient(155deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)', glow: 'radial-gradient(ellipse 50% 40% at 60% 35%, rgba(100,149,237,0.15), transparent 60%)' },
  { bg: 'linear-gradient(170deg, #1a0a0a 0%, #3d1010 50%, #2a0808 100%)', glow: 'radial-gradient(ellipse 55% 45% at 40% 30%, rgba(220,100,100,0.12), transparent 60%)' },
]

interface Props {
  data: FeaturedWorkSectionType
  projects: ProjectSummary[]
}

export default function FeaturedWorkSection({ data, projects }: Props) {
  const [hover, setHover] = useState<number | null>(null)
  const items = projects.slice(0, 6)

  if (!items.length) return null

  return (
    <section style={{ background: '#fff', borderTop: '1px solid var(--fg-1)' }}>

      {/* Header */}
      <div className="px-6 md:px-12 pt-16 md:pt-20 pb-10 md:pb-12 flex flex-col md:flex-row md:items-end gap-6 md:gap-12">
        <div className="flex-1">
          <h2 style={{
            fontFamily: 'var(--font-display)', fontWeight: 500,
            fontSize: 'clamp(40px,6.5vw,104px)', lineHeight: 1.04,
            letterSpacing: '-0.02em', textTransform: 'uppercase',
            color: 'var(--fg-1)', margin: 0,
          }}>
            {data.headline}
          </h2>
          {data.subheadline && (
            <p style={{
              marginTop: 16, fontFamily: 'var(--font-sans)', fontSize: 16,
              lineHeight: 1.55, color: 'var(--fg-3)', maxWidth: '44ch', margin: '16px 0 0',
            }}>
              {data.subheadline}
            </p>
          )}
        </div>
        <div>
          <WipeButton href="/projects" variant="ghost">
            View All Work
          </WipeButton>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 px-6 md:px-12">
        {items.map((project, i) => {
          const plate = PLATES[i % PLATES.length]
          const isHover = hover === i

          return (
            <Link
              key={project.id}
              href={project.slug ? `/projects/${project.slug}` : '/projects'}
              onMouseEnter={() => setHover(i)}
              onMouseLeave={() => setHover(null)}
              style={{ textDecoration: 'none', display: 'block', cursor: 'pointer' }}
            >
              {/* Photo */}
              <div style={{ position: 'relative', width: '100%', aspectRatio: '3/4', overflow: 'hidden' }}>
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
                <div style={{
                  position: 'absolute', top: 16, left: 16, zIndex: 2,
                  fontFamily: 'var(--font-mono)', fontSize: 10,
                  letterSpacing: '0.12em', color: 'rgba(255,255,255,0.75)',
                }}>
                  {String(i + 1).padStart(2, '0')}
                </div>
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
                    transform: isHover ? 'translateX(6px)' : 'none',
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
                    transform: isHover ? 'translate(3px,-3px)' : 'none',
                    transition: 'transform 320ms var(--ease-std)',
                  }}
                >
                  <path d="M7 17 17 7M7 7h10v10"/>
                </svg>
              </div>
            </Link>
          )
        })}
      </div>

      <div className="pb-24 md:pb-28"/>
    </section>
  )
}
