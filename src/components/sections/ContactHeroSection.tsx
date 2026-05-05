import type { ContactHeroSection as ContactHeroSectionType, SiteSettings } from '@/types/content'
import OfficeStatus from '@/components/ui/OfficeStatus'

interface Props {
  data: ContactHeroSectionType
  settings: SiteSettings
}

export default function ContactHeroSection({ data, settings }: Props) {
  return (
    <div style={{ position: 'sticky', top: 120 }}>

      {/* Eyebrow */}
      <div style={{
        fontFamily: 'var(--font-sans)',
        fontSize: 11,
        fontWeight: 700,
        letterSpacing: '0.2em',
        textTransform: 'uppercase',
        color: 'var(--fg-3)',
        marginBottom: 24,
      }}>
        Contact
      </div>

      {/* Display headline */}
      <h1 style={{
        fontFamily: 'var(--font-display)',
        fontWeight: 500,
        fontSize: 'clamp(48px, 6vw, 96px)',
        lineHeight: 1.02,
        letterSpacing: '-0.012em',
        textTransform: 'uppercase',
        color: 'var(--fg-1)',
        margin: 0,
        paddingBottom: '0.06em',
      }}>
        {data.headline}
      </h1>

      {/* Subheadline */}
      {data.subheadline && (
        <p style={{
          marginTop: 28,
          fontFamily: 'var(--font-sans)',
          fontSize: 16,
          lineHeight: 1.55,
          color: 'var(--fg-2)',
          maxWidth: '36ch',
        }}>
          {data.subheadline}
        </p>
      )}

      {/* Office status — live clock, client island */}
      <div style={{ marginTop: 32 }}>
        <OfficeStatus
          timezone={settings.location?.toLowerCase().includes('vienna') ? 'Europe/Vienna' : 'Europe/London'}
          label={settings.location?.split(',')[0] ?? 'London'}
        />
      </div>

    </div>
  )
}
