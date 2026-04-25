'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/utils/cn'
import type { Category } from '@/types/content'

export default function GalleryCategoryNav({ categories }: { categories: Category[] }) {
  const pathname = usePathname()

  return (
    <nav className="flex flex-wrap gap-2 mb-10" aria-label="Gallery categories">
      <Link
        href="/gallery"
        className={cn(
          'px-4 py-2 rounded-full text-sm border transition-colors',
          pathname === '/gallery'
            ? 'bg-[var(--color-brand)] text-white border-[var(--color-brand)]'
            : 'border-[var(--color-text)] text-[var(--color-text)] hover:border-[var(--color-brand)] hover:text-[var(--color-brand)]'
        )}
      >
        All
      </Link>
      {categories.map((cat) => (
        <Link
          key={cat.id}
          href={`/gallery/${cat.slug}`}
          className={cn(
            'px-4 py-2 rounded-full text-sm border transition-colors',
            pathname === `/gallery/${cat.slug}`
              ? 'bg-[var(--color-brand)] text-white border-[var(--color-brand)]'
              : 'border-[var(--color-text)] text-[var(--color-text)] hover:border-[var(--color-brand)] hover:text-[var(--color-brand)]'
          )}
        >
          {cat.name}
        </Link>
      ))}
    </nav>
  )
}
