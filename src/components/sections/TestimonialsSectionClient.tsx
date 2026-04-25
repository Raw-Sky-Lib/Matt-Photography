'use client'
import { useState, useEffect } from 'react'
import type { TestimonialsSection } from '@/types/content'

export default function TestimonialsSectionClient({ data }: { data: TestimonialsSection }) {
  const [active, setActive] = useState(0)

  useEffect(() => {
    if (data.items.length < 2) return
    const id = setInterval(() => {
      setActive(a => (a + 1) % data.items.length)
    }, 7000)
    return () => clearInterval(id)
  }, [data.items.length])

  if (!data.items.length) return null

  return (
    <section className="px-6 md:px-12 py-24 lg:py-40" style={{ background: '#fff' }}>
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_3fr] gap-12">

        {/* Section label */}
        <div>
          <div style={{
            fontFamily: 'var(--font-sans)', fontSize: 11, fontWeight: 700,
            letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--fg-3)',
          }}>
            {data.headline}
          </div>
        </div>

        {/* Quotes */}
        <div>
          <div style={{ position: 'relative', minHeight: 280 }}>
            {data.items.map((item, i) => (
              <div
                key={i}
                style={{
                  position: i === active ? 'relative' : 'absolute',
                  inset: i === active ? 'auto' : '0',
                  opacity: i === active ? 1 : 0,
                  transition: 'opacity 600ms var(--ease-std)',
                  pointerEvents: i === active ? 'auto' : 'none',
                }}
              >
                <blockquote style={{
                  margin: 0,
                  fontFamily: 'var(--font-display)', fontWeight: 500,
                  textTransform: 'uppercase',
                  fontSize: 'clamp(32px,5.2vw,80px)',
                  lineHeight: 1.048, letterSpacing: '-0.015em',
                  color: 'var(--fg-1)', textWrap: 'balance',
                }}>
                  &ldquo;{item.quote}&rdquo;
                </blockquote>
                <div style={{
                  marginTop: 40,
                  display: 'flex', alignItems: 'center', gap: 16,
                  fontFamily: 'var(--font-mono)', fontSize: 11,
                  color: 'var(--fg-3)', letterSpacing: '0.08em', textTransform: 'uppercase',
                }}>
                  <span style={{ width: 2, height: 22, background: 'var(--fg-1)', flexShrink: 0 }}/>
                  <span style={{ color: 'var(--fg-1)', fontWeight: 600 }}>{item.author}</span>
                  {item.role && (
                    <>
                      <span>·</span>
                      <span>{item.role}</span>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Dot bars */}
          {data.items.length > 1 && (
            <div style={{ marginTop: 56, display: 'flex', gap: 8 }}>
              {data.items.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setActive(i)}
                  aria-label={`Testimonial ${i + 1}`}
                  style={{
                    width: 40, height: 2, padding: 0,
                    border: 'none', cursor: 'pointer',
                    background: i === active ? 'var(--fg-1)' : 'var(--fg-5)',
                    transition: 'background 260ms var(--ease-std)',
                  }}
                />
              ))}
            </div>
          )}
        </div>

      </div>
    </section>
  )
}
