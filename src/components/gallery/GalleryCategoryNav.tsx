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
    <div className="px-6 md:px-12 flex flex-wrap">
      {items.map(({ href, label }) => {
        const isActive = pathname === href
        return (
          <Link
            key={href}
            href={href}
            style={{
              textDecoration: 'none', display: 'inline-block',
              padding: '16px 20px 14px',
              fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 600,
              letterSpacing: '0.16em', textTransform: 'uppercase',
              color: isActive ? 'var(--fg-1)' : 'var(--fg-4)',
              borderBottom: isActive ? '2px solid var(--fg-1)' : '2px solid transparent',
              transition: 'color 200ms var(--ease-std), border-color 200ms var(--ease-std)',
              marginBottom: -1,
            }}
          >
            {label}
          </Link>
        )
      })}
    </div>
  )
}
