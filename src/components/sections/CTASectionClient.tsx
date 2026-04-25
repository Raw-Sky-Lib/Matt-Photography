'use client'
import WipeButton from '@/components/ui/WipeButton'
import type { CTASection } from '@/types/content'

export default function CTASectionClient({ data }: { data: CTASection }) {
  return (
    <section style={{ padding: '140px 48px 160px', background: '#0a0a0a', color: '#fff' }}>
      <div style={{
        display: 'grid', gridTemplateColumns: '1fr 1fr',
        gap: 48, alignItems: 'end',
      }}>

        {/* Left — headline */}
        <div>
          <div style={{
            fontFamily: 'var(--font-display)', fontWeight: 500,
            fontSize: 'clamp(64px,9.5vw,160px)', lineHeight: 1.0,
            letterSpacing: '-0.02em', textTransform: 'uppercase',
            color: '#fff', textWrap: 'balance',
          }}>
            {data.headline}
          </div>
        </div>

        {/* Right — body + CTAs */}
        <div style={{ paddingBottom: 16 }}>
          <p style={{
            margin: 0, fontFamily: 'var(--font-sans)', fontSize: 17,
            lineHeight: 1.55, color: 'rgba(255,255,255,0.75)', maxWidth: '44ch',
          }}>
            {data.subheadline}
          </p>

          <div style={{ marginTop: 40, display: 'flex', flexWrap: 'wrap', gap: 12 }}>
            <WipeButton href={data.button_url} variant="ghost-inverse" number={1}>
              {data.button_label}
            </WipeButton>
            {data.secondary_button_label && data.secondary_button_url && (
              <WipeButton href={data.secondary_button_url} variant="ghost-inverse" number={2}>
                {data.secondary_button_label}
              </WipeButton>
            )}
          </div>

          {(data.email || data.phone) && (
            <div style={{
              marginTop: 56,
              display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24,
              maxWidth: 540,
              borderTop: '1px solid rgba(255,255,255,0.14)', paddingTop: 28,
            }}>
              {data.email && (
                <div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.12em', color: 'rgba(255,255,255,0.45)', marginBottom: 8, textTransform: 'uppercase' }}>Email</div>
                  <a href={`mailto:${data.email}`} style={{ fontFamily: 'var(--font-sans)', fontSize: 15, color: '#fff', textDecoration: 'none' }}>
                    {data.email}
                  </a>
                </div>
              )}
              {data.phone && (
                <div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.12em', color: 'rgba(255,255,255,0.45)', marginBottom: 8, textTransform: 'uppercase' }}>Phone</div>
                  <a href={`tel:${data.phone}`} style={{ fontFamily: 'var(--font-sans)', fontSize: 15, color: '#fff', textDecoration: 'none' }}>
                    {data.phone}
                  </a>
                </div>
              )}
            </div>
          )}
        </div>

      </div>
    </section>
  )
}
