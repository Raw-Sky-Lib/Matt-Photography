'use client'
import { useState } from 'react'
import type { FAQSection } from '@/types/content'

export default function FAQSectionClient({ data }: { data: FAQSection }) {
  const [open, setOpen] = useState<number | null>(null)
  if (!data.items.length) return null

  return (
    <section style={{ background: '#fff', borderTop: '1px solid var(--fg-1)' }}>

      {/* Header — label + headline stacked, left-aligned */}
      <div className="px-6 md:px-12" style={{ paddingTop: 'clamp(64px, 8vw, 96px)', paddingBottom: 'clamp(48px, 6vw, 72px)' }}>
        <div style={{
          fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 600,
          letterSpacing: '0.2em', textTransform: 'uppercase',
          color: 'var(--fg-3)', marginBottom: 20,
        }}>
          FAQ
        </div>
        <h2 style={{
          fontFamily: 'var(--font-display)', fontWeight: 500,
          fontSize: 'clamp(52px, 9vw, 140px)', lineHeight: 0.96,
          letterSpacing: '-0.03em', textTransform: 'uppercase',
          color: 'var(--fg-1)', margin: 0,
        }}>
          {data.headline}
        </h2>
      </div>

      {/* Accordion — full width */}
      <div className="px-6 md:px-12" style={{ paddingBottom: 'clamp(64px, 8vw, 96px)' }}>
        {data.items.map((item, i) => {
          const isOpen = open === i
          return (
            <div key={i}>
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : i)}
                style={{
                  width: '100%', background: 'none', border: 'none',
                  borderTop: '1px solid var(--fg-5)',
                  padding: 'clamp(18px, 2.5vw, 28px) 0',
                  display: 'grid',
                  gridTemplateColumns: 'clamp(36px, 5vw, 64px) 1fr clamp(24px, 3vw, 36px)',
                  alignItems: 'start', gap: 12,
                  cursor: 'pointer', textAlign: 'left',
                }}
              >
                <span style={{
                  fontFamily: 'var(--font-mono)', fontSize: 10,
                  letterSpacing: '0.12em', color: 'var(--fg-4)',
                  paddingTop: 8,
                }}>
                  {String(i + 1).padStart(2, '0')}
                </span>

                <span style={{
                  fontFamily: 'var(--font-display)', fontWeight: 500,
                  fontSize: 'clamp(20px, 3vw, 48px)', lineHeight: 1.06,
                  letterSpacing: '-0.02em', textTransform: 'uppercase',
                  color: 'var(--fg-1)',
                }}>
                  {item.question}
                </span>

                <span style={{
                  fontFamily: 'var(--font-mono)', fontSize: 20, fontWeight: 300,
                  color: 'var(--fg-1)', lineHeight: 1,
                  transform: isOpen ? 'rotate(45deg)' : 'none',
                  transition: 'transform 300ms var(--ease-std)',
                  display: 'inline-block',
                  paddingTop: 6, textAlign: 'right',
                }}>
                  +
                </span>
              </button>

              {/* Answer — indented under question */}
              <div style={{
                overflow: 'hidden',
                maxHeight: isOpen ? 360 : 0,
                transition: 'max-height 380ms var(--ease-std)',
                paddingLeft: 'clamp(48px, 8vw, 100px)',
              }}>
                <p style={{
                  fontFamily: 'var(--font-sans)', fontSize: 16,
                  lineHeight: 1.72, color: 'var(--fg-3)',
                  margin: '4px 0 clamp(24px, 3vw, 36px)', maxWidth: '60ch',
                }}>
                  {item.answer}
                </p>
              </div>
            </div>
          )
        })}
        <div style={{ borderTop: '1px solid var(--fg-5)' }}/>
      </div>

    </section>
  )
}
