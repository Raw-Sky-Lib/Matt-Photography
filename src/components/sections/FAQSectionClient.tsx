'use client'
import { useState } from 'react'
import type { FAQSection } from '@/types/content'

export default function FAQSectionClient({ data }: { data: FAQSection }) {
  const [open, setOpen] = useState<number | null>(0)

  if (!data.items.length) return null

  return (
    <section style={{ background: '#f5f4f1' }}>
      <div
        className="px-6 md:px-12"
        style={{ paddingTop: 'clamp(64px, 8vw, 104px)', paddingBottom: 'clamp(64px, 8vw, 104px)' }}
      >

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.6fr]" style={{ gap: 'clamp(48px, 7vw, 96px)' }}>

          {/* Left — headline */}
          <div>
            <div style={{
              fontFamily: 'var(--font-mono)', fontSize: 10,
              letterSpacing: '0.2em', textTransform: 'uppercase',
              color: 'var(--fg-4)', marginBottom: 20,
            }}>
              FAQ
            </div>
            <h2 style={{
              fontFamily: 'var(--font-display)', fontWeight: 500,
              fontSize: 'clamp(36px, 4.5vw, 64px)', lineHeight: 1.04,
              letterSpacing: '-0.02em', textTransform: 'uppercase',
              color: 'var(--fg-1)', margin: 0,
            }}>
              {data.headline}
            </h2>
          </div>

          {/* Right — accordion */}
          <div>
            {data.items.map((item, i) => {
              const isOpen = open === i
              return (
                <div key={i}>
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    style={{
                      width: '100%', background: 'none', border: 'none',
                      borderTop: i === 0 ? 'none' : '1px solid var(--fg-5)',
                      padding: '22px 0',
                      display: 'flex', justifyContent: 'space-between',
                      alignItems: 'flex-start', gap: 20,
                      cursor: 'pointer', textAlign: 'left',
                    }}
                  >
                    <span style={{
                      fontFamily: 'var(--font-display)', fontWeight: 500,
                      fontSize: 'clamp(15px, 1.4vw, 20px)', lineHeight: 1.2,
                      letterSpacing: '-0.01em',
                      color: isOpen ? 'var(--fg-1)' : 'var(--fg-2)',
                      transition: 'color 250ms',
                      flex: 1,
                    }}>
                      {item.question}
                    </span>

                    <span style={{
                      color: 'var(--fg-1)', lineHeight: 1, flexShrink: 0,
                      transform: isOpen ? 'rotate(45deg)' : 'none',
                      transition: 'transform 300ms cubic-bezier(0.2,0,0.2,1)',
                      display: 'inline-block', paddingTop: 2,
                      fontFamily: 'var(--font-mono)', fontSize: 18, fontWeight: 300,
                    }}>
                      +
                    </span>
                  </button>

                  <div style={{
                    display: 'grid',
                    gridTemplateRows: isOpen ? '1fr' : '0fr',
                    transition: 'grid-template-rows 380ms cubic-bezier(0.2,0,0.2,1)',
                  }}>
                    <div style={{ overflow: 'hidden' }}>
                      <p style={{
                        fontFamily: 'var(--font-sans)', fontSize: 15,
                        lineHeight: 1.75, color: 'var(--fg-3)',
                        margin: '4px 0 24px',
                        opacity: isOpen ? 1 : 0,
                        transition: 'opacity 300ms 60ms',
                      }}>
                        {item.answer}
                      </p>
                    </div>
                  </div>
                </div>
              )
            })}
            <div style={{ borderTop: '1px solid var(--fg-5)' }}/>
          </div>

        </div>
      </div>
    </section>
  )
}
