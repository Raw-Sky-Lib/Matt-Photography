'use client'
import { useState } from 'react'
import type { ServicesSection as ServicesSectionType } from '@/types/content'

export default function ServicesSectionV2({ data }: { data: ServicesSectionType }) {
  const [hovered, setHovered] = useState<number | null>(null)
  const anyHovered = hovered !== null

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
          style={{ marginBottom: 'clamp(40px, 5vw, 64px)' }}
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

        {/* Rows — separated by spacing only, no lines */}
        <div onMouseLeave={() => setHovered(null)}>
          {data.items.map((item, i) => {
            const isActive = hovered === i
            const isDimmed = anyHovered && !isActive

            return (
              <div
                key={i}
                onMouseEnter={() => setHovered(i)}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 'clamp(14px, 1.8vw, 24px)',
                  paddingTop: 'clamp(18px, 2.4vw, 30px)',
                  paddingBottom: 'clamp(18px, 2.4vw, 30px)',
                  paddingLeft: 'clamp(14px, 1.8vw, 22px)',
                  borderLeft: '2px solid',
                  borderLeftColor: isActive ? 'var(--fg-1)' : 'transparent',
                  cursor: 'default',
                  transition: 'border-left-color 250ms cubic-bezier(0.2,0,0.2,1)',
                }}
              >
                {/* Index */}
                <div style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 10,
                  letterSpacing: '0.16em',
                  paddingTop: 5,
                  flexShrink: 0,
                  width: 28,
                  color: 'var(--fg-4)',
                  opacity: isDimmed ? 0.3 : 1,
                  transition: 'opacity 350ms cubic-bezier(0.2,0,0.2,1)',
                }}>
                  {String(i + 1).padStart(2, '0')}
                </div>

                {/* Body */}
                <div style={{ flex: 1, minWidth: 0 }}>

                  {/* Title + arrow inline */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{
                      fontFamily: 'var(--font-display)',
                      fontWeight: 500,
                      fontSize: 'clamp(20px, 2.4vw, 36px)',
                      lineHeight: 1.08,
                      letterSpacing: '-0.02em',
                      textTransform: 'uppercase',
                      color: isDimmed ? 'var(--fg-4)' : isActive ? 'var(--fg-1)' : 'var(--fg-3)',
                      transform: isActive ? 'translateX(6px)' : 'translateX(0)',
                      transition: 'color 350ms cubic-bezier(0.2,0,0.2,1), transform 400ms cubic-bezier(0.2,0,0.2,1)',
                    }}>
                      {item.title}
                    </div>

                    {/* Arrow — enters diagonally from bottom-left, matching ↗ */}
                    <div style={{
                      flexShrink: 0,
                      lineHeight: 0,
                      color: 'var(--fg-1)',
                      opacity: isActive ? 1 : 0,
                      transform: isActive ? 'translate(0,0)' : 'translate(-5px,5px)',
                      transition: 'opacity 260ms, transform 340ms cubic-bezier(0.2,0,0.2,1)',
                    }}>
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M7 17 17 7M7 7h10v10"/>
                      </svg>
                    </div>
                  </div>

                  {/* Slide-down description */}
                  <div style={{
                    display: 'grid',
                    gridTemplateRows: isActive ? '1fr' : '0fr',
                    transition: 'grid-template-rows 420ms cubic-bezier(0.2,0,0.2,1)',
                  }}>
                    <div style={{ overflow: 'hidden' }}>
                      <p style={{
                        fontFamily: 'var(--font-sans)',
                        fontSize: 15,
                        lineHeight: 1.75,
                        color: 'var(--fg-2)',
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
              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}
