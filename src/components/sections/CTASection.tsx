import type { CTASection as CTASectionType } from '@/types/content'
import CTASectionClient from './CTASectionClient'

export default function CTASection({ data }: { data: CTASectionType }) {
  return <CTASectionClient data={data} />
}
