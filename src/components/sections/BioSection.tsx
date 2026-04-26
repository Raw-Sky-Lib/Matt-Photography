import type { BioSection as BioSectionType } from '@/types/content'

export default function BioSection({ data }: { data: BioSectionType }) {
  return (
    <section style={{ background: '#f5f4f1' }}>
      <div
        className="px-6 md:px-12 grid grid-cols-1 lg:grid-cols-[180px_1fr]"
        style={{
          paddingTop: 'clamp(64px, 8vw, 104px)',
          paddingBottom: 'clamp(64px, 8vw, 104px)',
          gap: 'clamp(32px, 5vw, 80px)',
        }}
      >
        {/* Left — label */}
        <div style={{ paddingTop: 6 }}>
          <div style={{
            fontFamily: 'var(--font-mono)', fontSize: 10,
            letterSpacing: '0.2em', textTransform: 'uppercase',
            color: 'var(--fg-4)',
          }}>
            Biography
          </div>
        </div>

        {/* Right — bio body */}
        <div
          className="bio-body"
          dangerouslySetInnerHTML={{ __html: data.body }}
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 'clamp(16px, 1.6vw, 20px)',
            lineHeight: 1.75,
            color: 'var(--fg-2)',
          }}
        />
      </div>
    </section>
  )
}
