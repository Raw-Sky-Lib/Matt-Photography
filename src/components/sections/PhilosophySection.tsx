import type { PhilosophySection as PhilosophySectionType } from '@/types/content'

export default function PhilosophySection({ data }: { data: PhilosophySectionType }) {
  return (
    <section
      className="px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24"
      style={{
        paddingTop: 'clamp(64px, 8vw, 96px)',
        paddingBottom: 'clamp(64px, 8vw, 96px)',
        borderTop: '0.5px solid var(--fg-5)',
      }}
    >
      {/* Left — label + headline */}
      <div>
        <div style={{
          fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 600,
          letterSpacing: '0.2em', textTransform: 'uppercase',
          color: 'var(--fg-4)', marginBottom: 24,
        }}>
          01
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

      {/* Right — body */}
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
    </section>
  )
}
