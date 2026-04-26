'use client'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  email: z.string().email('Please enter a valid email address'),
  project_type: z.string().min(1, 'Please select a project type'),
  message: z.string().min(10, 'Message must be at least 10 characters').max(2000),
})

type ContactFormData = z.infer<typeof contactSchema>

const fieldStyle: React.CSSProperties = {
  width: '100%', background: 'none', border: 'none',
  borderBottom: '1px solid var(--fg-4)', outline: 'none',
  padding: '0 0 14px',
  fontFamily: 'var(--font-sans)', fontSize: 'clamp(15px, 1.4vw, 17px)',
  color: 'var(--fg-1)', borderRadius: 0,
}

const labelStyle: React.CSSProperties = {
  fontFamily: 'var(--font-mono)', fontSize: 9, fontWeight: 600,
  letterSpacing: '0.18em', textTransform: 'uppercase',
  color: 'var(--fg-4)', display: 'block', marginBottom: 10,
}

const errorStyle: React.CSSProperties = {
  fontFamily: 'var(--font-mono)', fontSize: 10,
  letterSpacing: '0.08em', color: '#e05252', marginTop: 8,
}

export default function ContactSection({ projectTypes }: { projectTypes: string[] }) {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [serverError, setServerError] = useState<string | null>(null)

  const { register, handleSubmit, formState: { errors } } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  })

  async function onSubmit(data: ContactFormData) {
    setStatus('submitting')
    setServerError(null)
    try {
      const res = await fetch('/api/submit-form', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      const json = await res.json()
      if (!res.ok) {
        setServerError(json.error ?? 'Something went wrong. Please try again.')
        setStatus('error')
        return
      }
      setStatus('success')
    } catch {
      setServerError('Something went wrong. Please try again.')
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div style={{
          fontFamily: 'var(--font-display)', fontWeight: 500,
          fontSize: 'clamp(48px, 7vw, 96px)', lineHeight: 0.96,
          letterSpacing: '-0.03em', textTransform: 'uppercase',
          color: 'var(--fg-1)', marginBottom: 20,
        }}>
          Sent.
        </div>
        <p style={{
          fontFamily: 'var(--font-mono)', fontSize: 10,
          letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--fg-4)',
        }}>
          {"I'll be in touch within 48 hours."}
        </p>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      style={{ display: 'flex', flexDirection: 'column', gap: 36 }}
    >
      {serverError && (
        <p style={{ ...errorStyle, fontSize: 11 }}>{serverError}</p>
      )}

      <div>
        <label htmlFor="name" style={labelStyle}>Name</label>
        <input id="name" type="text" {...register('name')} style={fieldStyle} disabled={status === 'submitting'} />
        {errors.name && <p style={errorStyle}>{errors.name.message}</p>}
      </div>

      <div>
        <label htmlFor="email" style={labelStyle}>Email</label>
        <input id="email" type="email" {...register('email')} style={fieldStyle} disabled={status === 'submitting'} />
        {errors.email && <p style={errorStyle}>{errors.email.message}</p>}
      </div>

      <div>
        <label htmlFor="project_type" style={labelStyle}>Project type</label>
        <select id="project_type" {...register('project_type')} style={fieldStyle} disabled={status === 'submitting'}>
          <option value="">Select</option>
          {projectTypes.map((type) => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
        {errors.project_type && <p style={errorStyle}>{errors.project_type.message}</p>}
      </div>

      <div>
        <label htmlFor="message" style={labelStyle}>Message</label>
        <textarea
          id="message" rows={5}
          {...register('message')}
          style={{ ...fieldStyle, resize: 'none' }}
          disabled={status === 'submitting'}
        />
        {errors.message && <p style={errorStyle}>{errors.message.message}</p>}
      </div>

      <div style={{ paddingTop: 8 }}>
        <button
          type="submit"
          disabled={status === 'submitting'}
          style={{
            background: 'var(--fg-1)', color: 'var(--bg-1)',
            fontFamily: 'var(--font-sans)', fontSize: 11, fontWeight: 700,
            letterSpacing: '0.18em', textTransform: 'uppercase',
            padding: '16px 32px', border: 'none', cursor: 'pointer',
            display: 'inline-flex', alignItems: 'center', gap: 12,
            opacity: status === 'submitting' ? 0.5 : 1,
            transition: 'opacity 200ms',
          }}
        >
          {status === 'submitting' ? 'Sending…' : 'Send message'}
          {status !== 'submitting' && (
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M13 6l6 6-6 6"/>
            </svg>
          )}
        </button>
      </div>
    </form>
  )
}
