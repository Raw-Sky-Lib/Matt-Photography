import type { Metadata } from 'next'
import { getContactPageSections, getHomePageSections, getSiteSettings } from '@/lib/queries'
import ContactHeroSection from '@/components/sections/ContactHeroSection'
import ContactSection from '@/components/sections/ContactSection'
import FAQSection from '@/components/sections/FAQSection'
import CTASection from '@/components/sections/CTASection'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch to discuss your photography project.',
}

export default async function ContactPage() {
  const [sections, homeSections, settings] = await Promise.all([
    getContactPageSections(),
    getHomePageSections(),
    getSiteSettings(),
  ])

  return (
    <div style={{ background: '#fff' }}>

      {/* Above-fold: sticky left + form right */}
      <section style={{ padding: 'clamp(88px,10vw,128px) clamp(24px,4vw,48px) 72px' }}>
        <div
          className="grid grid-cols-1 lg:grid-cols-[5fr_7fr]"
          style={{ gap: 'clamp(48px,6vw,80px)', alignItems: 'start' }}
        >
          <ContactHeroSection data={sections.hero} settings={settings} />
          <ContactSection projectTypes={settings.contact_project_types ?? []} />
        </div>
      </section>

      {/* Shared FAQ — same as home page */}
      {homeSections.faq && <FAQSection data={homeSections.faq} />}

      {/* Shared CTA — same as home page */}
      <CTASection data={homeSections.cta} />

    </div>
  )
}
