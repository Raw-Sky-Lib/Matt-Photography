import type { Metadata } from 'next'
import { getPublishedPosts, getSiteSettings } from '@/lib/queries'
import JournalGrid from '@/components/journal/JournalGrid'

export const revalidate = 3600

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings()
  return {
    title: 'Journal',
    description: `Behind the work — notes on photography, light, and process. By ${settings.site_name}.`,
  }
}

export default async function JournalPage() {
  const posts = await getPublishedPosts()

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
      <h1 className="text-4xl font-bold text-[var(--color-text)] mb-2">Journal</h1>
      <p className="text-[var(--color-text-muted)] mb-12">
        Behind the work — notes on photography, light, and process.
      </p>
      <JournalGrid posts={posts} />
    </div>
  )
}
