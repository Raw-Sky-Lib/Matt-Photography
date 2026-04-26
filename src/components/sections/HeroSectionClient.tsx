'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import type { HeroSection, SiteSettings } from '@/types/content'

const FRAMES = [
  {
    bg:   'linear-gradient(165deg, #4a3b2e 0%, #2a1f16 45%, #120b07 100%)',
    glow: 'radial-gradient(ellipse 60% 45% at 35% 28%, rgba(255,198,142,0.22), transparent 60%)',
    label: 'WARM · PORTRAIT',
  },
  {
    bg:   'linear-gradient(160deg, #1c1a18 0%, #0a0908 60%, #060505 100%)',
    glow: 'radial-gradient(ellipse 45% 40% at 42% 30%, rgba(214,175,128,0.14), transparent 60%)',
    label: 'INK · PORTRAIT',
  },
  {
    bg:   'linear-gradient(165deg, #3a4048 0%, #1e2227 50%, #0c0f12 100%)',
    glow: 'radial-gradient(ellipse 55% 50% at 70% 32%, rgba(188,210,228,0.18), transparent 65%)',
    label: 'COOL · ARCH',
  },
  {
    bg:   'linear-gradient(170deg, #6a4a2a 0%, #3a2514 50%, #1a0e07 100%)',
    glow: 'radial-gradient(ellipse 65% 50% at 30% 25%, rgba(255,190,110,0.35), transparent 60%)',
    label: 'GOLDEN · DETAIL',
  },
]

interface Props {
  data: HeroSection
  settings: Pick<SiteSettings, 'location'>
}

