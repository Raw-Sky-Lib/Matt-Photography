'use client'
import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { formatDate } from '@/utils/date'
import type { PostSummary } from '@/types/content'

export default function JournalCard({ post }: { post: PostSummary }) {
  const [hover, setHover] = useState(false)

  return (
    <Link
      href={`/journal/${post.slug}`}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{ textDecoration: 'none', display: 'block' }}
    >
      {/* Cover */}
      <div style={{ position: 'relative', width: '100%', aspectRatio: '16/9', overflow: 'hidden', background: '#111' }}>
        {post.cover_image_url && (
          <Image
            src={post.cover_image_url}
            alt={post.title}
            fill
            style={{ objectFit: 'cover' }}
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        )}
      </div>

      {/* Caption */}
      <div style={{ padding: '20px 0 24px' }}>
        <div style={{
          fontFamily: 'var(--font-mono)', fontSize: 10,
          letterSpacing: '0.12em', textTransform: 'uppercase',
          color: 'var(--fg-4)', marginBottom: 10,
        }}>
          {formatDate(post.published_at)}
        </div>
        <h2 style={{
          fontFamily: 'var(--font-display)', fontWeight: 500,
          fontSize: 'clamp(18px, 2vw, 26px)', lineHeight: 1.08,
          letterSpacing: '-0.01em', textTransform: 'uppercase',
          color: 'var(--fg-1)', margin: '0 0 10px',
          transform: hover ? 'translateX(6px)' : 'none',
          transition: 'transform 320ms var(--ease-std)',
        }}>
          {post.title}
        </h2>
        {post.excerpt && (
          <p style={{
            fontFamily: 'var(--font-sans)', fontSize: 13,
            lineHeight: 1.6, color: 'var(--fg-3)',
            margin: 0,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}>
            {post.excerpt}
          </p>
        )}
      </div>
    </Link>
  )
}
