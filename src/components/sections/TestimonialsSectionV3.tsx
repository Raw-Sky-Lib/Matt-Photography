import type { TestimonialsSection as TestimonialsSectionType, ProjectSummary } from '@/types/content'
import TestimonialsSectionV3Client from './TestimonialsSectionV3Client'

export default function TestimonialsSectionV3({
  data,
  projects,
}: {
  data: TestimonialsSectionType
  projects: ProjectSummary[]
}) {
  return <TestimonialsSectionV3Client data={data} projects={projects} />
}
