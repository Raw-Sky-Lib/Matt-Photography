import Image from 'next/image'
import type { ClientMarqueeSection } from '@/types/content'

export default function ClientMarquee({ data }: { data: ClientMarqueeSection }) {
  const items = [...data.clients, ...data.clients, ...data.clients]

  return (
    <section style={{
      borderTop: '1px solid var(--fg-1)',
      borderBottom: '1px solid var(--fg-4)',
      background: '#fff',
      display: 'flex',
      alignItems: 'stretch',
    }}>

      {/* "Trusted by" label — fixed left */}
      {data.label && (
        <div style={{
          flexShrink: 0,
          display: 'flex',
          alignItems: 'center',
          padding: '0 28px',
          borderRight: '1px solid var(--fg-5)',
          fontFamily: 'var(--font-mono)',
          fontSize: 9,
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: 'var(--fg-4)',
          whiteSpace: 'nowrap',
        }}>
          {data.label}
        </div>
      )}

      {/* Scrolling logos */}
      <div style={{ flex: 1, overflow: 'hidden', padding: '20px 0' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 64,
          width: 'max-content',
          animation: 'mb-marquee 38s linear infinite',
        }}>
          {items.map((url, i) => (
            <div key={i} style={{ flexShrink: 0, height: 32, display: 'flex', alignItems: 'center' }}>
              <Image
                src={url}
                alt={`Client logo ${(i % data.clients.length) + 1}`}
                width={0}
                height={0}
                sizes="200px"
                style={{ height: 32, width: 'auto', objectFit: 'contain', opacity: 0.7 }}
              />
            </div>
          ))}
        </div>
      </div>

    </section>
  )
}
