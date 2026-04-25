'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/utils/cn'

interface NavLinkProps {
  href: string
  isExternal?: boolean
  children: React.ReactNode
}

export default function NavLink({ href, isExternal, children }: NavLinkProps) {
  const pathname = usePathname()
  const isActive = pathname === href || (href !== '/' && pathname.startsWith(href))

  return (
    <Link
      href={href}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noopener noreferrer' : undefined}
      className={cn(
        'text-sm transition-colors',
        isActive
          ? 'text-[var(--color-brand)] font-medium'
          : 'text-[var(--color-text)] hover:text-[var(--color-brand)]'
      )}
    >
      {children}
    </Link>
  )
}
