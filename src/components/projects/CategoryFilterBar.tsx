'use client'
import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import { cn } from '@/utils/cn'
import type { Category } from '@/types/content'

export default function CategoryFilterBar({ categories }: { categories: Category[] }) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const active = searchParams.get('category')

  function select(slug: string | null) {
    if (slug) {
      router.push(`${pathname}?category=${slug}`)
    } else {
      router.push(pathname)
    }
  }

  return (
    <div className="flex flex-wrap gap-2 mb-10">
      <button
        onClick={() => select(null)}
        className={cn(
          'px-4 py-2 rounded-full text-sm border transition-colors',
          !active
            ? 'bg-[var(--color-brand)] text-white border-[var(--color-brand)]'
            : 'border-[var(--color-text)] text-[var(--color-text)] hover:border-[var(--color-brand)] hover:text-[var(--color-brand)]'
        )}
      >
        All
      </button>
      {categories.map((cat) => (
        <button
          key={cat.id}
          onClick={() => select(cat.slug)}
          className={cn(
            'px-4 py-2 rounded-full text-sm border transition-colors',
            active === cat.slug
              ? 'bg-[var(--color-brand)] text-white border-[var(--color-brand)]'
              : 'border-[var(--color-text)] text-[var(--color-text)] hover:border-[var(--color-brand)] hover:text-[var(--color-brand)]'
          )}
        >
          {cat.name}
        </button>
      ))}
    </div>
  )
}
