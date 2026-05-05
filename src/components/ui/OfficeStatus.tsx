'use client'
import { useState, useEffect } from 'react'

interface Props {
  timezone?: string  // e.g. "Europe/London"
  label?: string     // e.g. "London"
}

export default function OfficeStatus({ timezone = 'Europe/London', label = 'London' }: Props) {
  const [now, setNow] = useState<Date | null>(null)

  useEffect(() => {
    setNow(new Date())
    const id = setInterval(() => setNow(new Date()), 30_000)
    return () => clearInterval(id)
  }, [])

  if (!now) return null

  const localTime = new Intl.DateTimeFormat('en-GB', {
    timeZone: timezone,
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).format(now)

  const hour = parseInt(localTime.split(':')[0], 10)
  const officeOpen = hour >= 9 && hour < 19

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      fontFamily: 'var(--font-mono)',
      fontSize: 11,
      letterSpacing: '0.1em',
      textTransform: 'uppercase',
      color: 'var(--fg-3)',
    }}>
      <span style={{
        width: 8, height: 8, flexShrink: 0,
        background: officeOpen ? '#34c759' : 'var(--fg-4)',
        display: 'inline-block',
      }}/>
      {officeOpen ? 'Office hours' : 'Out of office'} · {label} {localTime}
    </div>
  )
}
