'use client'
import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import type { ServicesSection as ServicesSectionType } from '@/types/content'

// Variant C — Focused switcher
// Service names as horizontal tabs at the top
// Below: one service at a time, large type, cross-fade on click

export default function ServicesSectionV2C({ data }: { data: ServicesSectionType }) {
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

        {/* Tab row */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 'clamp(20px, 3vw, 40px)',
            marginBottom: 'clamp(40px, 5vw, 64px)',
          }}
        >
          {data.items.map((item, i) => {
            const isActive = active === i
            return (
              <button
                key={i}
                type="button"
                onClick={() => setActive(i)}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  gap: 6,
                  background: 'none',
                  border: 'none',
                  padding: 0,
                  cursor: 'pointer',
                }}
              >
                <span style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 9,
                  letterSpacing: '0.18em',
                  color: isActive ? 'var(--fg-3)' : 'var(--fg-5)',
                  transition: 'color 250ms',
                }}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 500,
                  fontSize: 'clamp(14px, 1.4vw, 18px)',
                  letterSpacing: '-0.01em',
                  textTransform: 'uppercase',
                  color: isActive ? 'var(--fg-1)' : 'var(--fg-4)',
                  transition: 'color 280ms cubic-bezier(0.2,0,0.2,1)',
                }}>
                  {item.title}
                </span>
                {/* Active underline */}
                <div style={{
                  height: 1,
                  width: isActive ? '100%' : '0%',
                  background: 'var(--fg-1)',
                  transition: 'width 300ms cubic-bezier(0.4,0,0.2,1)',
                }} />
              </button>
            )
          })}
        </div>

        {/* Content panel */}
        <div style={{ maxWidth: 780 }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.42, ease: [0.2, 0, 0.2, 1] }}
            >
              <h3 style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 500,
                fontSize: 'clamp(36px, 5.5vw, 80px)',
                lineHeight: 1.04,
                letterSpacing: '-0.025em',
                textTransform: 'uppercase',
                color: 'var(--fg-1)',
                margin: '0 0 clamp(20px, 2.5vw, 32px)',
              }}>
                {data.items[active].title}
              </h3>
              <p style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 'clamp(15px, 1.5vw, 20px)',
                lineHeight: 1.75,
                color: 'var(--fg-2)',
                margin: 0,
                maxWidth: '52ch',
              }}>
                {data.items[active].description}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  )
}
