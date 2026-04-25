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
    <article className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
      <Link
        href="/journal"
        className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-brand)] transition-colors mb-8 inline-block"
      >
        ← Back to journal
      </Link>

      {post.cover_image_url && (
        <div className="relative aspect-[16/9] w-full rounded-lg overflow-hidden mb-10">
          <Image
            src={post.cover_image_url}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}

      <div className="flex items-center gap-4 text-sm text-[var(--color-text-muted)] mb-4">
        <time dateTime={post.published_at}>{formatDate(post.published_at)}</time>
        {post.author_name && <span>{post.author_name}</span>}
      </div>

      <h1 className="text-4xl font-bold text-[var(--color-text)] mb-10">{post.title}</h1>

      <PostContent html={post.content} />
    </article>
  )
}
