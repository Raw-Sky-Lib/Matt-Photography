import type { Metadata } from 'next'
import { getContactPageSections, getSiteSettings } from '@/lib/queries'
import ContactHeroSection from '@/components/sections/ContactHeroSection'
import ContactSection from '@/components/sections/ContactSection'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch to discuss your photography project.',
}

export default async function ContactPage() {
  const [sections, settings] = await Promise.all([
    getContactPageSections(),
    getSiteSettings(),
  ])

  return (
    <div
      className="px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24"
      style={{
        paddingTop: 'clamp(80px, 12vw, 140px)',
        paddingBottom: 'clamp(80px, 12vw, 140px)',
      }}
    >
      <ContactHeroSection
        data={sections.hero}
        email={settings.contact_email}
        phone={settings.contact_phone}
      />
      <ContactSection projectTypes={settings.contact_project_types ?? []} />
    </div>
  )
}
