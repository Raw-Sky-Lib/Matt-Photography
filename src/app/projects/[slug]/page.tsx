import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { getProjectBySlug, getProjectSlugs } from '@/lib/queries'

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
    <article className="max-w-5xl mx-auto px-4 sm:px-6 py-16">
      <Link
        href="/projects"
        className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-brand)] transition-colors mb-8 inline-block"
      >
        ← Back to projects
      </Link>

      <div className="relative aspect-[16/9] w-full rounded-lg overflow-hidden mb-10">
        <Image
          src={project.cover_image_url}
          alt={project.title}
          fill
          className="object-cover"
          priority
        />
      </div>

      <header className="mb-10">
        <h1 className="text-4xl font-bold text-[var(--color-text)] mb-2">{project.title}</h1>
        {project.subtitle && (
          <p className="text-xl text-[var(--color-text-muted)]">{project.subtitle}</p>
        )}
        <div className="flex flex-wrap gap-4 mt-4 text-sm text-[var(--color-text-muted)]">
          {project.category?.name && <span>{project.category.name}</span>}
          {project.client_name && <span>{project.client_name}</span>}
          {project.year && <span>{project.year}</span>}
        </div>
      </header>

      {project.description && (
        <p className="text-[var(--color-text)] leading-relaxed mb-12 max-w-2xl">
          {project.description}
        </p>
      )}

      {project.images.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {project.images.map((image) => (
            <div key={image.id} className="relative aspect-[4/3] rounded-lg overflow-hidden">
              <Image
                src={image.image_url}
                alt={image.alt_text}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          ))}
        </div>
      )}
    </article>
  )
}
