import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getProjectBySlug, getProjectSlugs } from '@/lib/queries'
import ProjectMediaGrid from '@/components/projects/ProjectMediaGrid'
import ProjectHero from '@/components/projects/ProjectHero'

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

  const meta = [
    project.category?.name  && { label: 'Category', value: project.category.name },
    project.client_name     && { label: 'Client',   value: project.client_name },
    project.year            && { label: 'Year',     value: String(project.year) },
    project.meta?.location  && { label: 'Location', value: project.meta.location },
    project.meta?.duration  && { label: 'Duration', value: project.meta.duration },
    project.meta?.camera    && { label: 'Camera',   value: project.meta.camera },
    project.meta?.film_stock && { label: 'Film',    value: project.meta.film_stock },
  ].filter(Boolean) as { label: string; value: string }[]

  return (
    <article>

      <ProjectHero
        title={project.title}
        category={project.category?.name}
        year={project.year}
        coverImageUrl={project.cover_image_url}
        coverVideoUrl={project.cover_video_url}
        isVideoCover={project.is_video_cover}
      />

      {/* ── Header ───────────────────────────────────────────────── */}
      <div
        className="px-6 md:px-12"
        style={{ paddingTop: 'clamp(36px, 4vw, 52px)', paddingBottom: 'clamp(56px, 7vw, 88px)' }}
      >

        {/* Back link */}
        <Link
          href="/projects"
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            fontFamily: 'var(--font-mono)', fontSize: 10,
            letterSpacing: '0.16em', textTransform: 'uppercase',
            color: 'var(--fg-4)', textDecoration: 'none',
            marginBottom: 'clamp(28px, 3.5vw, 44px)',
          }}
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 5l-7 7 7 7"/>
          </svg>
          All Projects
        </Link>

        {/* Title */}
        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 500,
          fontSize: 'clamp(44px, 8vw, 120px)',
          lineHeight: 0.96,
          letterSpacing: '-0.03em',
          textTransform: 'uppercase',
          color: 'var(--fg-1)',
          margin: 0,
        }}>
          {project.title}
        </h1>

        {/* Rule */}
        <div style={{
          borderBottom: '1px solid var(--fg-5)',
          marginTop: 'clamp(32px, 4vw, 48px)',
          marginBottom: 'clamp(32px, 4vw, 48px)',
        }} />

        {/* Description + meta columns */}
        <div
          className="grid grid-cols-1 lg:grid-cols-[1fr_220px]"
          style={{ gap: 'clamp(40px, 5vw, 64px)', alignItems: 'start' }}
        >

          {/* Description */}
          {(project.description || project.body) ? (
            <div>
              {project.description && (
                <p style={{
                  fontFamily: 'var(--font-sans)',
                  fontWeight: 400,
                  fontSize: 'clamp(15px, 1.4vw, 18px)',
                  lineHeight: 1.8,
                  color: 'var(--fg-2)',
                  margin: project.body ? '0 0 clamp(32px, 4vw, 48px)' : 0,
                  maxWidth: '58ch',
                }}>
                  {project.description}
                </p>
              )}
              {project.body && (
                <div className="prose" dangerouslySetInnerHTML={{ __html: project.body }} />
              )}
            </div>
          ) : (
            <div />
          )}

          {/* Meta detail column */}
          {meta.length > 0 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              {meta.map(({ label, value }) => (
                <div key={label}>
                  <div style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 9,
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    color: 'var(--fg-4)',
                    marginBottom: 5,
                  }}>
                    {label}
                  </div>
                  <div style={{
                    fontFamily: 'var(--font-display)',
                    fontWeight: 500,
                    fontSize: 14,
                    letterSpacing: '-0.01em',
                    textTransform: 'uppercase',
                    color: 'var(--fg-1)',
                  }}>
                    {value}
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>
      </div>

      {/* ── Media ────────────────────────────────────────────────── */}
      <ProjectMediaGrid media={project.media} />

    </article>
  )
}
