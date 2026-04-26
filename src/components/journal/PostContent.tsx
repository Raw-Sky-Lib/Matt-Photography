export default function PostContent({ html }: { html: string }) {
  return (
    <div
      className="px-6 md:px-12"
      style={{
        paddingTop: 'clamp(48px, 6vw, 80px)',
        paddingBottom: 'clamp(64px, 8vw, 96px)',
      }}
    >
      <div
        dangerouslySetInnerHTML={{ __html: html }}
        style={{
          fontFamily: 'var(--font-sans)',
          fontSize: 'clamp(16px, 1.6vw, 19px)',
          lineHeight: 1.8,
          color: 'var(--fg-2)',
          maxWidth: '64ch',
        }}
      />
    </div>
  )
}
