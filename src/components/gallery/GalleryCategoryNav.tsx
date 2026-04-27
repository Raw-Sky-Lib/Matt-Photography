'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import type { Category } from '@/types/content'

export default function GalleryCategoryNav({ categories }: { categories: Category[] }) {
  const pathname = usePathname()

  const items = [
    { href: '/gallery', label: 'All' },
    ...categories.map((c) => ({ href: `/gallery/${c.slug}`, label: c.name })),
  ]

  return (
    <div
      className="no-scrollbar overflow-x-auto"
      style={{ borderBottom: '0.5px solid var(--fg-5)' }}
    >
      <div
        className="px-6 md:px-12"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          height: 52,
          minWidth: 'max-content',
        }}
      >
        {items.map(({ href, label }) => {
          const isActive = pathname === href
          return (
            <Link
              key={href}
              href={href}
              style={{
                textDecoration: 'none',
                display: 'inline-block',
                background: isActive ? 'var(--fg-1)' : 'transparent',
                padding: '5px 10px',
                fontFamily: 'var(--font-mono)',
                fontSize: 10,
                fontWeight: 600,
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                color: isActive ? 'var(--bg-1)' : 'var(--fg-4)',
                transition:
                  'color 160ms var(--ease-std), background 160ms var(--ease-std)',
                flexShrink: 0,
              }}
              onMouseEnter={e => {
                if (!isActive)
                  (e.currentTarget as HTMLAnchorElement).style.color = 'var(--fg-1)'
              }}
              onMouseLeave={e => {
                if (!isActive)
                  (e.currentTarget as HTMLAnchorElement).style.color = 'var(--fg-4)'
              }}
            >
              {label}
            </Link>
          )
        })}
      </div>
    </div>
  )
}
