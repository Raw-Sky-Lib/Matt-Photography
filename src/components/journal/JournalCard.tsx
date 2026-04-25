import Link from 'next/link'
import Image from 'next/image'
import { formatDate } from '@/utils/date'
import type { PostSummary } from '@/types/content'

export default function JournalCard({ post }: { post: PostSummary }) {
  return (
    <article>
      {post.cover_image_url && (
        <Link href={`/journal/${post.slug}`} className="block relative aspect-[16/9] rounded-lg overflow-hidden mb-4 group">
          <Image
            src={post.cover_image_url}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </Link>
      )}
      <div>
        <div className="flex items-center gap-3 text-xs text-[var(--color-text-muted)] mb-2">
          <time dateTime={post.published_at}>{formatDate(post.published_at)}</time>
          {post.author_name && <span>{post.author_name}</span>}
        </div>
        <h2 className="text-xl font-bold text-[var(--color-text)] mb-2">
          <Link href={`/journal/${post.slug}`} className="hover:text-[var(--color-brand)] transition-colors">
            {post.title}
          </Link>
        </h2>
        {post.excerpt && (
          <p className="text-[var(--color-text-muted)] text-sm leading-relaxed line-clamp-3 mb-3">
            {post.excerpt}
          </p>
        )}
        <Link
          href={`/journal/${post.slug}`}
          className="text-sm text-[var(--color-brand)] hover:underline font-medium"
        >
          Read more →
        </Link>
      </div>
    </article>
  )
}
