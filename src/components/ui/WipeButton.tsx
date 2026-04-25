'use client'
import { useState } from 'react'
import Link from 'next/link'

type Variant = 'primary' | 'ghost' | 'ghost-inverse'

interface Props {
  href?: string
  onClick?: () => void
  variant?: Variant
  number?: number
  children: React.ReactNode
  style?: React.CSSProperties
}

/**
 * Wipe-fill button — exact replica of Button from Primitives.jsx.
 * primary:       dark bg, white text, white fill wipes up on hover
 * ghost:         transparent bg, dark text, dark fill wipes up on hover
 * ghost-inverse: transparent bg, white text/border, white fill wipes up on hover
 */
export default function WipeButton({ href, onClick, variant = 'primary', number, children, style }: Props) {
  const [hover, setHover] = useState(false)

  const isInverse = variant === 'ghost-inverse'
  const isGhost   = variant === 'ghost'
  const isPrimary = variant === 'primary'

  const bgColor    = isPrimary ? 'var(--fg-1)' : 'transparent'
  const textColor  = isPrimary
    ? (hover ? 'var(--fg-1)' : '#fff')
    : isInverse
    ? (hover ? 'var(--fg-1)' : '#fff')
    : (hover ? '#fff' : 'var(--fg-1)')
  const borderColor = isInverse ? '#fff' : 'var(--fg-1)'
  const fillColor   = isPrimary ? '#fff' : isInverse ? '#fff' : 'var(--fg-1)'

  const base: React.CSSProperties = {
    position: 'relative', overflow: 'hidden',
    padding: '16px 24px',
    fontFamily: 'var(--font-sans)', fontSize: 11, fontWeight: 700,
    letterSpacing: '0.18em', textTransform: 'uppercase',
    cursor: 'pointer',
    border: `1px solid ${borderColor}`, borderRadius: 0,
    display: 'inline-flex', alignItems: 'center', gap: 14,
    color: textColor, textDecoration: 'none',
    transition: 'color 260ms cubic-bezier(0.2,0,0.2,1)',
    background: bgColor,
    ...style,
  }

  const fill: React.CSSProperties = {
    content: '""', position: 'absolute', inset: 0,
    background: fillColor,
    transform: hover ? 'translateY(0)' : 'translateY(101%)',
    transition: 'transform 320ms cubic-bezier(0.2,0,0.2,1)',
    zIndex: 0,
  }

  const inner = (
    <>
      <span style={fill}/>
      {number != null && (
        <span style={{ position: 'relative', zIndex: 1, fontFamily: 'var(--font-mono)', fontSize: 10, opacity: 0.6, letterSpacing: '0.04em' }}>
          /{String(number).padStart(2, '0')}
        </span>
      )}
      <span style={{ position: 'relative', zIndex: 1 }}>{children}</span>
      <svg
        style={{
          position: 'relative', zIndex: 1,
          transform: hover ? 'translateX(4px)' : 'translateX(0)',
          transition: 'transform 300ms cubic-bezier(0.2,0,0.2,1)',
        }}
        width="12" height="12" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="2"
        strokeLinecap="round" strokeLinejoin="round"
      >
        <path d="M5 12h14M13 6l6 6-6 6"/>
      </svg>
    </>
  )

  if (href) {
    return (
      <Link href={href} style={base} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
        {inner}
      </Link>
    )
  }

  return (
    <button
      onClick={onClick}
      style={{ ...base, font: 'inherit' }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {inner}
    </button>
  )
}
