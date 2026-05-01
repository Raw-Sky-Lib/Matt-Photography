import type { TestimonialsSection as TestimonialsSectionType } from '@/types/content'
import TestimonialsSectionV2AClient from './TestimonialsSectionV2AClient'

export default function TestimonialsSectionV2A({ data }: { data: TestimonialsSectionType }) {
  return <TestimonialsSectionV2AClient data={data} />
}
