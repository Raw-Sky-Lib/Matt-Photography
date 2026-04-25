'use client'
import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import type { Category } from '@/types/content'

export default function CategoryFilterBar({ categories }: { categories: Category[] }) {
  const router   = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const active   = searchParams.get('category')

  function select(slug: string | null) {
    router.push(slug ? `${pathname}?category=${slug}` : pathname)
  }

  const items = [
    { slug: null, label: 'All' },
    ...categories.map(c => ({ slug: c.slug, label: c.name })),
  ]

  return (
    <div className="px-6 md:px-12 flex flex-wrap">
      {items.map(({ slug, label }) => {
        const isActive = active === slug
        return (
          <button
            key={slug ?? 'all'}
            type="button"
            onClick={() => select(slug)}
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
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
          </button>
        )
      })}
    </div>
  )
}
