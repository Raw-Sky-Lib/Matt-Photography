import Link from 'next/link'
import Image from 'next/image'
import { getSiteSettings, getNavItems } from '@/lib/queries'

export default async function Footer() {
  const [settings, navItems] = await Promise.all([getSiteSettings(), getNavItems()])
  const year = new Date().getFullYear()

  const socials = [
    settings.social_instagram && { href: settings.social_instagram, label: 'Instagram' },
    settings.social_vimeo     && { href: settings.social_vimeo,     label: 'Vimeo' },
    settings.social_twitter   && { href: settings.social_twitter,   label: 'Twitter / X' },
    settings.social_facebook  && { href: settings.social_facebook,  label: 'Facebook' },
  ].filter(Boolean) as { href: string; label: string }[]

  // Trim nav to key pages only (skip Home — logo already links there)
  const keyNav = navItems.filter(item => item.url !== '/')

  return (
    <footer style={{ background: '#0a0a0a', color: '#fff', fontFamily: 'var(--font-sans)' }}>

      {/* ── Three-column grid ───────────────────────────────── */}
      <div
        className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 px-6 md:px-12"
        style={{
          paddingTop: 'clamp(64px, 8vw, 96px)',
          paddingBottom: 'clamp(48px, 6vw, 72px)',
          borderBottom: '1px solid rgba(255,255,255,0.1)',
        }}
      >

        {/* Col 1 — Identity */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
          {/* Logo + name */}
          <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, textDecoration: 'none', marginBottom: 28 }}>
            <Image
              src="/logo.webp"
              alt={settings.site_name}
              width={20}
              height={20}
              style={{ width: 20, height: 20, objectFit: 'contain', filter: 'invert(1)' }}
            />
            <span style={{
              fontFamily: 'var(--font-sans)', fontSize: 12, fontWeight: 700,
              letterSpacing: '0.1em', textTransform: 'uppercase', color: '#fff',
            }}>
              {settings.site_name}
            </span>
          </Link>

          {/* Tagline */}
          {settings.tagline && (
            <p style={{
              fontFamily: 'var(--font-sans)', fontSize: 13,
              lineHeight: 1.6, color: 'rgba(255,255,255,0.45)',
              margin: '0 0 24px', maxWidth: 260,
            }}>
              {settings.tagline}
            </p>
          )}

          {/* Availability */}
          {settings.booking_status && (
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              fontFamily: 'var(--font-mono)', fontSize: 10,
              letterSpacing: '0.12em', textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.5)', marginBottom: 12,
            }}>
              <span style={{ width: 5, height: 5, background: '#34c759', flexShrink: 0 }}/>
              {settings.booking_status}
            </div>
          )}

          {/* Location */}
          {settings.location && (
            <div style={{
              fontFamily: 'var(--font-mono)', fontSize: 10,
              letterSpacing: '0.1em', textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.3)',
            }}>
              {settings.location}
            </div>
          )}
        </div>

        {/* Col 2 — Site nav (key pages only) */}
        <div>
          <div style={{
            fontSize: 10, fontWeight: 700, letterSpacing: '0.22em',
            textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)',
            marginBottom: 20,
          }}>
            Pages
          </div>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 13 }}>
            {keyNav.map((item) => (
              <li key={item.id}>
                <Link
                  href={item.url}
                  target={item.is_external ? '_blank' : undefined}
                  className="footer-nav-link"
                  style={{ fontSize: 13, color: 'rgba(255,255,255,0.55)', textDecoration: 'none', display: 'inline-block' }}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 3 — Contact + social */}
        <div>
          <div style={{
            fontSize: 10, fontWeight: 700, letterSpacing: '0.22em',
            textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)',
            marginBottom: 20,
          }}>
            Contact
          </div>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 13, fontSize: 13 }}>
            {settings.contact_email && (
              <li>
                <a href={`mailto:${settings.contact_email}`} className="footer-nav-link" style={{ color: 'rgba(255,255,255,0.55)', textDecoration: 'none' }}>
                  {settings.contact_email}
                </a>
              </li>
            )}
            {settings.contact_phone && (
              <li>
                <a href={`tel:${settings.contact_phone}`} className="footer-nav-link" style={{ color: 'rgba(255,255,255,0.55)', textDecoration: 'none' }}>
                  {settings.contact_phone}
                </a>
              </li>
            )}
            {socials.length > 0 && (
              <>
                <li style={{ height: 1, background: 'rgba(255,255,255,0.08)', margin: '4px 0' }}/>
                {socials.map(({ href, label }) => (
                  <li key={label}>
                    <a href={href} target="_blank" rel="noopener noreferrer" className="footer-nav-link" style={{ color: 'rgba(255,255,255,0.55)', textDecoration: 'none' }}>
                      {label}
                    </a>
                  </li>
                ))}
              </>
            )}
          </ul>
        </div>

      </div>

      {/* ── Bottom bar ──────────────────────────────────────── */}
      <div className="flex justify-between items-center px-6 md:px-12 py-5">
        <span style={{
          fontFamily: 'var(--font-mono)', fontSize: 10,
          color: 'rgba(255,255,255,0.3)', letterSpacing: '0.12em',
        }}>
          © {year} {settings.site_name.toUpperCase()} · ALL RIGHTS RESERVED
        </span>
        <a
          href="#"
          className="footer-nav-link"
          style={{
            fontFamily: 'var(--font-mono)', fontSize: 10,
            color: 'rgba(255,255,255,0.3)', letterSpacing: '0.12em',
            textDecoration: 'none', textTransform: 'uppercase',
          }}
        >
          ↑ Top
        </a>
      </div>

    </footer>
  )
}
