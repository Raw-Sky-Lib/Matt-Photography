import type { Metadata } from 'next'
import { getContactPageSections, getSiteSettings } from '@/lib/queries'
import ContactHeroSection from '@/components/sections/ContactHeroSection'
import ContactSection from '@/components/sections/ContactSection'

export const revalidate = 3600

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Contact',
    description: 'Get in touch to discuss your photography project.',
  }
}

export default async function ContactPage() {
  const [sections, settings] = await Promise.all([
    getContactPageSections(),
    getSiteSettings(),
  ])

  return (
    <>
      <ContactHeroSection data={sections.hero} />
      <ContactSection projectTypes={settings.contact_project_types ?? []} />
    </>
  )
}
