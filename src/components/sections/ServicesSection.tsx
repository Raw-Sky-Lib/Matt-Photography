'use client'
import { useState } from 'react'
import type { ServicesSection as ServicesSectionType } from '@/types/content'

export default function ServicesSection({ data }: { data: ServicesSectionType }) {
  const [active, setActive] = useState(0)

  if (!data.items.length) return null

  return (
    <section style={{ background: '#f5f4f1' }}>
      <div
        className="px-6 md:px-12"
        style={{ paddingTop: 'clamp(64px, 8vw, 104px)', paddingBottom: 'clamp(64px, 8vw, 104px)' }}
      >

        {/* Header */}
        <div className="flex justify-between items-end" style={{ marginBottom: 'clamp(40px, 5vw, 64px)' }}>
          <h2 style={{
            fontFamily: 'var(--font-display)', fontWeight: 500,
            fontSize: 'clamp(40px, 6vw, 96px)', lineHeight: 1.04,
            letterSpacing: '-0.02em', textTransform: 'uppercase',
            color: 'var(--fg-1)', margin: 0,
          }}>
            {data.headline}
          </h2>
          <span style={{
            fontFamily: 'var(--font-mono)', fontSize: 10,
            letterSpacing: '0.18em', color: 'var(--fg-4)', paddingBottom: 8,
          }}>
            {String(data.items.length).padStart(2, '0')} Offerings
          </span>
        </div>

        {/* Rows */}
        <div onMouseLeave={() => setActive(0)}>
          {data.items.map((item, i) => {
            const isActive = active === i
            return (
              <div
                key={i}
                onMouseEnter={() => setActive(i)}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '40px 1fr 28px',
                  gap: '0 20px',
                  padding: '24px 20px',
                  borderRadius: 6,
                  background: isActive ? 'rgba(0,0,0,0.05)' : 'transparent',
                  cursor: 'default',
                  transition: 'background 350ms cubic-bezier(0.2,0,0.2,1)',
                }}
              >

                {/* Index */}
                <div style={{
                  fontFamily: 'var(--font-mono)', fontSize: 10,
                  letterSpacing: '0.16em', paddingTop: 5,
                  color: isActive ? 'var(--fg-2)' : 'var(--fg-5)',
                  transition: 'color 350ms',
                }}>
                  {String(i + 1).padStart(2, '0')}
                </div>

                {/* Title + description */}
                <div>
                  <div style={{
                    fontFamily: 'var(--font-display)', fontWeight: 500,
                    fontSize: 'clamp(20px, 2.4vw, 36px)', lineHeight: 1.08,
                    letterSpacing: '-0.02em', textTransform: 'uppercase',
                    color: isActive ? 'var(--fg-1)' : 'var(--fg-3)',
                    transform: isActive ? 'translateX(6px)' : 'translateX(0)',
                    transition: 'color 350ms, transform 400ms cubic-bezier(0.2,0,0.2,1)',
                  }}>
                    {item.title}
                  </div>

                  {/* Slide-down description */}
                  <div style={{
                    display: 'grid',
                    gridTemplateRows: isActive ? '1fr' : '0fr',
                    transition: 'grid-template-rows 420ms cubic-bezier(0.2,0,0.2,1)',
                  }}>
                    <div style={{ overflow: 'hidden' }}>
                      <p style={{
                        fontFamily: 'var(--font-sans)', fontSize: 15,
                        lineHeight: 1.75, color: 'var(--fg-2)',
                        margin: '16px 0 4px',
                        maxWidth: '64ch',
                        opacity: isActive ? 1 : 0,
                        transform: isActive ? 'translateY(0)' : 'translateY(6px)',
                        transition: 'opacity 350ms 80ms, transform 350ms 80ms cubic-bezier(0.2,0,0.2,1)',
                      }}>
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Arrow */}
                <div style={{
                  paddingTop: 4, display: 'flex', alignItems: 'flex-start',
                  opacity: isActive ? 1 : 0,
                  transform: isActive ? 'translateX(0)' : 'translateX(-6px)',
                  transition: 'opacity 300ms, transform 350ms cubic-bezier(0.2,0,0.2,1)',
                  color: 'var(--fg-1)',
                }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M7 17 17 7M7 7h10v10"/>
                  </svg>
                </div>

              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}
