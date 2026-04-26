import Image from 'next/image'
import type { AboutHeroSection as AboutHeroSectionType } from '@/types/content'

export default function AboutHeroSection({ data }: { data: AboutHeroSectionType }) {
  return (
    <section>
      <div
        className="px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-0"
        style={{
          paddingTop: 'clamp(80px, 12vw, 140px)',
          paddingBottom: 'clamp(64px, 8vw, 96px)',
        }}
      >
        {/* Left — label + headline */}
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
          <div style={{
            fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 600,
            letterSpacing: '0.2em', textTransform: 'uppercase',
            color: 'var(--fg-4)', marginBottom: 24,
          }}>
            About
          </div>
          <h1 style={{
            fontFamily: 'var(--font-display)', fontWeight: 500,
            fontSize: 'clamp(44px, 7vw, 104px)', lineHeight: 0.96,
            letterSpacing: '-0.03em', textTransform: 'uppercase',
            color: 'var(--fg-1)', margin: 0,
          }}>
            {data.headline}
          </h1>
        </div>

        {/* Right — portrait */}
        {data.portrait_image_url && (
          <div style={{
            position: 'relative',
            aspectRatio: '3/4',
            overflow: 'hidden',
          }}>
            <Image
              src={data.portrait_image_url}
              alt="Matt Banton"
              fill
              style={{ objectFit: 'cover' }}
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        )}
      </div>
    </section>
  )
}
