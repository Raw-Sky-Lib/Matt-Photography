'use client'
import WipeButton from '@/components/ui/WipeButton'
import type { AboutPreviewSection } from '@/types/content'

export default function AboutPreviewSectionClient({ data }: { data: AboutPreviewSection }) {
  return (
    <section style={{ background: '#fff', borderTop: '1px solid var(--fg-1)' }}>
      <div style={{
        padding: '120px 48px 140px',
        display: 'grid', gridTemplateColumns: '1fr 1fr',
        gap: 80, alignItems: 'flex-start',
      }}>

        {/* Left — text */}
        <div>
          <h2 style={{
            fontFamily: 'var(--font-display)', fontWeight: 500,
            fontSize: 'clamp(56px,7.4vw,120px)', lineHeight: 1.04,
            letterSpacing: '-0.02em', textTransform: 'uppercase',
            color: 'var(--fg-1)', margin: '0 0 36px',
          }}>
            {data.headline.toUpperCase()}.
          </h2>
          <p style={{
            fontFamily: 'var(--font-sans)', fontSize: 17,
            lineHeight: 1.65, color: 'var(--fg-2)',
            maxWidth: '46ch', margin: '0 0 44px',
          }}>
            {data.body}
          </p>
          <WipeButton href={data.cta_url} variant="ghost">
            {data.cta_label}
          </WipeButton>
        </div>

        {/* Right — photo placeholder */}
        <div style={{ position: 'relative', width: '100%', aspectRatio: '3/4', overflow: 'hidden' }}>
          {data.image_url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={data.image_url}
              alt={data.headline}
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
          ) : (
            <>
              <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(165deg, #2a1f16 0%, #1a0e07 45%, #0c0705 100%)',
              }}/>
              <div style={{
                position: 'absolute', inset: 0,
                background: 'radial-gradient(ellipse 55% 50% at 38% 32%, rgba(255,185,120,0.2), transparent 65%)',
              }}/>
              <div style={{
                position: 'absolute', inset: 0, pointerEvents: 'none', opacity: 0.35,
                backgroundImage: 'radial-gradient(rgba(255,255,255,0.06) 0.5px, transparent 0.8px)',
                backgroundSize: '3px 3px', mixBlendMode: 'overlay',
              }}/>
              <div style={{
                position: 'absolute', inset: 0,
                background: 'radial-gradient(ellipse at 50% 50%, transparent 48%, rgba(0,0,0,0.45) 100%)',
              }}/>
              <div style={{
                position: 'absolute', bottom: 24, left: 24,
                fontFamily: 'var(--font-mono)', fontSize: 10,
                letterSpacing: '0.12em', color: 'rgba(255,255,255,0.55)',
                textTransform: 'uppercase', lineHeight: 1.6,
              }}>
                Portrait · London<br/>Natural light
              </div>
            </>
          )}
        </div>

      </div>
    </section>
  )
}
