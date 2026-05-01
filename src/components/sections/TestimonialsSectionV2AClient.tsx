'use client'
import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Image from 'next/image'
import type { TestimonialsSection } from '@/types/content'

export default function TestimonialsSectionV2AClient({ data }: { data: TestimonialsSection }) {
  const [active, setActive] = useState(0)
  const count = data.items.length

  useEffect(() => {
    if (count < 2) return
    const id = setInterval(() => setActive(a => (a + 1) % count), 7000)
    return () => clearInterval(id)
  }, [count])

  if (!count) return null

  const item = data.items[active]

  return (
    <section style={{ background: '#fff' }}>
      <div
        className="px-6 md:px-12"
        style={{
          paddingTop: 'clamp(96px, 11vw, 152px)',
          paddingBottom: 'clamp(96px, 11vw, 152px)',
        }}
      >
        {/* Section label */}
        <div style={{ textAlign: 'center', marginBottom: 72 }}>
          <span style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 10,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: 'var(--fg-4)',
          }}>
            {data.headline}
          </span>
        </div>

        {/* Quote + author block */}
        <div style={{ maxWidth: 680, margin: '0 auto', textAlign: 'center', position: 'relative' }}>

          {/* Decorative " — absolutely positioned so it never affects layout */}
          <div
            aria-hidden
            style={{
              position: 'absolute',
              top: -56,
              left: '50%',
              transform: 'translateX(-50%)',
              fontFamily: 'var(--font-display)',
              fontSize: 240,
              lineHeight: 1,
              color: 'var(--fg-1)',
              opacity: 0.045,
              userSelect: 'none',
              pointerEvents: 'none',
              zIndex: 0,
            }}
          >
            &ldquo;
          </div>

          {/* AnimatePresence: exit finishes before enter starts; quote + author move as one unit */}
          <div style={{ position: 'relative', zIndex: 1 }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.45, ease: [0.2, 0, 0.2, 1] }}
              >
                <blockquote style={{
                  margin: 0,
                  fontFamily: 'var(--font-display)',
                  fontWeight: 400,
                  fontSize: 'clamp(20px, 2.4vw, 34px)',
                  lineHeight: 1.45,
                  letterSpacing: '-0.02em',
                  color: 'var(--fg-1)',
                }}>
                  {item.quote}
                </blockquote>

                {/* Divider */}
                <div style={{
                  width: 28,
                  height: 1,
                  background: 'var(--fg-1)',
                  opacity: 0.18,
                  margin: '36px auto 30px',
                }} />

                {/* Author attribution — centered, stacked */}
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 10,
                }}>
                  {item.avatar_url && (
                    <div style={{
                      width: 44,
                      height: 44,
                      borderRadius: '50%',
                      overflow: 'hidden',
                      position: 'relative',
                      flexShrink: 0,
                    }}>
                      <Image
                        src={item.avatar_url}
                        alt={item.author}
                        fill
                        style={{ objectFit: 'cover', objectPosition: 'center top' }}
                        sizes="44px"
                      />
                    </div>
                  )}
                  <div>
                    <div style={{
                      fontFamily: 'var(--font-display)',
                      fontWeight: 500,
                      fontSize: 12,
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      color: 'var(--fg-1)',
                    }}>
                      {item.author}
                    </div>
                    {item.role && (
                      <div style={{
                        marginTop: 5,
                        fontFamily: 'var(--font-mono)',
                        fontSize: 10,
                        letterSpacing: '0.14em',
                        textTransform: 'uppercase',
                        color: 'var(--fg-4)',
                      }}>
                        {item.role}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Dot nav — motion.button handles the width interpolation */}
        {count > 1 && (
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 7,
            marginTop: 60,
          }}>
            {data.items.map((_, i) => (
              <motion.button
                key={i}
                type="button"
                onClick={() => setActive(i)}
                aria-label={`Go to testimonial ${i + 1}`}
                animate={{
                  width: i === active ? 28 : 6,
                  opacity: i === active ? 0.6 : 0.18,
                }}
                transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
                style={{
                  height: 5,
                  borderRadius: 99,
                  background: 'var(--fg-1)',
                  border: 'none',
                  padding: 0,
                  cursor: 'pointer',
                  flexShrink: 0,
                }}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
