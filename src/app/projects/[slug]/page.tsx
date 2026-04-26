import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { getProjectBySlug, getProjectSlugs } from '@/lib/queries'

export const revalidate = 3600

const PLATES = [
  { bg: 'linear-gradient(165deg, #4a3b2e 0%, #2a1f16 45%, #120b07 100%)', glow: 'radial-gradient(ellipse 60% 45% at 35% 28%, rgba(255,198,142,0.22), transparent 60%)' },
  { bg: 'linear-gradient(160deg, #1c1a18 0%, #0a0908 60%, #060505 100%)', glow: 'radial-gradient(ellipse 45% 40% at 42% 30%, rgba(214,175,128,0.14), transparent 60%)' },
  { bg: 'linear-gradient(165deg, #3a4048 0%, #1e2227 50%, #0c0f12 100%)', glow: 'radial-gradient(ellipse 55% 50% at 70% 32%, rgba(188,210,228,0.18), transparent 65%)' },
]

export async function generateStaticParams() {
  const slugs = await getProjectSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const project = await getProjectBySlug(slug)
  return {
    title: project?.title ?? 'Project',
    description: project?.subtitle ?? undefined,
    openGraph: {
      images: project?.cover_image_url ? [project.cover_image_url] : [],
    },
  }
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const project = await getProjectBySlug(slug)
  if (!project) notFound()

  const plate = PLATES[0]

  return (
    <article>
      {/* Hero cover */}
      <div style={{ position: 'relative', width: '100%', aspectRatio: '16/9', overflow: 'hidden' }}>
        {project.cover_image_url ? (
          <Image
            src={project.cover_image_url}
            alt={project.title}
            fill
            style={{ objectFit: 'cover' }}
            priority
            sizes="100vw"
          />
        ) : (
          <>
            <div style={{ position: 'absolute', inset: 0, background: plate.bg }} />
            <div style={{ position: 'absolute', inset: 0, background: plate.glow }} />
            <div style={{
              position: 'absolute', inset: 0, pointerEvents: 'none', opacity: 0.35,
              backgroundImage: 'radial-gradient(rgba(255,255,255,0.06) 0.5px, transparent 0.8px)',
              backgroundSize: '3px 3px', mixBlendMode: 'overlay',
            }} />
          </>
        )}
      </div>

      {/* Project header */}
      <div
        className="px-6 md:px-12 grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-8 lg:gap-24 items-end"
        style={{
          paddingTop: 'clamp(40px, 6vw, 72px)',
          paddingBottom: 'clamp(40px, 6vw, 72px)',
          borderBottom: '1px solid var(--fg-5)',
        }}
      >
        <div>
          <h1 style={{
            fontFamily: 'var(--font-display)', fontWeight: 500,
            fontSize: 'clamp(40px, 8vw, 120px)', lineHeight: 0.96,
            letterSpacing: '-0.03em', textTransform: 'uppercase',
            color: 'var(--fg-1)', margin: '0 0 24px',
          }}>
            {project.title}
          </h1>
          {project.subtitle && (
            <p style={{
              fontFamily: 'var(--font-sans)', fontSize: 'clamp(15px, 1.5vw, 18px)',
              lineHeight: 1.6, color: 'var(--fg-3)',
              maxWidth: '52ch', margin: '0 0 24px',
            }}>
              {project.subtitle}
            </p>
          )}
          <div style={{
            display: 'flex', flexWrap: 'wrap', gap: 24,
            fontFamily: 'var(--font-mono)', fontSize: 10,
            letterSpacing: '0.12em', textTransform: 'uppercase',
            color: 'var(--fg-4)',
          }}>
            {project.category?.name && <span>{project.category.name}</span>}
            {project.client_name && <span>{project.client_name}</span>}
            {project.year && <span>{project.year}</span>}
          </div>
        </div>

        <Link
          href="/projects"
          style={{
            fontFamily: 'var(--font-mono)', fontSize: 10,
            letterSpacing: '0.14em', textTransform: 'uppercase',
            color: 'var(--fg-4)', textDecoration: 'none',
            display: 'inline-flex', alignItems: 'center', gap: 8,
            flexShrink: 0,
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 5l-7 7 7 7"/>
          </svg>
          All Projects
        </Link>
      </div>

      {/* Description + body + meta */}
      {(project.description || project.body || project.meta) && (
        <div
          className="px-6 md:px-12"
          style={{ paddingTop: 'clamp(48px, 6vw, 72px)', paddingBottom: 'clamp(48px, 6vw, 72px)', borderBottom: '1px solid var(--fg-5)' }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-12 lg:gap-24">

            {/* Left — text */}
            <div>
              {project.description && (
                <p style={{
                  fontFamily: 'var(--font-sans)', fontSize: 'clamp(16px, 1.6vw, 20px)',
                  lineHeight: 1.7, color: 'var(--fg-2)', maxWidth: '60ch',
                  marginBottom: project.body ? 'clamp(24px, 3vw, 40px)' : 0,
                }}>
                  {project.description}
                </p>
              )}
              {project.body && (
                <div
                  className="prose"
                  dangerouslySetInnerHTML={{ __html: project.body }}
                />
              )}
            </div>

            {/* Right — technical details */}
            {project.meta && (
              <div style={{
                fontFamily: 'var(--font-mono)', fontSize: 11,
                letterSpacing: '0.08em', textTransform: 'uppercase',
              }}>
                <div style={{ color: 'var(--fg-4)', marginBottom: 20 }}>Technical</div>
                <dl style={{ display: 'flex', flexDirection: 'column', gap: 14, margin: 0 }}>
                  {project.meta.location && (
                    <div>
                      <dt style={{ color: 'var(--fg-4)', marginBottom: 2 }}>Location</dt>
                      <dd style={{ color: 'var(--fg-2)', margin: 0 }}>{project.meta.location}</dd>
                    </div>
                  )}
                  {project.meta.camera && (
                    <div>
                      <dt style={{ color: 'var(--fg-4)', marginBottom: 2 }}>Camera</dt>
                      <dd style={{ color: 'var(--fg-2)', margin: 0 }}>{project.meta.camera}</dd>
                    </div>
                  )}
                  {project.meta.film_stock && (
                    <div>
                      <dt style={{ color: 'var(--fg-4)', marginBottom: 2 }}>Film</dt>
                      <dd style={{ color: 'var(--fg-2)', margin: 0 }}>{project.meta.film_stock}</dd>
                    </div>
                  )}
                  {project.meta.duration && (
                    <div>
                      <dt style={{ color: 'var(--fg-4)', marginBottom: 2 }}>Duration</dt>
                      <dd style={{ color: 'var(--fg-2)', margin: 0 }}>{project.meta.duration}</dd>
                    </div>
                  )}
                </dl>
              </div>
            )}

          </div>
        </div>
      )}

      {/* Media gallery */}
      {project.media.length > 0 && (
        <div style={{ paddingTop: 'clamp(48px, 6vw, 72px)', paddingBottom: 'clamp(64px, 8vw, 96px)' }}>

          {/* Images — 2-column grid */}
          {project.media.some(m => m.media_type === 'image') && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-px px-6 md:px-12">
              {project.media.filter(m => m.media_type === 'image').map((item, i) => (
                <div key={item.id} style={{ position: 'relative', aspectRatio: '4/3', overflow: 'hidden' }}>
                  {item.image_url ? (
                    <Image
                      src={item.image_url}
                      alt={item.alt_text}
                      fill
                      style={{ objectFit: 'cover' }}
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  ) : (
                    <>
                      <div style={{ position: 'absolute', inset: 0, background: PLATES[i % PLATES.length].bg }} />
                      <div style={{ position: 'absolute', inset: 0, background: PLATES[i % PLATES.length].glow }} />
                    </>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Videos — full width, stacked */}
          {project.media.filter(m => m.media_type === 'video').map(item => (
            <div key={item.id} className="px-6 md:px-12" style={{ marginTop: 'clamp(24px, 3vw, 40px)' }}>
              <video
                src={item.video_url ?? undefined}
                controls
                playsInline
                style={{ width: '100%', aspectRatio: '16/9', background: '#000', display: 'block' }}
                aria-label={item.alt_text}
              />
            </div>
          ))}

        </div>
      )}
    </article>
  )
}
