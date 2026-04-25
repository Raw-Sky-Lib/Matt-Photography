'use client'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import type { NavItem, SiteSettings } from '@/types/content'

interface Props {
  settings: SiteSettings
  navItems: NavItem[]
}

export default function HeaderClient({ settings, navItems }: Props) {
  const [scrolled, setScrolled]     = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname  = usePathname()
  const menuRef   = useRef<HTMLDivElement>(null)

  const isHome = pathname === '/'
  const dark   = isHome && !scrolled

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  useEffect(() => { setMobileOpen(false) }, [pathname])

  useEffect(() => {
    if (!mobileOpen) return
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMobileOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [mobileOpen])

  const fg  = dark ? '#fff'                   : 'var(--fg-1)'
  const dim = dark ? 'rgba(255,255,255,0.55)' : 'var(--fg-3)'

  return (
    <header
      ref={menuRef}
      className="px-6 md:px-12"
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        paddingTop: 22, paddingBottom: 22,
        background: dark ? 'transparent' : '#fff',
        borderBottom: dark ? '1px solid transparent' : '1px solid var(--fg-1)',
        transition: 'background 300ms, border-color 300ms',
      }}
    >
      {/* Logo */}
      <Link href="/" style={{
        display: 'flex', alignItems: 'center', gap: 12,
        cursor: 'pointer', color: fg, textDecoration: 'none',
      }}>
        <Image
          src="/logo.webp"
          alt={settings.site_name}
          width={24}
          height={24}
          style={{
            width: 24, height: 24, objectFit: 'contain',
            filter: dark ? 'invert(1)' : 'none',
            transition: 'filter 300ms',
          }}
        />
        <span style={{
          fontFamily: 'var(--font-sans)', fontSize: 13, fontWeight: 700,
          letterSpacing: '0.08em', color: fg, transition: 'color 300ms',
        }}>
          {settings.site_name.toUpperCase()}
        </span>
      </Link>

      {/* Desktop nav */}
      <nav style={{ gap: 2 }} className="hidden md:flex">
        {navItems.map((item) => {
          const active = pathname === item.url || (item.url !== '/' && pathname.startsWith(item.url))
          return (
            <Link
              key={item.id}
              href={item.url}
              target={item.is_external ? '_blank' : undefined}
              rel={item.is_external ? 'noopener noreferrer' : undefined}
              style={{
                fontFamily: 'var(--font-sans)', fontSize: 11, fontWeight: 600,
                letterSpacing: '0.2em', textTransform: 'uppercase',
                color: active ? fg : dim,
                padding: '8px 16px', textDecoration: 'none',
                transition: 'color 260ms',
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = fg)}
              onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = active ? fg : dim)}
            >
              {active ? `( ${item.label} )` : item.label}
            </Link>
          )
        })}
      </nav>

      {/* Availability — from settings.booking_status */}
      {settings.booking_status && (
        <div style={{
          alignItems: 'center', gap: 14,
          color: fg, fontFamily: 'var(--font-mono)', fontSize: 11,
          letterSpacing: '0.1em', textTransform: 'uppercase',
          transition: 'color 300ms',
        }} className="hidden md:flex">
          <span style={{
            width: 6, height: 6, borderRadius: 0,
            background: '#34c759', display: 'inline-block', flexShrink: 0,
          }}/>
          Available — {settings.booking_status}
        </div>
      )}

      {/* Mobile hamburger */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
        className="flex md:hidden"
        style={{
          background: 'none', border: 'none', cursor: 'pointer',
          color: fg, padding: 8,
          flexDirection: 'column', gap: 5,
          transition: 'color 300ms',
        }}
      >
        <span style={{ display: 'block', width: 22, height: 1, background: 'currentColor', transition: 'transform 260ms', transform: mobileOpen ? 'translateY(6px) rotate(45deg)' : 'none' }}/>
        <span style={{ display: 'block', width: 22, height: 1, background: 'currentColor', transition: 'opacity 260ms', opacity: mobileOpen ? 0 : 1 }}/>
        <span style={{ display: 'block', width: 22, height: 1, background: 'currentColor', transition: 'transform 260ms', transform: mobileOpen ? 'translateY(-6px) rotate(-45deg)' : 'none' }}/>
      </button>

      {/* Mobile menu */}
      {mobileOpen && (
        <div style={{
          position: 'absolute', top: '100%', left: 0, right: 0,
          background: '#fff', borderBottom: '1px solid var(--fg-1)',
          padding: '24px 24px 32px',
          display: 'flex', flexDirection: 'column', gap: 20,
        }} className="md:hidden">
          {navItems.map((item) => (
            <Link
              key={item.id}
              href={item.url}
              style={{
                fontFamily: 'var(--font-sans)', fontSize: 13, fontWeight: 600,
                letterSpacing: '0.1em', textTransform: 'uppercase',
                color: 'var(--fg-1)', textDecoration: 'none',
              }}
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  )
}
