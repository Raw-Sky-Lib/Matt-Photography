import { getHomePageSections, getFeaturedProjects, getSiteSettings } from '@/lib/queries'
import HeroSection from '@/components/sections/HeroSection'
import ClientMarquee from '@/components/sections/ClientMarquee'
import FeaturedWorkSection from '@/components/sections/FeaturedWorkSection'
import AboutPreviewSection from '@/components/sections/AboutPreviewSection'
import TestimonialsSection from '@/components/sections/TestimonialsSection'
import FAQSection from '@/components/sections/FAQSection'
import CTASection from '@/components/sections/CTASection'

export const revalidate = 3600

export default async function HomePage() {
  const [sections, projects, settings] = await Promise.all([
    getHomePageSections(),
    getFeaturedProjects(),
    getSiteSettings(),
  ])

  return (
    <>
      <HeroSection data={sections.hero} settings={settings} />
      <ClientMarquee data={sections.client_marquee} />
      <FeaturedWorkSection data={sections.featured_work} projects={projects} />
      <AboutPreviewSection data={sections.about_preview} />
      <TestimonialsSection data={sections.testimonials} />
      {sections.faq && <FAQSection data={sections.faq} />}
      <CTASection data={sections.cta} />
    </>
  )
}
