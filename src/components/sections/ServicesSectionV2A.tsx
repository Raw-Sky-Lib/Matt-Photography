'use client'
import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import type { ServicesSection as ServicesSectionType } from '@/types/content'

// Variant A — Split-screen
// Left: stacked service names, hover to activate
// Right: sticky description panel, AnimatePresence cross-fade

export default function ServicesSectionV2A({ data }: { data: ServicesSectionType }) {
  const [active, setActive] = useState(0)

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

        {/* Split grid */}
        <div
          className="grid grid-cols-1 lg:grid-cols-[5fr_7fr]"
          style={{ gap: 'clamp(40px, 6vw, 80px)', alignItems: 'start' }}
        >
          {/* Left — service name list */}
          <div onMouseLeave={() => setActive(0)}>
            {data.items.map((item, i) => {
              const isActive = active === i
              const isDimmed = active !== i
              return (
                <div
                  key={i}
                  onMouseEnter={() => setActive(i)}
                  onClick={() => setActive(i)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 20,
                    paddingTop: 'clamp(16px, 2vw, 24px)',
                    paddingBottom: 'clamp(16px, 2vw, 24px)',
                    cursor: 'default',
                  }}
                >
                  <span style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 10,
                    letterSpacing: '0.16em',
                    color: 'var(--fg-4)',
                    flexShrink: 0,
                    width: 24,
                    opacity: isDimmed ? 0.3 : 1,
                    transition: 'opacity 300ms',
                  }}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span style={{
                    fontFamily: 'var(--font-display)',
                    fontWeight: 500,
                    fontSize: 'clamp(22px, 2.8vw, 42px)',
                    lineHeight: 1.06,
                    letterSpacing: '-0.025em',
                    textTransform: 'uppercase',
                    color: isDimmed ? 'var(--fg-4)' : 'var(--fg-1)',
                    transition: 'color 300ms cubic-bezier(0.2,0,0.2,1)',
                  }}>
                    {item.title}
                  </span>
                </div>
              )
            })}
          </div>

          {/* Right — description panel */}
          <div style={{ position: 'sticky', top: 'clamp(80px, 8vw, 112px)' }}>
            {/* Active label */}
            <div style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 10,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: 'var(--fg-4)',
              marginBottom: 28,
            }}>
              {String(active + 1).padStart(2, '0')} / {String(data.items.length).padStart(2, '0')}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.4, ease: [0.2, 0, 0.2, 1] }}
              >
                <p style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: 'clamp(16px, 1.6vw, 22px)',
                  lineHeight: 1.7,
                  color: 'var(--fg-2)',
                  margin: 0,
                  maxWidth: '44ch',
                }}>
                  {data.items[active].description}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}
