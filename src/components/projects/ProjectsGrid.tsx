import type { ProjectSummary } from '@/types/content'
import ProjectCard from './ProjectCard'

interface Props {
  projects: ProjectSummary[]
  selectedCategory: string | null
}

export default function ProjectsGrid({ projects, selectedCategory }: Props) {
  const filtered = selectedCategory
    ? projects.filter((p) => p.category?.slug === selectedCategory)
    : projects

  if (!filtered.length) {
    return (
      <p className="text-[var(--color-text-muted)] text-center py-20">
        No projects in this category yet.
      </p>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {filtered.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  )
}
