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
  const [isMobile, setIsMobile]     = useState(false)
  const pathname    = usePathname()
  const headerRef   = useRef<HTMLElement>(null)
  const overlayRef  = useRef<HTMLDivElement>(null)

  const isHome = pathname === '/'
  const dark   = (isHome && !scrolled) || mobileOpen

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 946)
    check()
    window.addEventListener('resize', check, { passive: true })
    return () => window.removeEventListener('resize', check)
  }, [])

  useEffect(() => { setMobileOpen(false) }, [pathname])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  useEffect(() => {
    if (!mobileOpen) return
    const handler = (e: MouseEvent) => {
      const target = e.target as Node
      if (
        !headerRef.current?.contains(target) &&
        !overlayRef.current?.contains(target)
      ) {
        setMobileOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [mobileOpen])

  const fg  = dark ? '#fff'                   : 'var(--fg-1)'
  const dim = dark ? 'rgba(255,255,255,0.55)' : 'var(--fg-3)'

  return (
    <>
      <header
        ref={headerRef}
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
        <nav style={{ gap: 2, display: isMobile ? 'none' : 'flex' }}>
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

        {/* Availability */}
        {settings.booking_status && (
          <div style={{
            display: isMobile ? 'none' : 'flex',
            alignItems: 'center', gap: 14,
            color: fg, fontFamily: 'var(--font-mono)', fontSize: 11,
            letterSpacing: '0.1em', textTransform: 'uppercase',
            transition: 'color 300ms',
          }}>
            <span style={{
              width: 6, height: 6, borderRadius: 0,
              background: '#34c759', display: 'inline-block', flexShrink: 0,
            }}/>
            Available — {settings.booking_status}
          </div>
        )}

        {/* Mobile hamburger / close */}
        <button
          type="button"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          style={{
            display: isMobile ? 'flex' : 'none',
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
      </header>

      {/* Full-screen mobile nav — sibling to header so z-index works correctly */}
      {isMobile && (
        <div
          ref={overlayRef}
          style={{
            position: 'fixed', inset: 0, zIndex: 40,
            background: '#0a0a0a',
            display: 'flex', flexDirection: 'column',
            opacity: mobileOpen ? 1 : 0,
            pointerEvents: mobileOpen ? 'auto' : 'none',
            transition: 'opacity 480ms cubic-bezier(0.2,0,0.2,1)',
          }}
        >
          {/* Nav items — top padding clears the fixed header */}
          <div style={{
            flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center',
            padding: '68px clamp(24px, 6vw, 48px) 0',
          }}>
            {navItems.map((item, i) => {
              const active = pathname === item.url || (item.url !== '/' && pathname.startsWith(item.url))
              return (
                <div
                  key={item.id}
                  style={{
                    borderTop: '1px solid rgba(255,255,255,0.07)',
                    opacity: mobileOpen ? 1 : 0,
                    transform: mobileOpen ? 'translateY(0)' : 'translateY(20px)',
                    transition: `opacity 500ms ${100 + i * 60}ms cubic-bezier(0.2,0,0.2,1), transform 500ms ${100 + i * 60}ms cubic-bezier(0.2,0,0.2,1)`,
                  }}
                >
                  <Link
                    href={item.url}
                    style={{
                      display: 'flex', alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: 'clamp(14px, 2.5vw, 20px) 0',
                      textDecoration: 'none',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: 18 }}>
                      <span style={{
                        fontFamily: 'var(--font-mono)', fontSize: 9,
                        letterSpacing: '0.16em', color: 'rgba(255,255,255,0.2)',
                        minWidth: 20, flexShrink: 0,
                      }}>
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span style={{
                        fontFamily: 'var(--font-display)', fontWeight: 500,
                        fontSize: 'clamp(36px, 10vw, 64px)',
                        lineHeight: 1.0, letterSpacing: '-0.02em',
                        textTransform: 'uppercase',
                        color: active ? '#fff' : 'rgba(255,255,255,0.3)',
                        transition: 'color 260ms',
                      }}>
                        {active ? `( ${item.label} )` : item.label}
                      </span>
                    </div>
                    <svg
                      width="16" height="16" viewBox="0 0 24 24" fill="none"
                      stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
                      style={{ color: active ? 'rgba(255,255,255,0.6)' : 'rgba(255,255,255,0.15)', flexShrink: 0 }}
                    >
                      <path d="M7 17 17 7M7 7h10v10"/>
                    </svg>
                  </Link>
                </div>
              )
            })}
            <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }} />
          </div>

          {/* Bottom meta */}
          <div style={{
            padding: 'clamp(20px, 4vw, 32px) clamp(24px, 6vw, 48px)',
            borderTop: '1px solid rgba(255,255,255,0.07)',
            display: 'flex', flexDirection: 'column', gap: 16,
            opacity: mobileOpen ? 1 : 0,
            transition: 'opacity 500ms 380ms cubic-bezier(0.2,0,0.2,1)',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              {settings.booking_status && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ width: 5, height: 5, background: '#34c759', display: 'inline-block', flexShrink: 0 }}/>
                  <span style={{
                    fontFamily: 'var(--font-mono)', fontSize: 9,
                    letterSpacing: '0.18em', textTransform: 'uppercase',
                    color: 'rgba(255,255,255,0.35)',
                  }}>
                    Available — {settings.booking_status}
                  </span>
                </div>
              )}
              {settings.location && (
                <span style={{
                  fontFamily: 'var(--font-mono)', fontSize: 9,
                  letterSpacing: '0.18em', textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.2)',
                }}>
                  {settings.location}
                </span>
              )}
            </div>
            {(settings.contact_email || settings.social_instagram) && (
              <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
                {settings.contact_email && (
                  <a href={`mailto:${settings.contact_email}`} style={{
                    fontFamily: 'var(--font-mono)', fontSize: 9,
                    letterSpacing: '0.14em', textTransform: 'lowercase',
                    color: 'rgba(255,255,255,0.35)', textDecoration: 'none',
                  }}>
                    {settings.contact_email}
                  </a>
                )}
                {settings.social_instagram && (
                  <a href={settings.social_instagram} target="_blank" rel="noopener noreferrer" style={{
                    fontFamily: 'var(--font-mono)', fontSize: 9,
                    letterSpacing: '0.18em', textTransform: 'uppercase',
                    color: 'rgba(255,255,255,0.25)', textDecoration: 'none',
                  }}>
                    Instagram ↗
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}
