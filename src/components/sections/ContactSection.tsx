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

interface Props {
  projectTypes: string[]
}

export default function ContactSection({ projectTypes }: Props) {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [serverError, setServerError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormData>({
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
      <section className="py-16 px-4 max-w-xl mx-auto">
        <div className="p-8 bg-[var(--color-surface)] rounded-lg text-center">
          <h2 className="text-2xl font-bold text-[var(--color-text)] mb-3">Thank you.</h2>
          <p className="text-[var(--color-text-muted)]">
            {"I'll be in touch within 48 hours."}
          </p>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 px-4 max-w-xl mx-auto">
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-6">
        {serverError && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
            {serverError}
          </div>
        )}

        <div className="flex flex-col gap-1.5">
          <label htmlFor="name" className="text-sm font-medium text-[var(--color-text)]">
            Name
          </label>
          <input
            id="name"
            type="text"
            {...register('name')}
            className="px-4 py-3 border border-[var(--color-surface)] rounded-lg bg-[var(--color-bg)] text-[var(--color-text)] focus:outline-none focus:border-[var(--color-brand)]"
            disabled={status === 'submitting'}
          />
          {errors.name && (
            <p className="text-red-600 text-xs">{errors.name.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="email" className="text-sm font-medium text-[var(--color-text)]">
            Email
          </label>
          <input
            id="email"
            type="email"
            {...register('email')}
            className="px-4 py-3 border border-[var(--color-surface)] rounded-lg bg-[var(--color-bg)] text-[var(--color-text)] focus:outline-none focus:border-[var(--color-brand)]"
            disabled={status === 'submitting'}
          />
          {errors.email && (
            <p className="text-red-600 text-xs">{errors.email.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="project_type" className="text-sm font-medium text-[var(--color-text)]">
            Project type
          </label>
          <select
            id="project_type"
            {...register('project_type')}
            className="px-4 py-3 border border-[var(--color-surface)] rounded-lg bg-[var(--color-bg)] text-[var(--color-text)] focus:outline-none focus:border-[var(--color-brand)]"
            disabled={status === 'submitting'}
          >
            <option value="">Select a project type</option>
            {projectTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
          {errors.project_type && (
            <p className="text-red-600 text-xs">{errors.project_type.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="message" className="text-sm font-medium text-[var(--color-text)]">
            Message
          </label>
          <textarea
            id="message"
            rows={6}
            {...register('message')}
            className="px-4 py-3 border border-[var(--color-surface)] rounded-lg bg-[var(--color-bg)] text-[var(--color-text)] focus:outline-none focus:border-[var(--color-brand)] resize-none"
            disabled={status === 'submitting'}
          />
          {errors.message && (
            <p className="text-red-600 text-xs">{errors.message.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={status === 'submitting'}
          className="px-8 py-3 bg-[var(--color-brand)] text-white rounded-lg font-semibold hover:bg-[var(--color-brand-dark)] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {status === 'submitting' ? 'Sending…' : 'Send message'}
        </button>
      </form>
    </section>
  )
}
