import type { ClientMarqueeSection } from '@/types/content'

export default function ClientMarquee({ data }: { data: ClientMarqueeSection }) {
  const items = [...data.clients, ...data.clients, ...data.clients]

  return (
    <section style={{
      borderTop: '1px solid var(--fg-1)', borderBottom: '1px solid var(--fg-4)',
      padding: '22px 0', overflow: 'hidden', background: '#fff',
    }}>
      <div style={{
        display: 'flex', gap: 72,
        width: 'max-content',
        animation: 'mb-marquee 38s linear infinite',
      }}>
        {items.map((name, i) => (
          <span key={i} style={{
            fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: 22,
            letterSpacing: '0em', textTransform: 'uppercase',
            color: 'var(--fg-1)', whiteSpace: 'nowrap',
            display: 'inline-flex', alignItems: 'center', gap: 72,
          }}>
            {name}
            <span style={{
              color: 'var(--fg-4)', fontFamily: 'var(--font-mono)',
              fontSize: 12, fontWeight: 400,
            }}>/</span>
          </span>
        ))}
      </div>
    </section>
  )
}
