'use client'
import Image from 'next/image'
import WipeButton from '@/components/ui/WipeButton'
import type { AboutPreviewSection } from '@/types/content'

export default function AboutPreviewSectionClient({ data }: { data: AboutPreviewSection }) {
  return (
    <section style={{ background: '#fff', borderTop: '1px solid var(--fg-1)' }}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 px-6 md:px-12 py-20 md:py-28 lg:py-36">

        {/* Left — text */}
        <div>
          <h2 style={{
            fontFamily: 'var(--font-display)', fontWeight: 500,
            fontSize: 'clamp(48px,7.4vw,120px)', lineHeight: 1.04,
            letterSpacing: '-0.02em', textTransform: 'uppercase',
            color: 'var(--fg-1)', margin: '0 0 36px',
          }}>
            {data.headline.toUpperCase()}.
          </h2>
          <div style={{ margin: '0 0 44px' }}>
            {data.body.split('\n\n').map((para, i) => (
              <p key={i} style={{
                fontFamily: 'var(--font-sans)', fontSize: 17,
                lineHeight: 1.65, color: 'var(--fg-2)',
                margin: i === 0 ? 0 : '16px 0 0',
              }}>
                {para}
              </p>
            ))}
          </div>
          <WipeButton href={data.cta_url} variant="ghost">
            {data.cta_label}
          </WipeButton>
        </div>

        {/* Right — photo */}
        <div style={{ position: 'relative', width: '100%', aspectRatio: '3/4', overflow: 'hidden' }}>
          {data.image_url ? (
            <Image
              src={data.image_url}
              alt={data.headline}
              fill
              style={{ objectFit: 'cover' }}
              sizes="(max-width: 1024px) 100vw, 50vw"
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
            </>
          )}
        </div>

      </div>
    </section>
  )
}
