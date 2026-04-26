import type { PhilosophySection as PhilosophySectionType } from '@/types/content'

export default function PhilosophySection({ data }: { data: PhilosophySectionType }) {
  return (
    <section style={{ background: '#f5f4f1' }}>
      <div
        className="px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2"
        style={{
          paddingTop: 'clamp(64px, 8vw, 104px)',
          paddingBottom: 'clamp(64px, 8vw, 104px)',
          gap: 'clamp(40px, 6vw, 96px)',
        }}
      >
        {/* Left — label + headline */}
        <div>
          <div style={{
            fontFamily: 'var(--font-mono)', fontSize: 10,
            letterSpacing: '0.2em', textTransform: 'uppercase',
            color: 'var(--fg-4)', marginBottom: 24,
          }}>
            Philosophy
          </div>
          <h2 style={{
            fontFamily: 'var(--font-display)', fontWeight: 500,
            fontSize: 'clamp(36px, 5vw, 72px)', lineHeight: 0.96,
            letterSpacing: '-0.03em', textTransform: 'uppercase',
            color: 'var(--fg-1)', margin: 0,
          }}>
            {data.headline}
          </h2>
        </div>

        {/* Right — body, pinned to bottom to align with headline baseline */}
        <div style={{ display: 'flex', alignItems: 'flex-end' }}>
          <p style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 'clamp(16px, 1.6vw, 20px)',
            lineHeight: 1.75,
            color: 'var(--fg-2)',
            margin: 0,
          }}>
            {data.body}
          </p>
        </div>
      </div>
    </section>
  )
}
