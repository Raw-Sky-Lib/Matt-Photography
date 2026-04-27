import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { getProjectBySlug, getProjectSlugs } from '@/lib/queries'
import ProjectMediaGrid from '@/components/projects/ProjectMediaGrid'

export const revalidate = 3600

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

  return (
    <article>

      {/* ── Hero cover ─────────────────────────────────────────── */}
      <div style={{ position: 'relative', width: '100%', aspectRatio: '16/9', overflow: 'hidden', background: '#000' }}>
        {project.is_video_cover && project.cover_video_url?.startsWith('http') ? (
          <video
            src={project.cover_video_url}
            autoPlay muted loop playsInline
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
          />
        ) : project.cover_image_url ? (
          <Image
            src={project.cover_image_url}
            alt={project.title}
            fill
            style={{ objectFit: 'cover' }}
            priority
            sizes="100vw"
          />
        ) : (
          <div style={{ position: 'absolute', inset: 0, background: 'var(--bg-4)' }} />
        )}
      </div>

      {/* ── Project header ─────────────────────────────────────── */}
      <div
        className="px-6 md:px-12"
        style={{
          paddingTop: 'clamp(40px, 5vw, 64px)',
          paddingBottom: 'clamp(40px, 5vw, 64px)',
          borderBottom: '0.5px solid var(--fg-5)',
        }}
      >
        {/* Meta row + back link */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          gap: 24, marginBottom: 'clamp(20px, 3vw, 32px)',
        }}>
          <div style={{
            display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 12,
            fontFamily: 'var(--font-mono)', fontSize: 10,
            letterSpacing: '0.16em', textTransform: 'uppercase',
            color: 'var(--fg-4)',
          }}>
            {project.category?.name && <span>{project.category.name}</span>}
            {project.client_name && <><span style={{ opacity: 0.3 }}>·</span><span>{project.client_name}</span></>}
            {project.year         && <><span style={{ opacity: 0.3 }}>·</span><span>{project.year}</span></>}
            {project.meta?.location && <><span style={{ opacity: 0.3 }}>·</span><span>{project.meta.location}</span></>}
            {project.meta?.duration && <><span style={{ opacity: 0.3 }}>·</span><span>{project.meta.duration}</span></>}
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
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 5l-7 7 7 7"/>
            </svg>
            All Projects
          </Link>
        </div>

        {/* Title */}
        <h1 style={{
          fontFamily: 'var(--font-display)', fontWeight: 500,
          fontSize: 'clamp(40px, 8vw, 120px)', lineHeight: 0.96,
          letterSpacing: '-0.03em', textTransform: 'uppercase',
          color: 'var(--fg-1)', margin: 0,
        }}>
          {project.title}
        </h1>

        {project.subtitle && (
          <p style={{
            fontFamily: 'var(--font-sans)', fontSize: 'clamp(15px, 1.3vw, 17px)',
            lineHeight: 1.6, color: 'var(--fg-3)',
            maxWidth: 'none', margin: 'clamp(16px, 2vw, 24px) 0 0',
          }}>
            {project.subtitle}
          </p>
        )}
      </div>

      {/* ── Content: lead + body ───────────────────────────────── */}
      {(project.description || project.body) && (
        <div
          className="px-6 md:px-12"
          style={{
            paddingTop: 'clamp(48px, 6vw, 80px)',
            paddingBottom: 'clamp(48px, 6vw, 80px)',
            borderBottom: '0.5px solid var(--fg-5)',
          }}
        >
          {project.description && (
            <p style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 'clamp(18px, 2vw, 24px)',
              lineHeight: 1.65,
              color: 'var(--fg-1)',
              maxWidth: 'none',
              margin: project.body ? '0 0 clamp(40px, 5vw, 64px)' : 0,
            }}>
              {project.description}
            </p>
          )}

          {project.body && (
            <div className="prose" dangerouslySetInnerHTML={{ __html: project.body }} />
          )}
        </div>
      )}

      {/* ── Media grid ─────────────────────────────────────────── */}
      <ProjectMediaGrid media={project.media} />

    </article>
  )
}
