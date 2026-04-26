import type { PostSummary } from '@/types/content'
import JournalCard from './JournalCard'

export default function JournalGrid({ posts }: { posts: PostSummary[] }) {
  if (!posts.length) {
    return (
      <div className="px-6 md:px-12" style={{ paddingTop: 80, paddingBottom: 80 }}>
        <p style={{
          fontFamily: 'var(--font-mono)', fontSize: 11,
          letterSpacing: '0.12em', textTransform: 'uppercase',
          color: 'var(--fg-4)',
        }}>
          Nothing published yet.
        </p>
      </div>
    )
  }

  return (
    <div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px px-6 md:px-12"
      style={{ paddingTop: 32, paddingBottom: 'clamp(64px, 8vw, 96px)' }}
    >
      {posts.map((post) => (
        <JournalCard key={post.id} post={post} />
      ))}
    </div>
  )
}
