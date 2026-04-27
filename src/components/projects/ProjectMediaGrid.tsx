import Image from 'next/image'
import type { ProjectMedia } from '@/types/content'

type Row =
  | { kind: 'full';  item: ProjectMedia }
  | { kind: 'pair';  items: [ProjectMedia, ProjectMedia] }
  | { kind: 'solo';  item: ProjectMedia }

function buildRows(media: ProjectMedia[]): Row[] {
  const rows: Row[] = []
  let i = 0
  while (i < media.length) {
    const item = media[i]
    if (item.media_type === 'video' || item.span_full) {
      rows.push({ kind: 'full', item })
      i++
    } else {
      const next = media[i + 1]
      if (next && next.media_type === 'image' && !next.span_full) {
        rows.push({ kind: 'pair', items: [item, next] })
        i += 2
      } else {
        rows.push({ kind: 'solo', item })
        i++
      }
    }
  }
  return rows
}

function aspectRatio(item: ProjectMedia, fallback: string): string {
  return item.width && item.height ? `${item.width}/${item.height}` : fallback
}

function MediaImage({ item, sizes }: { item: ProjectMedia; sizes: string }) {
  const ratio = aspectRatio(item, '2/3')
  return (
    <div style={{ position: 'relative', width: '100%', aspectRatio: ratio, overflow: 'hidden' }}>
      {item.image_url ? (
        <Image
          src={item.image_url}
          alt={item.alt_text}
          fill
          style={{ objectFit: 'cover' }}
          sizes={sizes}
        />
      ) : (
        <div style={{ position: 'absolute', inset: 0, background: 'var(--bg-3)' }} />
      )}
    </div>
  )
}

function MediaVideo({ item }: { item: ProjectMedia }) {
  if (!item.video_url) return null
  return (
    <div style={{ position: 'relative', width: '100%', aspectRatio: '16/9', background: '#000' }}>
      <video
        src={item.video_url}
        autoPlay muted loop playsInline
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
        aria-label={item.alt_text}
      />
    </div>
  )
}

export default function ProjectMediaGrid({ media }: { media: ProjectMedia[] }) {
  if (!media.length) return null
  const rows = buildRows(media)

  return (
    <div style={{ paddingTop: 'clamp(48px, 6vw, 72px)', paddingBottom: 'clamp(64px, 8vw, 96px)' }}>
      {rows.map((row, i) => {
        if (row.kind === 'full') {
          return (
            <div key={row.item.id} style={{ marginBottom: 2 }}>
              {row.item.media_type === 'video' ? (
                <MediaVideo item={row.item} />
              ) : (
                <div style={{ position: 'relative', width: '100%', aspectRatio: aspectRatio(row.item, '3/2'), overflow: 'hidden' }}>
                  {row.item.image_url ? (
                    <Image
                      src={row.item.image_url}
                      alt={row.item.alt_text}
                      fill
                      style={{ objectFit: 'cover' }}
                      sizes="100vw"
                    />
                  ) : (
                    <div style={{ position: 'absolute', inset: 0, background: 'var(--bg-3)' }} />
                  )}
                </div>
              )}
            </div>
          )
        }

        if (row.kind === 'pair') {
          return (
            <div
              key={`${row.items[0].id}-${row.items[1].id}`}
              style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, marginBottom: 2 }}
            >
              <MediaImage item={row.items[0]} sizes="50vw" />
              <MediaImage item={row.items[1]} sizes="50vw" />
            </div>
          )
        }

        // solo — centred, narrower than full-bleed
        return (
          <div
            key={row.item.id}
            className="px-6 md:px-12"
            style={{ maxWidth: 900, margin: '0 auto', marginBottom: 2, paddingBottom: 8 }}
          >
            <MediaImage item={row.item} sizes="(max-width: 768px) 100vw, 900px" />
          </div>
        )
      })}
    </div>
  )
}
