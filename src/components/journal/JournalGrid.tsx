import type { PostSummary } from '@/types/content'
import JournalCard from './JournalCard'

export default function JournalGrid({ posts }: { posts: PostSummary[] }) {
  if (!posts.length) {
    return (
      <p className="text-[var(--color-text-muted)] text-center py-20">
        Nothing published yet. Check back soon.
      </p>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
      {posts.map((post) => (
        <JournalCard key={post.id} post={post} />
      ))}
    </div>
  )
}
