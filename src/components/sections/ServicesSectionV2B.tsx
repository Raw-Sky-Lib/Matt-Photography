import type { ServicesSection as ServicesSectionType } from '@/types/content'

// Variant B — Large-number feature rows
// Each service gets a full-width row with a giant decorative index behind it
// Description always visible — no interaction, layout does the work

export default function ServicesSectionV2B({ data }: { data: ServicesSectionType }) {
  if (!data.items.length) return null

  return (
    <section style={{ background: '#f5f4f1' }}>
      <div
        className="px-6 md:px-12"
        style={{
          paddingTop: 'clamp(64px, 8vw, 104px)',
          paddingBottom: 'clamp(64px, 8vw, 104px)',
        }}
      >
        {/* Header */}
        <div
          className="flex justify-between items-end"
          style={{ marginBottom: 'clamp(48px, 6vw, 72px)' }}
        >
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 500,
            fontSize: 'clamp(40px, 6vw, 96px)',
            lineHeight: 1.04,
            letterSpacing: '-0.02em',
            textTransform: 'uppercase',
            color: 'var(--fg-1)',
            margin: 0,
          }}>
            {data.headline}
          </h2>
          <span style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 10,
            letterSpacing: '0.18em',
            color: 'var(--fg-4)',
            paddingBottom: 8,
          }}>
            {String(data.items.length).padStart(2, '0')} Offerings
          </span>
        </div>

        {/* Feature rows */}
        {data.items.map((item, i) => (
          <div
            key={i}
            style={{
              position: 'relative',
              overflow: 'hidden',
              paddingTop: 'clamp(36px, 5vw, 60px)',
              paddingBottom: 'clamp(36px, 5vw, 60px)',
              marginBottom: i < data.items.length - 1 ? 'clamp(4px, 0.5vw, 8px)' : 0,
            }}
          >
            {/* Giant background number */}
            <div
              aria-hidden
              style={{
                position: 'absolute',
                right: '-0.04em',
                top: '50%',
                transform: 'translateY(-50%)',
                fontFamily: 'var(--font-display)',
                fontWeight: 700,
                fontSize: 'clamp(120px, 18vw, 220px)',
                lineHeight: 1,
                letterSpacing: '-0.05em',
                color: 'var(--fg-1)',
                opacity: 0.05,
                userSelect: 'none',
                pointerEvents: 'none',
              }}
            >
              {String(i + 1).padStart(2, '0')}
            </div>

            {/* Content */}
            <div
              className="grid grid-cols-1 md:grid-cols-[1fr_clamp(200px,35%,440px)]"
              style={{ gap: 'clamp(12px, 2vw, 24px)', position: 'relative', zIndex: 1, alignItems: 'end' }}
            >
              <div>
                <div style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 10,
                  letterSpacing: '0.18em',
                  color: 'var(--fg-4)',
                  marginBottom: 16,
                }}>
                  {String(i + 1).padStart(2, '0')}
                </div>
                <h3 style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 500,
                  fontSize: 'clamp(28px, 4vw, 64px)',
                  lineHeight: 1.04,
                  letterSpacing: '-0.025em',
                  textTransform: 'uppercase',
                  color: 'var(--fg-1)',
                  margin: 0,
                }}>
                  {item.title}
                </h3>
              </div>

              <p style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 15,
                lineHeight: 1.75,
                color: 'var(--fg-3)',
                margin: 0,
              }}>
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
