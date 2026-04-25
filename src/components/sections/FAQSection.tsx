import type { FAQSection as FAQSectionType } from '@/types/content'
import FAQSectionClient from './FAQSectionClient'

export default function FAQSection({ data }: { data: FAQSectionType }) {
  return <FAQSectionClient data={data} />
}
