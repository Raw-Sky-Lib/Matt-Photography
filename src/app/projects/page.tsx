import type { Metadata } from 'next'
import { getPublishedProjects, getCategories } from '@/lib/queries'
import CategoryFilterBar from '@/components/projects/CategoryFilterBar'
import ProjectsGrid from '@/components/projects/ProjectsGrid'

export const revalidate = 3600

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Projects',
    description: 'Portrait, editorial, and commercial photography projects.',
  }
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
      <CategoryFilterBar categories={categories} />
      <ProjectsGrid projects={projects} selectedCategory={selectedCategory} />
    </div>
  )
}
