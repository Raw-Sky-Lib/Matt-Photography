// TODO: Replace with Claude Design export implementation (MB-33)
import type { AboutHeroSection as AboutHeroSectionType } from '@/types/content'
import AboutHeroSectionClient from './AboutHeroSectionClient'

export default function AboutHeroSection({ data }: { data: AboutHeroSectionType }) {
  return <AboutHeroSectionClient data={data} />
}
