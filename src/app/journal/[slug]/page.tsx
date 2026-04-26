import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { getPostBySlug, getPostSlugs } from '@/lib/queries'
import { formatDate } from '@/utils/date'
import PostContent from '@/components/journal/PostContent'

export const revalidate = 3600

export async function generateStaticParams() {
  const slugs = await getPostSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  return {
    title: post?.title ?? 'Journal',
    description: post?.excerpt ?? undefined,
    openGraph: {
      images: post?.cover_image_url ? [post.cover_image_url] : [],
    },
  }
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  if (!post) notFound()

  return (
    <article>
      {/* Cover */}
      {post.cover_image_url && (
        <div style={{ position: 'relative', width: '100%', aspectRatio: '16/9', overflow: 'hidden' }}>
          <Image
            src={post.cover_image_url}
            alt={post.title}
            fill
            style={{ objectFit: 'cover' }}
            priority
            sizes="100vw"
          />
        </div>
      )}

      {/* Post header */}
      <div
        className="px-6 md:px-12 grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-8 items-end"
        style={{
          paddingTop: post.cover_image_url ? 'clamp(40px, 5vw, 64px)' : 'clamp(80px, 12vw, 140px)',
          paddingBottom: 'clamp(40px, 5vw, 64px)',
          borderBottom: '0.5px solid var(--fg-5)',
        }}
      >
        <div>
          <div style={{
            fontFamily: 'var(--font-mono)', fontSize: 10,
            letterSpacing: '0.12em', textTransform: 'uppercase',
            color: 'var(--fg-4)', marginBottom: 20,
          }}>
            {formatDate(post.published_at)}{post.author_name ? ` — ${post.author_name}` : ''}
          </div>
          <h1 style={{
            fontFamily: 'var(--font-display)', fontWeight: 500,
            fontSize: 'clamp(36px, 6vw, 88px)', lineHeight: 0.96,
            letterSpacing: '-0.03em', textTransform: 'uppercase',
            color: 'var(--fg-1)', margin: 0,
          }}>
            {post.title}
          </h1>
        </div>

        <Link
          href="/journal"
          style={{
            fontFamily: 'var(--font-mono)', fontSize: 10,
            letterSpacing: '0.14em', textTransform: 'uppercase',
            color: 'var(--fg-4)', textDecoration: 'none',
            display: 'inline-flex', alignItems: 'center', gap: 8,
            flexShrink: 0,
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 5l-7 7 7 7"/>
          </svg>
          All Posts
        </Link>
      </div>

      {/* Body */}
      <PostContent html={post.content} />
    </article>
  )
}
