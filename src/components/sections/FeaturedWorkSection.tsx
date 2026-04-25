'use client'
import { useState } from 'react'
import Link from 'next/link'
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

const PLACEHOLDER_PROJECTS: ProjectSummary[] = Array.from({ length: 6 }, (_, i) => ({
  id: String(i),
  slug: '',
  title: ['The Quiet Watch', 'Borderline', 'Still Life No. 4', 'Unnamed Series', 'Available Light', 'The Edit'][i],
  subtitle: null,
  cover_image_url: '',
  category_id: null,
  client_name: null,
  year: 2025 - i,
  is_featured: false,
  display_order: i,
}))

interface Props {
  data: FeaturedWorkSectionType
  projects: ProjectSummary[]
}

export default function FeaturedWorkSection({ data, projects }: Props) {
  const [hover, setHover] = useState<number | null>(null)
  const items = projects.length > 0 ? projects.slice(0, 6) : PLACEHOLDER_PROJECTS

  return (
    <section style={{ background: '#fff', borderTop: '1px solid var(--fg-1)' }}>

      {/* Header */}
      <div style={{
        padding: '80px 48px 48px',
        display: 'grid', gridTemplateColumns: '1fr auto',
        alignItems: 'flex-end', gap: 48,
      }}>
        <div>
          <h2 style={{
            fontFamily: 'var(--font-display)', fontWeight: 500,
            fontSize: 'clamp(48px,6.5vw,104px)', lineHeight: 1.04,
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
        <div style={{ paddingBottom: 6 }}>
          <WipeButton href="/projects" variant="ghost">
            View All Work
          </WipeButton>
        </div>
      </div>

      {/* 3-col grid */}
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
        gap: 2, padding: '0 48px',
      }}>
        {items.map((project, i) => {
          const plate = PLATES[i % PLATES.length]
          const isHover = hover === i
          const content = (
            <>
              {/* Photo placeholder */}
              <div style={{ position: 'relative', width: '100%', aspectRatio: '3/4', overflow: 'hidden' }}>
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
                borderBottom: '1px solid var(--fg-5)',
                display: 'grid', gridTemplateColumns: '1fr auto',
                alignItems: 'center', gap: 16,
              }}>
                <div>
                  <div style={{
                    fontFamily: 'var(--font-display)', fontWeight: 500,
                    fontSize: 'clamp(18px, 2vw, 28px)', lineHeight: 1.08,
                    letterSpacing: '-0.01em', textTransform: 'uppercase',
                    color: 'var(--fg-1)',
                    transform: isHover ? 'translateX(6px)' : 'none',
                    transition: 'transform 320ms var(--ease-std)',
                  }}>
                    {project.title}
                  </div>
                  {project.year && (
                    <div style={{
                      marginTop: 5, fontFamily: 'var(--font-mono)', fontSize: 10,
                      letterSpacing: '0.1em', color: 'var(--fg-4)',
                    }}>
                      {project.year}
                    </div>
                  )}
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
            </>
          )

          return (
            <Link
              key={project.id}
              href={project.slug ? `/projects/${project.slug}` : '/projects'}
              onMouseEnter={() => setHover(i)}
              onMouseLeave={() => setHover(null)}
              style={{ textDecoration: 'none', display: 'block', cursor: 'pointer' }}
            >
              {content}
            </Link>
          )
        })}
      </div>

      <div style={{ padding: '64px 48px 100px' }}/>
    </section>
  )
}
