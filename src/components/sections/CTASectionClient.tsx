'use client'
import WipeButton from '@/components/ui/WipeButton'
import type { CTASection } from '@/types/content'

export default function CTASectionClient({ data }: { data: CTASection }) {
  return (
    <section style={{ background: '#0a0a0a', color: '#fff' }}>
      <div
        className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-12 lg:gap-24 items-end px-6 md:px-12"
        style={{ paddingTop: 'clamp(72px, 10vh, 120px)', paddingBottom: 'clamp(72px, 10vh, 120px)' }}
      >

        {/* Left — full editorial statement */}
        <div>
          <div style={{
            fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 600,
            letterSpacing: '0.2em', textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.35)', marginBottom: 32,
          }}>
            Get in touch
          </div>

          <h2 style={{
            fontFamily: 'var(--font-display)', fontWeight: 500,
            fontSize: 'clamp(48px, 9vw, 160px)', lineHeight: 0.96,
            letterSpacing: '-0.03em', textTransform: 'uppercase',
            color: '#fff', margin: '0 0 clamp(28px, 4vh, 48px)',
            whiteSpace: 'pre-line',
          }}>
            {data.headline}
          </h2>

          <p style={{
            fontFamily: 'var(--font-sans)', fontSize: 16,
            lineHeight: 1.65, color: 'rgba(255,255,255,0.55)',
            maxWidth: '48ch', margin: 0,
          }}>
            {data.subheadline}
          </p>
        </div>

        {/* Right — button */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'flex-start' }}>
          <WipeButton href={data.button_url} variant="ghost-inverse">
            {data.button_label}
          </WipeButton>
          {data.secondary_button_label && data.secondary_button_url && (
            <WipeButton href={data.secondary_button_url} variant="ghost-inverse">
              {data.secondary_button_label}
            </WipeButton>
          )}
        </div>

      </div>
    </section>
  )
}
