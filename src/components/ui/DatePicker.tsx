'use client'
import { useState } from 'react'

const MONTHS  = ['January','February','March','April','May','June','July','August','September','October','November','December']
const DAY_HDR = ['Su','Mo','Tu','We','Th','Fr','Sa']

interface Props {
  value: string | null   // ISO date string "YYYY-MM-DD"
  onChange: (date: string) => void
  disabled?: boolean
}

export default function DatePicker({ value, onChange, disabled }: Props) {
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const [view, setView] = useState(() => new Date(today.getFullYear(), today.getMonth(), 1))

  const year  = view.getFullYear()
  const month = view.getMonth()

  const firstDow   = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()

  const cells: (number | null)[] = [
    ...Array(firstDow).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ]
  while (cells.length % 7 !== 0) cells.push(null)

  const selected = value ? new Date(value + 'T00:00:00') : null

  function isPast(day: number) {
    return new Date(year, month, day) < today
  }

  function isToday(day: number) {
    return year === today.getFullYear() && month === today.getMonth() && day === today.getDate()
  }

  function isSel(day: number) {
    return !!(selected && selected.getFullYear() === year && selected.getMonth() === month && selected.getDate() === day)
  }

  function pick(day: number) {
    if (isPast(day) || disabled) return
    const iso = `${year}-${String(month + 1).padStart(2,'0')}-${String(day).padStart(2,'0')}`
    onChange(iso)
  }

  const prevDisabled = new Date(year, month, 0) < today

  const navBtn: React.CSSProperties = {
    background: 'none', border: 'none', cursor: 'pointer',
    padding: '4px 8px', display: 'flex', alignItems: 'center',
    color: 'var(--fg-3)', borderRadius: 0,
  }

  return (
    <div style={{ width: '100%', maxWidth: 340, opacity: disabled ? 0.5 : 1 }}>

      {/* Month nav */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
        <button
          type="button"
          onClick={() => setView(v => new Date(v.getFullYear(), v.getMonth() - 1, 1))}
          disabled={prevDisabled || disabled}
          style={{ ...navBtn, opacity: prevDisabled ? 0.2 : 1, cursor: prevDisabled ? 'default' : 'pointer' }}
          aria-label="Previous month"
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6"/>
          </svg>
        </button>

        <span style={{
          fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 600,
          letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--fg-2)',
        }}>
          {MONTHS[month]} {year}
        </span>

        <button
          type="button"
          onClick={() => setView(v => new Date(v.getFullYear(), v.getMonth() + 1, 1))}
          disabled={disabled}
          style={{ ...navBtn }}
          aria-label="Next month"
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 18l6-6-6-6"/>
          </svg>
        </button>
      </div>

      {/* Day headers */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', marginBottom: 6 }}>
        {DAY_HDR.map(d => (
          <div key={d} style={{
            fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.1em',
            textTransform: 'uppercase', color: 'var(--fg-4)',
            textAlign: 'center', padding: '0 0 4px',
          }}>
            {d}
          </div>
        ))}
      </div>

      {/* Day cells */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 2 }}>
        {cells.map((day, i) => {
          if (!day) return <div key={i} style={{ height: 36 }}/>
          const past = isPast(day)
          const sel  = isSel(day)
          const tod  = isToday(day)
          return (
            <button
              key={i}
              type="button"
              onClick={() => pick(day)}
              disabled={past || disabled}
              style={{
                height: 36, width: '100%',
                background: sel ? 'var(--fg-1)' : 'transparent',
                border: tod && !sel ? '1px solid var(--fg-3)' : '1px solid transparent',
                color: sel ? '#fff' : past ? 'var(--fg-5)' : 'var(--fg-2)',
                fontFamily: 'var(--font-mono)', fontSize: 12,
                cursor: past || disabled ? 'default' : 'pointer',
                transition: 'background 120ms, color 120ms, border-color 120ms',
                borderRadius: 0,
              }}
              onMouseEnter={e => {
                if (!past && !disabled && !sel) {
                  (e.currentTarget as HTMLButtonElement).style.background = 'var(--fg-6, #f5f5f5)'
                }
              }}
              onMouseLeave={e => {
                if (!sel) (e.currentTarget as HTMLButtonElement).style.background = 'transparent'
              }}
            >
              {day}
            </button>
          )
        })}
      </div>

    </div>
  )
}
