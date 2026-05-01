'use client'
import { useState, useEffect, useCallback } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Image from 'next/image'
import type { TestimonialsSection, ProjectSummary } from '@/types/content'

const INTERVAL = 8000

export default function TestimonialsSectionV3Client({
  data,
  projects,
}: {
  data: TestimonialsSection
  projects: ProjectSummary[]
}) {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const count = data.items.length

  const go = useCallback(
    (d: 1 | -1) => setActive(a => (a + d + count) % count),
    [count],
  )

  useEffect(() => {
    if (count < 2 || paused) return
    const id = setInterval(() => go(1), INTERVAL)
    return () => clearInterval(id)
  }, [count, paused, go])

  if (!count) return null

  const item = data.items[active]

  return (
    <section
      style={{
        position: 'relative',
        minHeight: '88vh',
        background: '#0a0a0a',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        overflow: 'hidden',
      }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* ── Project images — all in DOM, crossfade via opacity + subtle scale ── */}
      {projects.slice(0, count).map((project, i) =>
        project.cover_image_url ? (
          <motion.div
            key={i}
            animate={{
              opacity: i === active ? 1 : 0,
              scale: i === active ? 1 : 1.04,
            }}
            transition={{ duration: 1.4, ease: [0.25, 0, 0.2, 1] }}
            style={{ position: 'absolute', inset: 0, zIndex: 0 }}
          >
            <Image
              src={project.cover_image_url}
              alt={project.title}
              fill
              style={{ objectFit: 'cover', objectPosition: 'center 25%' }}
              priority={i === 0}
              sizes="100vw"
            />
          </motion.div>
        ) : null,
      )}

      {/* ── Solid caption strip — covers the bottom, sits above the image ── */}
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          background: '#0a0a0a',
          borderTop: '1px solid rgba(255,255,255,0.08)',
        }}
      >
        <div
          className="px-6 md:px-12"
          style={{
            paddingTop: 'clamp(36px, 4vw, 52px)',
            paddingBottom: 'clamp(36px, 4vw, 52px)',
          }}
        >

          {/* ── Top row: label + nav ── */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 40,
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 10,
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.35)',
              }}
            >
              {data.headline}
            </span>

            {count > 1 && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
                <button
                  type="button"
                  onClick={() => go(-1)}
                  aria-label="Previous testimonial"
                  style={{
                    background: 'none',
                    border: 'none',
                    padding: 4,
                    cursor: 'pointer',
                    color: 'rgba(255,255,255,0.4)',
                    lineHeight: 0,
                    transition: 'color 200ms',
                  }}
                  onMouseEnter={e =>
                    ((e.currentTarget as HTMLButtonElement).style.color = '#fff')
                  }
                  onMouseLeave={e =>
                    ((e.currentTarget as HTMLButtonElement).style.color =
                      'rgba(255,255,255,0.4)')
                  }
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M19 12H5M11 6l-6 6 6 6" />
                  </svg>
                </button>

                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 10,
                    letterSpacing: '0.14em',
                    color: 'rgba(255,255,255,0.35)',
                  }}
                >
                  {String(active + 1).padStart(2, '0')}&nbsp;/&nbsp;{String(count).padStart(2, '0')}
                </span>

                <button
                  type="button"
                  onClick={() => go(1)}
                  aria-label="Next testimonial"
                  style={{
                    background: 'none',
                    border: 'none',
                    padding: 4,
                    cursor: 'pointer',
                    color: 'rgba(255,255,255,0.4)',
                    lineHeight: 0,
                    transition: 'color 200ms',
                  }}
                  onMouseEnter={e =>
                    ((e.currentTarget as HTMLButtonElement).style.color = '#fff')
                  }
                  onMouseLeave={e =>
                    ((e.currentTarget as HTMLButtonElement).style.color =
                      'rgba(255,255,255,0.4)')
                  }
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </button>
              </div>
            )}
          </div>

          {/* ── Quote + attribution grid ── */}
          <div
            className="grid grid-cols-1 lg:grid-cols-[1fr_220px] gap-10 lg:gap-16"
            style={{ position: 'relative', minHeight: 'clamp(100px, 12vw, 160px)' }}
          >
            {/* Quote column */}
            <div>
              <AnimatePresence mode="wait">
                <motion.blockquote
                  key={`q-${active}`}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.5, ease: [0.2, 0, 0.2, 1] }}
                  style={{
                    margin: 0,
                    fontFamily: 'var(--font-display)',
                    fontWeight: 400,
                    fontSize: 'clamp(22px, 2.8vw, 42px)',
                    lineHeight: 1.28,
                    letterSpacing: '-0.02em',
                    color: '#fff',
                  }}
                >
                  &ldquo;{item.quote}&rdquo;
                </motion.blockquote>
              </AnimatePresence>
            </div>

            {/* Attribution column */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              {/* Slide index — top of right col */}
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 10,
                  letterSpacing: '0.18em',
                  color: 'rgba(255,255,255,0.2)',
                }}
              >
                {String(active + 1).padStart(2, '0')}
              </div>

              {/* Author — bottom of right col */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={`a-${active}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4, ease: 'easeInOut' }}
                  style={{ display: 'flex', alignItems: 'center', gap: 12 }}
                >
                  {item.avatar_url && (
                    <div
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: '50%',
                        overflow: 'hidden',
                        position: 'relative',
                        flexShrink: 0,
                        border: '1px solid rgba(255,255,255,0.12)',
                      }}
                    >
                      <Image
                        src={item.avatar_url}
                        alt={item.author}
                        fill
                        style={{ objectFit: 'cover', objectPosition: 'center top' }}
                        sizes="40px"
                      />
                    </div>
                  )}
                  <div>
                    <div
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontWeight: 500,
                        fontSize: 12,
                        letterSpacing: '0.06em',
                        textTransform: 'uppercase',
                        color: '#fff',
                      }}
                    >
                      {item.author}
                    </div>
                    {item.role && (
                      <div
                        style={{
                          marginTop: 4,
                          fontFamily: 'var(--font-mono)',
                          fontSize: 10,
                          letterSpacing: '0.12em',
                          textTransform: 'uppercase',
                          color: 'rgba(255,255,255,0.38)',
                        }}
                      >
                        {item.role}
                      </div>
                    )}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* ── Progress bar ── */}
          {count > 1 && (
            <div
              style={{
                marginTop: 40,
                height: 1,
                background: 'rgba(255,255,255,0.08)',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <motion.div
                key={`bar-${active}`}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: paused ? undefined : 1 }}
                transition={{ duration: INTERVAL / 1000, ease: 'linear' }}
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'rgba(255,255,255,0.28)',
                  transformOrigin: 'left',
                }}
              />
            </div>
          )}

        </div>
      </div>
    </section>
  )
}
