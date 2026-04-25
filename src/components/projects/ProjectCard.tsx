// TODO: Refine with Claude Design export (MB-25)
import Link from 'next/link'
import Image from 'next/image'
import type { ProjectSummary } from '@/types/content'

export default function ProjectCard({ project }: { project: ProjectSummary }) {
  return (
    <Link href={`/projects/${project.slug}`} className="group block">
      <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-[var(--color-surface)] mb-4">
        <Image
          src={project.cover_image_url}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-end">
          <div className="p-4 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
            <p className="text-white font-semibold">{project.title}</p>
          </div>
        </div>
      </div>
      <div>
        <h3 className="font-semibold text-[var(--color-text)]">{project.title}</h3>
        {project.subtitle && (
          <p className="text-sm text-[var(--color-text-muted)] mt-0.5">{project.subtitle}</p>
        )}
        <div className="flex gap-3 mt-1 text-xs text-[var(--color-text-muted)]">
          {project.category?.name && <span>{project.category.name}</span>}
          {project.year && <span>{project.year}</span>}
        </div>
      </div>
    </Link>
  )
}
