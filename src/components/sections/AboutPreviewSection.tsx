import type { AboutPreviewSection as AboutPreviewSectionType } from '@/types/content'
import AboutPreviewSectionClient from './AboutPreviewSectionClient'

export default function AboutPreviewSection({ data }: { data: AboutPreviewSectionType }) {
  return <AboutPreviewSectionClient data={data} />
}
