// TODO: Replace with Claude Design export implementation (MB-33)
'use client'
import Image from 'next/image'
import type { AboutHeroSection } from '@/types/content'

export default function AboutHeroSectionClient({ data }: { data: AboutHeroSection }) {
  return (
    <section className="py-20 px-4 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <h1 className="text-5xl md:text-6xl font-bold text-[var(--color-text)] leading-tight">
          {data.headline}
        </h1>
        {data.portrait_image_url && (
          <div className="relative aspect-[3/4] rounded-lg overflow-hidden">
            <Image
              src={data.portrait_image_url}
              alt="Matt Banton"
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        )}
      </div>
    </section>
  )
}
