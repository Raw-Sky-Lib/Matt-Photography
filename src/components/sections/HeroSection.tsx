import type { HeroSection as HeroSectionType, SiteSettings } from '@/types/content'
import HeroSectionClient from './HeroSectionClient'

interface Props {
  data: HeroSectionType
  settings: Pick<SiteSettings, 'location'>
}

export default function HeroSection({ data, settings }: Props) {
  return <HeroSectionClient data={data} settings={settings} />
}
