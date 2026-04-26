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
    <div>
      {/* Page header */}
      <div
        className="px-6 md:px-12"
        style={{
          paddingTop: 'clamp(80px, 12vw, 140px)',
          paddingBottom: 'clamp(48px, 6vw, 72px)',
          borderBottom: '0.5px solid var(--fg-5)',
        }}
      >
        <div style={{
          fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 600,
          letterSpacing: '0.2em', textTransform: 'uppercase',
          color: 'var(--fg-4)', marginBottom: 20,
        }}>
          Writing
        </div>
        <h1 style={{
          fontFamily: 'var(--font-display)', fontWeight: 500,
          fontSize: 'clamp(44px, 7vw, 96px)', lineHeight: 0.96,
          letterSpacing: '-0.03em', textTransform: 'uppercase',
          color: 'var(--fg-1)', margin: 0,
        }}>
          Journal.
        </h1>
      </div>

      <JournalGrid posts={posts} />
    </div>
  )
}
