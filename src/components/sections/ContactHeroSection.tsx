import type { ContactHeroSection as ContactHeroSectionType } from '@/types/content'

interface Props {
  data: ContactHeroSectionType
  email?: string | null
  phone?: string | null
}

export default function ContactHeroSection({ data, email, phone }: Props) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {/* Label */}
      <div style={{
        fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 600,
        letterSpacing: '0.2em', textTransform: 'uppercase',
        color: 'var(--fg-4)', marginBottom: 24,
      }}>
        Contact
      </div>

      {/* Headline */}
      <h1 style={{
        fontFamily: 'var(--font-display)', fontWeight: 500,
        fontSize: 'clamp(44px, 6vw, 88px)', lineHeight: 0.96,
        letterSpacing: '-0.03em', textTransform: 'uppercase',
        color: 'var(--fg-1)', margin: '0 0 clamp(24px, 3vw, 40px)',
      }}>
        {data.headline}
      </h1>

      {/* Subheadline */}
      <p style={{
        fontFamily: 'var(--font-sans)', fontSize: 'clamp(15px, 1.4vw, 17px)',
        lineHeight: 1.7, color: 'var(--fg-3)',
        margin: '0 0 clamp(40px, 6vw, 72px)', maxWidth: '42ch',
      }}>
        {data.subheadline}
      </p>

      {/* Contact details */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginTop: 'auto' }}>
        {email && (
          <div>
            <div style={{
              fontFamily: 'var(--font-mono)', fontSize: 9, fontWeight: 600,
              letterSpacing: '0.18em', textTransform: 'uppercase',
              color: 'var(--fg-4)', marginBottom: 6,
            }}>
              Email
            </div>
            <a
              href={`mailto:${email}`}
              style={{
                fontFamily: 'var(--font-sans)', fontSize: 'clamp(14px, 1.3vw, 16px)',
                color: 'var(--fg-2)', textDecoration: 'none',
              }}
            >
              {email}
            </a>
          </div>
        )}
        {phone && (
          <div>
            <div style={{
              fontFamily: 'var(--font-mono)', fontSize: 9, fontWeight: 600,
              letterSpacing: '0.18em', textTransform: 'uppercase',
              color: 'var(--fg-4)', marginBottom: 6,
            }}>
              Phone
            </div>
            <a
              href={`tel:${phone}`}
              style={{
                fontFamily: 'var(--font-sans)', fontSize: 'clamp(14px, 1.3vw, 16px)',
                color: 'var(--fg-2)', textDecoration: 'none',
              }}
            >
              {phone}
            </a>
          </div>
        )}
      </div>
    </div>
  )
}
