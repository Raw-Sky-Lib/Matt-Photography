'use client'
import { useState, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import type { ProjectSummary } from '@/types/content'

interface Props {
  project: ProjectSummary
  index?: number
}

export default function ProjectCard({ project, index = 0 }: Props) {
  const [hover, setHover] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  function handleMouseEnter() {
    setHover(true)
    videoRef.current?.play()
  }

  function handleMouseLeave() {
    setHover(false)
    if (videoRef.current) {
      videoRef.current.pause()
      videoRef.current.currentTime = 0
    }
  }

  return (
    <Link
      href={`/projects/${project.slug}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ textDecoration: 'none', display: 'block', cursor: 'pointer' }}
    >
      {/* Image tile — 3:2 landscape */}
      <div style={{
        position: 'relative',
        width: '100%',
        aspectRatio: '3/2',
        overflow: 'hidden',
        background: 'var(--fg-5)',
      }}>
        {project.is_video_cover && project.cover_video_url ? (
          <video
            ref={videoRef}
            src={project.cover_video_url}
            muted
            loop
            playsInline
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        ) : (
          <div style={{
            position: 'absolute',
            inset: 0,
            transform: hover ? 'scale(1.04)' : 'scale(1)',
            transition: 'transform 700ms cubic-bezier(0.2,0,0.2,1)',
          }}>
            {project.cover_image_url && (
              <Image
                src={project.cover_image_url}
                alt={project.title}
                fill
                style={{ objectFit: 'cover' }}
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            )}
          </div>
        )}

        {/* Index label */}
        <div style={{
          position: 'absolute',
          top: 16,
          left: 18,
          zIndex: 2,
          fontFamily: 'var(--font-mono)',
          fontSize: 10,
          letterSpacing: '0.14em',
          color: 'rgba(255,255,255,0.65)',
          pointerEvents: 'none',
        }}>
          {String(index + 1).padStart(2, '0')}
        </div>

        {/* Frosted glass description strip — fades in on hover */}
        {project.description && (
          <div style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            background: 'rgba(255,255,255,0.88)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            borderTop: '1px solid rgba(255,255,255,0.4)',
            padding: '12px 18px 14px',
            zIndex: 2,
            pointerEvents: 'none',
            opacity: hover ? 1 : 0,
            transition: 'opacity 360ms cubic-bezier(0.2,0,0.2,1)',
          }}>
            <p style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 13,
              lineHeight: 1.6,
              color: 'var(--fg-2)',
              margin: 0,
            }}>
              {project.description}
            </p>
          </div>
        )}
      </div>

      {/* Caption */}
      <div style={{ paddingTop: 18 }}>

        {/* Title + arrow */}
        <div style={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          gap: 16,
        }}>
          <div style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 500,
            fontSize: 'clamp(15px, 1.4vw, 20px)',
            lineHeight: 1.08,
            letterSpacing: '-0.01em',
            textTransform: 'uppercase',
            color: 'var(--fg-1)',
            transform: hover ? 'translateX(4px)' : 'translateX(0)',
            transition: 'transform 320ms cubic-bezier(0.2,0,0.2,1)',
          }}>
            {project.title}
          </div>
          <svg
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{
              flexShrink: 0,
              marginTop: 3,
              color: 'var(--fg-1)',
              opacity: hover ? 1 : 0.2,
              transform: hover ? 'translate(3px,-3px)' : 'translate(0,0)',
              transition: 'opacity 280ms, transform 320ms cubic-bezier(0.2,0,0.2,1)',
            }}
          >
            <path d="M7 17 17 7M7 7h10v10"/>
          </svg>
        </div>

        {/* Meta — category · year */}
        <div style={{
          marginTop: 8,
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          fontFamily: 'var(--font-mono)',
          fontSize: 10,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: 'var(--fg-4)',
        }}>
          {project.category?.name && <span>{project.category.name}</span>}
          {project.category?.name && project.year && (
            <span style={{ opacity: 0.4 }}>·</span>
          )}
          {project.year && <span>{project.year}</span>}
        </div>


      </div>
    </Link>
  )
}
