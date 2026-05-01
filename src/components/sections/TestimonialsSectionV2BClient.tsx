'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import type { TestimonialsSection } from '@/types/content'

export default function TestimonialsSectionV2BClient({ data }: { data: TestimonialsSection }) {
  const [active, setActive] = useState(0)
  const [dir, setDir] = useState<1 | -1>(1)
  const count = data.items.length

  useEffect(() => {
    if (count < 2) return
    const id = setInterval(() => go(1), 8000)
    return () => clearInterval(id)
  }, [count])

  function go(d: 1 | -1) {
    setDir(d)
    setActive(a => (a + d + count) % count)
  }

  if (!count) return null

  const item = data.items[active]

  return (
    <section style={{ background: '#fff', overflow: 'hidden' }}>
      <div
        className="px-6 md:px-12"
        style={{ paddingTop: 'clamp(96px, 11vw, 152px)', paddingBottom: 'clamp(96px, 11vw, 152px)' }}
      >
        {/* Top row: label left, index right */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 48 }}>
          <span style={{
            fontFamily: 'var(--font-mono)', fontSize: 10,
            letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--fg-4)',
          }}>
            {data.headline}
          </span>
          <span style={{
            fontFamily: 'var(--font-mono)', fontSize: 10,
            letterSpacing: '0.14em', color: 'var(--fg-4)',
          }}>
            {String(active + 1).padStart(2, '0')} / {String(count).padStart(2, '0')}
          </span>
        </div>

        {/* Quote carousel — full width, large type */}
        <div style={{ position: 'relative', minHeight: 'clamp(200px, 22vw, 320px)' }}>
          {data.items.map((q, i) => (
            <div
              key={i}
              style={{
                position: i === active ? 'relative' : 'absolute',
                inset: i === active ? 'auto' : 0,
                opacity: i === active ? 1 : 0,
                transform: i === active
                  ? 'translateX(0)'
                  : `translateX(${dir * 40}px)`,
                transition: 'opacity 550ms cubic-bezier(0.2,0,0.2,1), transform 550ms cubic-bezier(0.2,0,0.2,1)',
                pointerEvents: i === active ? 'auto' : 'none',
              }}
            >
              <blockquote style={{
                margin: 0,
                fontFamily: 'var(--font-display)',
                fontWeight: 400,
                fontSize: 'clamp(28px, 4vw, 60px)',
                lineHeight: 1.2,
                letterSpacing: '-0.03em',
                color: 'var(--fg-1)',
              }}>
                &ldquo;{q.quote}&rdquo;
              </blockquote>
            </div>
          ))}
        </div>

        {/* Bottom row: author left, nav right */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          marginTop: 56,
          borderTop: '1px solid',
          borderColor: 'var(--fg-1)',
          paddingTop: 28,
          opacity: 0.15,
          position: 'absolute',
          left: 0,
          right: 0,
        }}
        />
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          marginTop: 56,
        }}>
          {/* Author */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            {item.avatar_url && (
              <div style={{
                width: 44, height: 44, borderRadius: '50%',
                overflow: 'hidden', flexShrink: 0, position: 'relative',
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
                fontFamily: 'var(--font-display)', fontWeight: 500,
                fontSize: 13, letterSpacing: '-0.01em',
                textTransform: 'uppercase', color: 'var(--fg-1)',
              }}>
                {item.author}
              </div>
              {item.role && (
                <div style={{
                  marginTop: 3,
                  fontFamily: 'var(--font-mono)', fontSize: 10,
                  letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--fg-4)',
                }}>
                  {item.role}
                </div>
              )}
            </div>
          </div>

          {/* Arrow nav */}
          {count > 1 && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <button
                type="button" onClick={() => go(-1)} aria-label="Previous"
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  width: 44, height: 44,
                  border: '1px solid', borderColor: 'rgba(0,0,0,0.12)',
                  borderRadius: '50%',
                  background: 'none', cursor: 'pointer', color: 'var(--fg-2)',
                  transition: 'border-color 200ms, color 200ms',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--fg-1)'
                  ;(e.currentTarget as HTMLButtonElement).style.color = 'var(--fg-1)'
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(0,0,0,0.12)'
                  ;(e.currentTarget as HTMLButtonElement).style.color = 'var(--fg-2)'
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 12H5M11 6l-6 6 6 6"/>
                </svg>
              </button>
              <button
                type="button" onClick={() => go(1)} aria-label="Next"
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  width: 44, height: 44,
                  border: '1px solid', borderColor: 'rgba(0,0,0,0.12)',
                  borderRadius: '50%',
                  background: 'none', cursor: 'pointer', color: 'var(--fg-2)',
                  transition: 'border-color 200ms, color 200ms',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--fg-1)'
                  ;(e.currentTarget as HTMLButtonElement).style.color = 'var(--fg-1)'
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(0,0,0,0.12)'
                  ;(e.currentTarget as HTMLButtonElement).style.color = 'var(--fg-2)'
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M13 6l6 6-6 6"/>
                </svg>
              </button>
            </div>
          )}
        </div>

      </div>
    </section>
  )
}
