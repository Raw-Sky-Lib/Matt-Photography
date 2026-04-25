// TODO: Replace with Claude Design export implementation (MB-34)
import type { BioSection as BioSectionType } from '@/types/content'

export default function BioSection({ data }: { data: BioSectionType }) {
  return (
    <section className="py-16 px-4">
      <div
        className="prose max-w-3xl mx-auto"
        dangerouslySetInnerHTML={{ __html: data.body }}
      />
    </section>
  )
}
