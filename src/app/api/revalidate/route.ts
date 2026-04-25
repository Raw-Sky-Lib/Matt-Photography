import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'

export async function POST(request: NextRequest) {
  const secret = request.headers.get('X-Revalidate-Secret')
  const clientId = request.headers.get('X-Client-ID')

  if (
    secret !== process.env.REVALIDATE_SECRET ||
    clientId !== process.env.AGENCY_CLIENT_ID
  ) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await request.json()
  const paths: string[] = body.paths ?? []

  for (const path of paths) {
    revalidatePath(path)
  }

  return NextResponse.json({ revalidated: true, paths })
}
