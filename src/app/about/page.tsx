import type { Metadata } from 'next'
import { getAboutPageSections } from '@/lib/queries'
import AboutHeroSection from '@/components/sections/AboutHeroSection'
import PhilosophySection from '@/components/sections/PhilosophySection'
import CTASection from '@/components/sections/CTASection'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'About',
  description: 'Portrait and editorial photographer based in London.',
}

export default async function AboutPage() {
  const sections = await getAboutPageSections()

  return (
    <>
      <AboutHeroSection data={sections.hero} bio={sections.bio.body} />
      <PhilosophySection data={sections.philosophy} />
      <CTASection data={sections.cta} />
    </>
  )
}
