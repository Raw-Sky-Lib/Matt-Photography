import Link from 'next/link'
import { getSiteSettings, getNavItems } from '@/lib/queries'

const SOCIAL_ICONS: Record<string, string> = {
  instagram: 'Instagram',
  vimeo: 'Vimeo',
  twitter: 'Twitter / X',
}

export default async function Footer() {
  const [settings, navItems] = await Promise.all([getSiteSettings(), getNavItems()])
  const year = new Date().getFullYear()

  const socials = [
    settings.social_instagram && { href: settings.social_instagram, label: 'Instagram' },
    settings.social_vimeo     && { href: settings.social_vimeo,     label: 'Vimeo' },
    settings.social_twitter   && { href: settings.social_twitter,   label: 'Twitter / X' },
  ].filter(Boolean) as { href: string; label: string }[]

  return (
    <footer style={{ background: '#0a0a0a', color: '#fff', fontFamily: 'var(--font-sans)' }}>
      <div style={{
        padding: '72px 48px 28px',
        display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: 32,
        paddingBottom: 56, borderBottom: '1px solid rgba(255,255,255,0.18)',
      }} className="grid-cols-1 md:grid-cols-[2fr_1fr_1fr_1fr]">
        {/* Brand block */}
        <div>
          <div style={{
            fontFamily: 'var(--font-display)', fontWeight: 500,
            textTransform: 'uppercase', fontSize: 'clamp(32px,4vw,56px)',
            lineHeight: 1.04, letterSpacing: '-0.02em', color: '#fff',
          }}>
            Let&apos;s make<br/>something<br/>together.
          </div>
          <p style={{
            marginTop: 28, maxWidth: 320, fontSize: 14,
            color: 'rgba(255,255,255,0.65)', lineHeight: 1.55,
          }}>
            {settings.location ?? 'London'} — based, Europe — roaming.
            Most enquiries get a reply within a working day.
          </p>
        </div>

        {/* Site nav */}
        <div>
          <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', marginBottom: 16 }}>
            Site
          </div>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
            {navItems.map((item) => (
              <li key={item.id}>
                <Link
                  href={item.url}
                  target={item.is_external ? '_blank' : undefined}
                  style={{ fontSize: 13, color: 'rgba(255,255,255,0.78)', textDecoration: 'none' }}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', marginBottom: 16 }}>
            Contact
          </div>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10, fontSize: 13, color: 'rgba(255,255,255,0.78)' }}>
            {settings.contact_email && (
              <li>
                <a href={`mailto:${settings.contact_email}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                  {settings.contact_email}
                </a>
              </li>
            )}
            {settings.contact_phone && (
              <li>
                <a href={`tel:${settings.contact_phone}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                  {settings.contact_phone}
                </a>
              </li>
            )}
            {settings.location && <li>{settings.location}</li>}
          </ul>
        </div>

        {/* Elsewhere */}
        {socials.length > 0 && (
          <div>
            <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', marginBottom: 16 }}>
              Elsewhere
            </div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10, fontSize: 13, color: 'rgba(255,255,255,0.78)' }}>
              {socials.map(({ href, label }) => (
                <li key={label}>
                  <a href={href} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Bottom bar */}
      <div style={{ padding: '20px 48px 28px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.1em' }}>
          © {year} {settings.site_name.toUpperCase()} · ALL RIGHTS RESERVED
        </span>
        {settings.location && (
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.1em' }}>
            ( {settings.location.toUpperCase()} )
          </span>
        )}
      </div>
    </footer>
  )
}
