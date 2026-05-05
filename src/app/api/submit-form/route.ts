import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { createServerClient } from '@/lib/supabase/server'
import { sendEnquiryNotification, sendEnquiryConfirmation } from '@/lib/email'

const rateLimitMap = new Map<string, { count: number; resetAt: number }>()

const contactSchema = z.object({
  name:           z.string().min(2).max(100),
  email:          z.string().email(),
  company:        z.string().max(200).optional(),
  location:       z.string().max(200).optional(),
  project_type:   z.string().min(1),
  preferred_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional().or(z.literal('')),
  budget:         z.string().max(50).optional(),
  message:        z.string().min(10).max(2000),
})

function getIp(request: NextRequest): string {
  return request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown'
}

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const entry = rateLimitMap.get(ip)

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + 3_600_000 })
    return true
  }

  if (entry.count >= 3) return false

  entry.count++
  return true
}

export async function POST(request: NextRequest) {
  const ip = getIp(request)

  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { error: 'Too many submissions — please try again later.' },
      { status: 429 }
    )
  }

  const body = await request.json()
  const result = contactSchema.safeParse(body)

  if (!result.success) {
    return NextResponse.json({ error: result.error.flatten() }, { status: 422 })
  }

  const { name, email, company, location, project_type, preferred_date, budget, message } = result.data

  const enquiry = {
    name,
    email,
    company:        company        || null,
    location:       location       || null,
    project_type,
    preferred_date: preferred_date || null,
    budget:         budget         || null,
    message,
  }

  // 1. Persist to Supabase — must succeed
  const supabase = createServerClient()
  const { error: dbError } = await supabase.from('form_submissions').insert(enquiry)

  if (dbError) {
    console.error('[submit-form] db error:', dbError)
    return NextResponse.json({ error: 'Failed to submit form.' }, { status: 500 })
  }

  // 2. Send emails — non-blocking; failures do not affect the response
  await Promise.allSettled([
    sendEnquiryNotification(enquiry),
    sendEnquiryConfirmation(enquiry),
  ]).then(results => {
    results.forEach((r, i) => {
      if (r.status === 'rejected') {
        console.error(`[submit-form] email ${i === 0 ? 'notification' : 'confirmation'} failed:`, r.reason)
      }
    })
  })

  return NextResponse.json({ success: true })
}
