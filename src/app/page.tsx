import { getHomePageSections, getPublishedProjects, getSiteSettings } from '@/lib/queries'
import HeroSection from '@/components/sections/HeroSection'
import ClientMarquee from '@/components/sections/ClientMarquee'
import FeaturedWorkSection from '@/components/sections/FeaturedWorkSection'
import AboutPreviewSection from '@/components/sections/AboutPreviewSection'
import TestimonialsSection from '@/components/sections/TestimonialsSection'
import CTASection from '@/components/sections/CTASection'

export const revalidate = 3600

export default async function HomePage() {
  const [sections, projects, settings] = await Promise.all([
    getHomePageSections(),
    getPublishedProjects(),
    getSiteSettings(),
  ])

  return (
    <>
      <HeroSection data={sections.hero} settings={settings} />
      <ClientMarquee data={sections.client_marquee} />
      <FeaturedWorkSection data={sections.featured_work} projects={projects} />
      <AboutPreviewSection data={sections.about_preview} />
      <TestimonialsSection data={sections.testimonials} />
      <CTASection data={sections.cta} />
    </>
  )
}
