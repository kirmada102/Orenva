import { NextResponse } from 'next/server'

// Waitlist signup endpoint. Validates the email server-side and
// acknowledges the signup.
//
// TODO(persistence): no datastore is wired yet. Before launch, connect
// this to a real store — a database table, a Resend/Mailchimp audience,
// or a sheet — at the marked line below. Until then signups are
// validated and logged but not retained.

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function POST(request: Request) {
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 })
  }

  const raw = (body as { email?: unknown })?.email
  const email = typeof raw === 'string' ? raw.trim().toLowerCase() : ''

  if (!email || email.length > 254 || !EMAIL_RE.test(email)) {
    return NextResponse.json(
      { error: 'Please enter a valid email address.' },
      { status: 400 },
    )
  }

  // ─── Persist the signup here ───
  console.log('[waitlist] signup:', email)

  return NextResponse.json({ ok: true })
}
