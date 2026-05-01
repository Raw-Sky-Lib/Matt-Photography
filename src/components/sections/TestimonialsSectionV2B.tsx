import type { TestimonialsSection as TestimonialsSectionType } from '@/types/content'
import TestimonialsSectionV2BClient from './TestimonialsSectionV2BClient'

export default function TestimonialsSectionV2B({ data }: { data: TestimonialsSectionType }) {
  return <TestimonialsSectionV2BClient data={data} />
}
