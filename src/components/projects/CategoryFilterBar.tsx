'use client'
import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import type { Category } from '@/types/content'

export default function CategoryFilterBar({ categories }: { categories: Category[] }) {
  const router   = useRouter()
  const pathname = usePathname()
  const sp       = useSearchParams()
  const active   = sp.get('category')

  function select(slug: string | null) {
    router.push(slug ? `${pathname}?category=${slug}` : pathname)
  }

  const items = [
    { slug: null, label: 'All' },
    ...categories.map(c => ({ slug: c.slug, label: c.name })),
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
        {/* Filter items */}
        {items.map(({ slug, label }) => {
          const isActive = active === slug
          return (
            <button
              key={slug ?? 'all'}
              type="button"
              onClick={() => select(slug)}
              onMouseEnter={e => {
                if (!isActive)
                  (e.currentTarget as HTMLButtonElement).style.color = 'var(--fg-1)'
              }}
              onMouseLeave={e => {
                if (!isActive)
                  (e.currentTarget as HTMLButtonElement).style.color = 'var(--fg-4)'
              }}
              style={{
                background: isActive ? 'var(--fg-1)' : 'transparent',
                border: 'none',
                cursor: 'pointer',
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
            >
              {label}
            </button>
          )
        })}
      </div>
    </div>
  )
}
