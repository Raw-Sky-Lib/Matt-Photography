'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import type { TestimonialsSection } from '@/types/content'

export default function TestimonialsSectionClient({ data }: { data: TestimonialsSection }) {
  const [active, setActive] = useState(0)
  const [dir, setDir] = useState<1 | -1>(1)
  const count = data.items.length

  useEffect(() => {
    if (count < 2) return
    const id = setInterval(() => go(1), 7000)
    return () => clearInterval(id)
  }, [count])

  function go(d: 1 | -1) {
    setDir(d)
    setActive(a => (a + d + count) % count)
  }

  if (!count) return null

  return (
    <section style={{ background: '#fff' }}>
      <div
        className="px-6 md:px-12"
        style={{ paddingTop: 'clamp(72px, 9vw, 112px)', paddingBottom: 'clamp(72px, 9vw, 112px)' }}
      >

        {/* Label row + nav */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 56 }}>
          <span style={{
            fontFamily: 'var(--font-mono)', fontSize: 10,
            letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--fg-4)',
          }}>
            {data.headline}
          </span>

          {count > 1 && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <button
                type="button" onClick={() => go(-1)} aria-label="Previous"
                style={{ background: 'none', border: 'none', padding: 4, cursor: 'pointer', color: 'var(--fg-3)', lineHeight: 0 }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 12H5M11 6l-6 6 6 6"/>
                </svg>
              </button>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.14em', color: 'var(--fg-4)' }}>
                {String(active + 1).padStart(2, '0')} / {String(count).padStart(2, '0')}
              </span>
              <button
                type="button" onClick={() => go(1)} aria-label="Next"
                style={{ background: 'none', border: 'none', padding: 4, cursor: 'pointer', color: 'var(--fg-3)', lineHeight: 0 }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M13 6l6 6-6 6"/>
                </svg>
              </button>
            </div>
          )}
        </div>

        {/* Carousel */}
        <div style={{ position: 'relative' }}>
          {data.items.map((item, i) => (
            <div
              key={i}
              style={{
                position: i === active ? 'relative' : 'absolute',
                inset: i === active ? 'auto' : 0,
                opacity: i === active ? 1 : 0,
                transform: i === active ? 'translateX(0)' : `translateX(${dir * 20}px)`,
                transition: 'opacity 500ms cubic-bezier(0.2,0,0.2,1), transform 500ms cubic-bezier(0.2,0,0.2,1)',
                pointerEvents: i === active ? 'auto' : 'none',
              }}
            >
              <div className="grid grid-cols-1 lg:grid-cols-[1fr_220px] gap-10 lg:gap-16">

                {/* Quote */}
                <blockquote style={{
                  margin: 0,
                  fontFamily: 'var(--font-display)', fontWeight: 500,
                  fontSize: 'clamp(22px, 2.6vw, 38px)',
                  lineHeight: 1.3, letterSpacing: '-0.015em',
                  color: 'var(--fg-1)',
                }}>
                  &ldquo;{item.quote}&rdquo;
                </blockquote>

                {/* Index + attribution */}
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div style={{
                    fontFamily: 'var(--font-mono)', fontSize: 10,
                    letterSpacing: '0.18em', color: 'var(--fg-4)',
                  }}>
                    {String(i + 1).padStart(2, '0')}
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    {item.avatar_url && (
                      <div style={{
                        width: 40, height: 40, borderRadius: '50%',
                        overflow: 'hidden', flexShrink: 0, position: 'relative',
                      }}>
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
                      <div style={{
                        fontFamily: 'var(--font-display)', fontWeight: 500,
                        fontSize: 12, letterSpacing: '-0.01em',
                        textTransform: 'uppercase', color: 'var(--fg-1)',
                      }}>
                        {item.author}
                      </div>
                      {item.role && (
                        <div style={{
                          marginTop: 3,
                          fontFamily: 'var(--font-mono)', fontSize: 10,
                          letterSpacing: '0.1em', textTransform: 'uppercase',
                          color: 'var(--fg-4)',
                        }}>
                          {item.role}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
