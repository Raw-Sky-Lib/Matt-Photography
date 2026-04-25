// TODO: Replace with Claude Design export implementation (MB-35)
'use client'
import type { PhilosophySection } from '@/types/content'

export default function PhilosophySectionClient({ data }: { data: PhilosophySection }) {
  return (
    <section className="py-20 px-4 bg-[var(--color-surface)]">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-[var(--color-text)] mb-6">{data.headline}</h2>
        <p className="text-[var(--color-text)] leading-relaxed text-lg">{data.body}</p>
      </div>
    </section>
  )
}
