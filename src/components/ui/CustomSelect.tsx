'use client'
import { useState, useRef, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

interface Props {
  value: string
  onChange: (val: string) => void
  options: string[]
  placeholder?: string
  disabled?: boolean
  hasError?: boolean
  /** Removes the bottom-border from the trigger — use inside table/row layouts */
  noBorder?: boolean
}

export default function CustomSelect({
  value,
  onChange,
  options,
  placeholder = 'Select',
  disabled,
  hasError,
  noBorder,
}: Props) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    function onOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', onOutside)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onOutside)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  const isPlaceholder = !value

  const triggerBorder = noBorder
    ? 'none'
    : `1px solid ${hasError ? '#e05252' : open ? 'var(--fg-1)' : 'var(--fg-4)'}`

  return (
    <div ref={ref} style={{ position: 'relative' }}>
      <button
        type="button"
        disabled={disabled}
        onClick={() => !disabled && setOpen(o => !o)}
        aria-expanded={open ? 'true' : 'false'}
        aria-haspopup="listbox"
        style={{
          width: '100%',
          background: 'none',
          border: 'none',
          borderBottom: triggerBorder,
          outline: 'none',
          padding: noBorder ? 0 : '0 0 14px',
          fontFamily: 'var(--font-sans)',
          fontSize: 'clamp(15px, 1.4vw, 18px)',
          color: isPlaceholder ? 'var(--fg-4)' : 'var(--fg-1)',
          borderRadius: 0,
          cursor: disabled ? 'not-allowed' : 'pointer',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          textAlign: 'left',
          transition: 'color 220ms',
        }}
      >
        <span>{isPlaceholder ? placeholder : value}</span>
        <svg
          width="11" height="11" viewBox="0 0 24 24"
          fill="none" stroke="currentColor" strokeWidth="1.6"
          strokeLinecap="round" strokeLinejoin="round"
          style={{
            color: 'var(--fg-4)',
            flexShrink: 0,
            transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 260ms cubic-bezier(0.2,0,0.2,1)',
          }}
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            role="listbox"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15, ease: [0.2, 0, 0.2, 1] }}
            style={{
              position: 'absolute',
              top: '100%',
              left: 0,
              right: 0,
              zIndex: 50,
              background: 'var(--bg-1)',
              border: '1px solid var(--fg-4)',
              marginTop: noBorder ? 8 : 0,
              borderTop: noBorder ? undefined : 'none',
              listStyle: 'none',
              margin: noBorder ? '8px 0 0' : 0,
              padding: 0,
            }}
          >
            {options.map((opt, i) => {
              const selected = opt === value
              return (
                <li
                  key={opt}
                  role="option"
                  aria-selected={selected}
                  onClick={() => { onChange(opt); setOpen(false) }}
                  style={{
                    padding: '13px 16px',
                    borderBottom: i < options.length - 1 ? '1px solid var(--fg-5)' : 'none',
                    fontFamily: 'var(--font-sans)',
                    fontSize: 'clamp(15px, 1.4vw, 18px)',
                    color: selected ? 'var(--fg-1)' : 'var(--fg-3)',
                    cursor: 'pointer',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    transition: 'color 160ms',
                  }}
                  onMouseEnter={e => ((e.currentTarget as HTMLLIElement).style.color = 'var(--fg-1)')}
                  onMouseLeave={e => ((e.currentTarget as HTMLLIElement).style.color = selected ? 'var(--fg-1)' : 'var(--fg-3)')}
                >
                  {opt}
                  {selected && (
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--fg-3)', flexShrink: 0 }}>
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                  )}
                </li>
              )
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  )
}
