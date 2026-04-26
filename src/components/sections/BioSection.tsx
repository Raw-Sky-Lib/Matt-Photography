import type { BioSection as BioSectionType } from '@/types/content'

export default function BioSection({ data }: { data: BioSectionType }) {
  return (
    <section
      className="px-6 md:px-12"
      style={{
        paddingTop: 'clamp(64px, 8vw, 96px)',
        paddingBottom: 'clamp(64px, 8vw, 96px)',
        borderTop: '0.5px solid var(--fg-5)',
      }}
    >
      <div
        dangerouslySetInnerHTML={{ __html: data.body }}
        style={{
          fontFamily: 'var(--font-sans)',
          fontSize: 'clamp(17px, 1.8vw, 22px)',
          lineHeight: 1.75,
          color: 'var(--fg-2)',
          maxWidth: '60ch',
        }}
      />
    </section>
  )
}
