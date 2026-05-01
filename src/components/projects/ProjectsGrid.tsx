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
      <div className="px-6 md:px-12" style={{ paddingTop: 80, paddingBottom: 80 }}>
        <p style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 11,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: 'var(--fg-4)',
        }}>
          No projects in this category yet.
        </p>
      </div>
    )
  }

  return (
    <div
      className="grid grid-cols-1 md:grid-cols-2 px-6 md:px-12"
      style={{
        columnGap: 'clamp(16px, 2vw, 24px)',
        rowGap: 'clamp(44px, 5vw, 64px)',
        paddingTop: 'clamp(32px, 4vw, 48px)',
        paddingBottom: 'clamp(64px, 8vw, 96px)',
      }}
    >
      {filtered.map((project, i) => (
        <ProjectCard key={project.id} project={project} index={i} />
      ))}
    </div>
  )
}
