import type { Metadata } from 'next'
import { Suspense } from 'react'
import { getPublishedProjects, getCategories } from '@/lib/queries'
import CategoryFilterBar from '@/components/projects/CategoryFilterBar'
import ProjectsGrid from '@/components/projects/ProjectsGrid'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Projects',
  description: 'Portrait, editorial, and commercial photography projects.',
}

export default async function ProjectsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>
}) {
  const params = await searchParams
  const [projects, categories] = await Promise.all([
    getPublishedProjects(),
    getCategories(),
  ])
  const selectedCategory = params?.category ?? null

  return (
    <div>
      {/* Integrated page header */}
      <div
        className="px-6 md:px-12"
        style={{
          paddingTop: 'clamp(80px, 12vw, 140px)',
          paddingBottom: 'clamp(48px, 6vw, 72px)',
          borderBottom: '0.5px solid var(--fg-5)',
        }}
      >
        <div style={{
          fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 600,
          letterSpacing: '0.2em', textTransform: 'uppercase',
          color: 'var(--fg-4)', marginBottom: 20,
        }}>
          Work
        </div>
        <h1 style={{
          fontFamily: 'var(--font-display)', fontWeight: 500,
          fontSize: 'clamp(44px, 7vw, 96px)', lineHeight: 0.96,
          letterSpacing: '-0.03em', textTransform: 'uppercase',
          color: 'var(--fg-1)', margin: 0,
        }}>
          Projects.
        </h1>
      </div>

      {/* Category filter */}
      <Suspense>
        <CategoryFilterBar categories={categories} />
      </Suspense>

      {/* Grid */}
      <ProjectsGrid projects={projects} selectedCategory={selectedCategory} />
    </div>
  )
}
