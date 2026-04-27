import Image from 'next/image'
import type { AboutHeroSection as AboutHeroSectionType } from '@/types/content'

export default function AboutHeroSection({
  data,
  bio,
}: {
  data: AboutHeroSectionType
  bio?: string
}) {
  return (
    <section style={{ background: '#fff', overflow: 'hidden' }}>
      <div
        className="grid grid-cols-1 lg:grid-cols-2"
        style={{ minHeight: 'clamp(520px, 85vh, 960px)' }}
      >
        {/* Left — label top, headline + bio pinned to bottom */}
        <div
          className="px-6 md:px-12"
          style={{
            display: 'flex', flexDirection: 'column',
            justifyContent: 'space-between',
            paddingTop: 'clamp(120px, 14vw, 180px)',
            paddingBottom: 'clamp(64px, 8vw, 96px)',
          }}
        >
          {/* Label */}
          <div style={{
            fontFamily: 'var(--font-mono)', fontSize: 10,
            letterSpacing: '0.2em', textTransform: 'uppercase',
            color: 'var(--fg-4)',
          }}>
            About
          </div>

          {/* Headline + bio */}
          <div>
            <h1 style={{
              fontFamily: 'var(--font-display)', fontWeight: 500,
              fontSize: 'clamp(52px, 8vw, 120px)', lineHeight: 0.94,
              letterSpacing: '-0.03em', textTransform: 'uppercase',
              color: 'var(--fg-1)', margin: 0,
            }}>
              {data.headline}
            </h1>

            {bio && (
              <div
                className="bio-body"
                dangerouslySetInnerHTML={{ __html: bio }}
                style={{
                  marginTop: 'clamp(24px, 3vw, 40px)',
                  fontFamily: 'var(--font-sans)',
                  fontSize: 'clamp(16px, 1.6vw, 20px)',
                  lineHeight: 1.75,
                  color: 'var(--fg-2)',
                  maxWidth: '52ch',
                }}
              />
            )}
          </div>
        </div>

        {/* Right — portrait fills full column height */}
        {data.portrait_image_url ? (
          <div style={{ position: 'relative', minHeight: 480 }}>
            <Image
              src={data.portrait_image_url}
              alt="Matt Banton"
              fill
              style={{ objectFit: 'cover', objectPosition: 'center top' }}
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        ) : (
          <div style={{ background: 'var(--bg-3)', minHeight: 480 }} />
        )}
      </div>
    </section>
  )
}
