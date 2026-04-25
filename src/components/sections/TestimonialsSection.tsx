import type { TestimonialsSection as TestimonialsSectionType } from '@/types/content'
import TestimonialsSectionClient from './TestimonialsSectionClient'

export default function TestimonialsSection({ data }: { data: TestimonialsSectionType }) {
  return <TestimonialsSectionClient data={data} />
}
