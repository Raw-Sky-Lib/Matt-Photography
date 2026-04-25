// TODO: Replace with Claude Design export implementation (MB-40)
import type { ContactHeroSection as ContactHeroSectionType } from '@/types/content'

export default function ContactHeroSection({ data }: { data: ContactHeroSectionType }) {
  return (
    <section className="py-20 px-4 max-w-3xl mx-auto">
      <h1 className="text-5xl font-bold text-[var(--color-text)] mb-4">{data.headline}</h1>
      <p className="text-xl text-[var(--color-text-muted)]">{data.subheadline}</p>
    </section>
  )
}
