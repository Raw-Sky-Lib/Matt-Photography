'use client'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import WipeButton from '@/components/ui/WipeButton'

const schema = z.object({
  name:           z.string().min(2, 'Please enter your name'),
  email:          z.string().email('Please enter a valid email'),
  company:        z.string().optional(),
  location:       z.string().optional(),
  project_type:   z.string().min(1, 'Please select a service'),
  preferred_date: z.string().optional(),
  budget:         z.string().optional(),
  message:        z.string().min(10, 'A sentence or two is enough'),
})
type FormData = z.infer<typeof schema>

/* ── Shared input style — underline only, matches design ─── */
const inputBase: React.CSSProperties = {
  border: 0,
  borderBottom: '1px solid var(--fg-4)',
  padding: '8px 0 10px',
  background: 'transparent',
  fontFamily: 'var(--font-sans)',
  fontSize: 16,
  fontWeight: 500,
  color: 'var(--fg-1)',
  outline: 'none',
  width: '100%',
  display: 'block',
  transition: 'border-color 260ms cubic-bezier(0.2,0,0.2,1)',
}

const selectBase: React.CSSProperties = {
  ...inputBase,
  appearance: 'none',
  backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%230a0a0a' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><polyline points='6 9 12 15 18 9'/></svg>")`,
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'right 4px center',
  paddingRight: 24,
  cursor: 'pointer',
}

/* ── Field wrapper ──────────────────────────────────────── */
function Field({
  label, required, full, children, error,
}: {
  label: string
  required?: boolean
  full?: boolean
  error?: string
  children: React.ReactNode
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gridColumn: full ? '1 / -1' : 'auto' }}>
      <label style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'baseline',
        marginBottom: 10,
        fontFamily: 'var(--font-sans)',
        fontSize: 11,
        fontWeight: 700,
        letterSpacing: '0.2em',
        textTransform: 'uppercase',
        color: error ? '#e05252' : 'var(--fg-1)',
      }}>
        <span>{label}</span>
        {required && (
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--fg-3)', letterSpacing: '0.06em' }}>
            *
          </span>
        )}
      </label>
      {children}
      {error && (
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.08em', color: '#e05252', marginTop: 6 }}>
          {error}
        </span>
      )}
    </div>
  )
}

/* ── Success state ──────────────────────────────────────── */
function SuccessState({ onReset }: { onReset: () => void }) {
  return (
    <div style={{ padding: '40px 0' }}>
      <div style={{
        fontFamily: 'var(--font-display)',
        fontWeight: 500,
        fontSize: 'clamp(40px, 5vw, 72px)',
        lineHeight: 1.04,
        letterSpacing: '-0.01em',
        textTransform: 'uppercase',
        color: 'var(--fg-1)',
        paddingBottom: '0.06em',
      }}>
        Got it.<br />Talk soon.
      </div>
      <p style={{ marginTop: 24, fontSize: 16, lineHeight: 1.55, color: 'var(--fg-2)', maxWidth: '46ch' }}>
        Your enquiry is on its way. I&rsquo;ll come back to you within one working day,
        usually with a few questions and a rough sense of timing.
      </p>
      <div style={{ marginTop: 32 }}>
        <WipeButton variant="ghost" onClick={onReset}>
          Send another
        </WipeButton>
      </div>
    </div>
  )
}

/* ── Main form ──────────────────────────────────────────── */
export default function ContactSection({ projectTypes }: { projectTypes: string[] }) {
  const [status, setStatus]           = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [serverError, setServerError] = useState<string | null>(null)

  const today = new Date().toISOString().slice(0, 10)

  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  function handleReset() {
    reset()
    setStatus('idle')
    setServerError(null)
  }

  async function onSubmit(data: FormData) {
    setStatus('submitting')
    setServerError(null)
    try {
      const res  = await fetch('/api/submit-form', {
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
    return <SuccessState onReset={handleReset} />
  }

  const disabled = status === 'submitting'

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="contact-form">

      {serverError && (
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: '#e05252', marginBottom: 24, letterSpacing: '0.08em' }}>
          {serverError}
        </p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: '28px 32px' }}>

        {/* Name + Email */}
        <Field label="Name" required error={errors.name?.message}>
          <input
            type="text"
            autoComplete="name"
            placeholder="Full name"
            disabled={disabled}
            {...register('name')}
            style={{ ...inputBase, borderBottomColor: errors.name ? '#e05252' : 'var(--fg-4)' }}
          />
        </Field>

        <Field label="Email" required error={errors.email?.message}>
          <input
            type="email"
            autoComplete="email"
            placeholder="you@studio.com"
            disabled={disabled}
            {...register('email')}
            style={{ ...inputBase, borderBottomColor: errors.email ? '#e05252' : 'var(--fg-4)' }}
          />
        </Field>

        {/* Company + Location */}
        <Field label="Company / Studio">
          <input
            type="text"
            autoComplete="organization"
            placeholder="Optional"
            disabled={disabled}
            {...register('company')}
            style={inputBase}
          />
        </Field>

        <Field label="Location">
          <input
            type="text"
            autoComplete="address-level2"
            placeholder="City, country"
            disabled={disabled}
            {...register('location')}
            style={inputBase}
          />
        </Field>

        {/* Service + Date */}
        <Field label="Service" required error={errors.project_type?.message}>
          <select
            disabled={disabled}
            {...register('project_type')}
            style={{ ...selectBase, borderBottomColor: errors.project_type ? '#e05252' : 'var(--fg-4)' }}
          >
            <option value="">Select a service</option>
            {projectTypes.map(t => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </Field>

        <Field label="Preferred date">
          <input
            type="date"
            min={today}
            disabled={disabled}
            {...register('preferred_date')}
            style={inputBase}
          />
        </Field>

        {/* Budget — full width */}
        <Field label="Budget" full>
          <select
            disabled={disabled}
            {...register('budget')}
            style={selectBase}
          >
            <option value="">Select a range (optional)</option>
            <option>Under £5k</option>
            <option>£5–15k</option>
            <option>£15–30k</option>
            <option>£30k+</option>
            <option>Open</option>
          </select>
        </Field>

        {/* Message — full width */}
        <Field label="The project" required full error={errors.message?.message}>
          <textarea
            rows={5}
            placeholder="A sentence or two is enough. What it is, who it's for, what you're hoping for."
            disabled={disabled}
            {...register('message')}
            style={{
              ...inputBase,
              resize: 'vertical',
              minHeight: 120,
              padding: '8px 0 12px',
              borderBottomColor: errors.message ? '#e05252' : 'var(--fg-4)',
            }}
          />
        </Field>

      </div>

      {/* Footer */}
      <div style={{
        marginTop: 36,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 24,
        flexWrap: 'wrap',
      }}>
        <div style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 11,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          color: 'var(--fg-3)',
        }}>
          Reply within 1 working day
        </div>
        <WipeButton variant="primary" type="submit" disabled={disabled}>
          {disabled ? 'Sending…' : 'Send enquiry'}
        </WipeButton>
      </div>

    </form>
  )
}
