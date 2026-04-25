import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { createServerClient } from '@/lib/supabase/server'

const rateLimitMap = new Map<string, { count: number; resetAt: number }>()

const contactSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  project_type: z.string().min(1, 'Please select a project type'),
  message: z.string().min(10).max(2000),
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

  const supabase = createServerClient()
  const { error } = await supabase.from('form_submissions').insert({
    name: result.data.name,
    email: result.data.email,
    project_type: result.data.project_type,
    message: result.data.message,
    submitted_at: new Date().toISOString(),
  })

  if (error) {
    return NextResponse.json({ error: 'Failed to submit form.' }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