export default function HeroSectionClient({ data, settings }: Props) {
  const [frame, setFrame] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setFrame(f => (f + 1) % FRAMES.length), 5200)
    return () => clearInterval(id)
  }, [])

  const gutter = 'clamp(24px, 5vw, 48px)'

  return (
    <section style={{
      position: 'relative', height: '100vh', minHeight: 780,
      background: '#0a0a0a', color: '#fff', overflow: 'hidden',
    }}>

      {/* ── Layered cross-fade photo stack ─────────────────── */}
      <div style={{ position: 'absolute', inset: 0 }}>
        {FRAMES.map((f, i) => (
          <div key={i} style={{
            position: 'absolute', inset: 0,
            opacity: i === frame ? 1 : 0,
            transition: 'opacity 1600ms cubic-bezier(0.2,0,0.2,1)',
          }}>
            <div style={{ position: 'absolute', inset: 0, background: f.bg }}/>
            <div style={{ position: 'absolute', inset: 0, background: f.glow }}/>
            <div style={{
              position: 'absolute', inset: 0, pointerEvents: 'none', opacity: 0.35,
              backgroundImage: 'radial-gradient(rgba(255,255,255,0.06) 0.5px, transparent 0.8px)',
              backgroundSize: '3px 3px',
              mixBlendMode: 'overlay',
            }}/>
            <div style={{
              position: 'absolute', inset: 0, pointerEvents: 'none',
              background: 'radial-gradient(ellipse at 50% 50%, transparent 55%, rgba(0,0,0,0.35) 100%)',
            }}/>
          </div>
        ))}

        {/* Film strip divider lines */}
        <div style={{ position: 'absolute', top: 0, bottom: 0, left: '33.333%', width: 1, background: 'rgba(255,255,255,0.08)', zIndex: 1 }}/>
        <div style={{ position: 'absolute', top: 0, bottom: 0, left: '66.666%', width: 1, background: 'rgba(255,255,255,0.08)', zIndex: 1 }}/>

        <div style={{
          position: 'absolute', inset: 0, zIndex: 2,
          background: 'linear-gradient(180deg, rgba(10,10,10,0.75) 0%, rgba(10,10,10,0.1) 35%, rgba(10,10,10,0.75) 100%)',
        }}/>
      </div>

      {/* ── Top bar ─────────────────────────────────────────── */}
      <div style={{
        position: 'absolute', top: 104, left: gutter, right: gutter, zIndex: 4,
        display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-start',
      }}>
        <div style={{
          fontFamily: 'var(--font-mono)', fontSize: 11,
          letterSpacing: '0.1em', color: 'rgba(255,255,255,0.7)',
          textAlign: 'right', lineHeight: 1.6,
        }}>
          ({String(frame + 1).padStart(2, '0')} / {String(FRAMES.length).padStart(2, '0')})<br/>
          {FRAMES[frame].label}
        </div>
      </div>

      {/* ── Centre headline ──────────────────────────────────── */}
      <div style={{
        position: 'absolute', top: '50%', left: gutter, right: gutter,
        transform: 'translateY(-50%)', zIndex: 3,
      }}>
        <h1 style={{
          fontFamily: 'var(--font-display)', fontWeight: 500,
          fontSize: 'clamp(40px, 10vw, 168px)', lineHeight: 1.0,
          letterSpacing: '-0.03em', textTransform: 'uppercase',
          color: '#fff', margin: 0,
          whiteSpace: 'pre-line',
        }}>
          {data.headline}
        </h1>
        <p style={{
          marginTop: 32,
          fontFamily: 'var(--font-sans)', fontSize: 17, lineHeight: 1.5,
          color: 'rgba(255,255,255,0.82)',
          maxWidth: 'min(480px, 100%)',
        }}>
          {data.subheadline}
        </p>
      </div>

      {/* ── Bottom bar ───────────────────────────────────────── */}
      <div style={{
        position: 'absolute', bottom: 48, left: gutter, right: gutter, zIndex: 4,
        display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end',
      }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
          <HeroButton href={data.cta_url}>{data.cta_label}</HeroButton>
          {data.secondary_cta_label && data.secondary_cta_url && (
            <HeroButton href={data.secondary_cta_url}>
              {data.secondary_cta_label}
            </HeroButton>
          )}
        </div>

        {settings.location && (
          <div className="hidden sm:flex" style={{
            gap: 48,
            fontFamily: 'var(--font-mono)', fontSize: 11,
            letterSpacing: '0.08em', color: 'rgba(255,255,255,0.7)',
            textTransform: 'uppercase',
          }}>
            <div>
              <div style={{ color: 'rgba(255,255,255,0.45)', marginBottom: 4 }}>Based</div>
              <div>{settings.location}</div>
            </div>
          </div>
        )}
      </div>

    </section>
  )
}

function HeroButton({ href, children }: { href: string; children: React.ReactNode }) {
  const [hover, setHover] = useState(false)
  return (
    <Link
      href={href}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        position: 'relative', overflow: 'hidden',
        padding: '16px 24px',
        fontFamily: 'var(--font-sans)', fontSize: 11, fontWeight: 700,
        letterSpacing: '0.18em', textTransform: 'uppercase',
        cursor: 'pointer',
        border: '1px solid #fff', borderRadius: 0,
        display: 'inline-flex', alignItems: 'center', gap: 14,
        color: hover ? '#0a0a0a' : '#fff',
        textDecoration: 'none',
        transition: 'color 260ms cubic-bezier(0.2,0,0.2,1)',
      }}
    >
      <span style={{
        position: 'absolute', inset: 0,
        background: '#fff',
        transform: hover ? 'translateY(0)' : 'translateY(101%)',
        transition: 'transform 320ms cubic-bezier(0.2,0,0.2,1)',
        zIndex: 0,
      }}/>
      <span style={{ position: 'relative', zIndex: 1 }}>{children}</span>
      <svg
        style={{
          position: 'relative', zIndex: 1,
          transform: hover ? 'translateX(4px)' : 'translateX(0)',
          transition: 'transform 300ms cubic-bezier(0.2,0,0.2,1)',
        }}
        width="12" height="12" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      >
        <path d="M5 12h14M13 6l6 6-6 6"/>
      </svg>
    </Link>
  )
}
