import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

const FROM    = process.env.RESEND_FROM_EMAIL   ?? 'Matt Banton <noreply@mattbanton.com>'
const TO_MATT = process.env.MATT_NOTIFY_EMAIL   ?? 'hello@mattbanton.com'
const SITE    = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://mattbanton.com'

/* ── Shared template shell ────────────────────────────── */
function shell(body: string) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1"/>
  <title>Matt Banton</title>
</head>
<body style="margin:0;padding:0;background:#f8f8f6;font-family:Arial,Helvetica,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f8f8f6;padding:48px 16px;">
    <tr><td align="center">
      <table width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;">
        <!-- Header -->
        <tr>
          <td style="padding:40px 48px 32px;border-bottom:1px solid #d4d4d4;">
            <span style="font-size:11px;font-weight:700;letter-spacing:0.2em;text-transform:uppercase;color:#6b6b6b;">
              Matt Banton &middot; Photography
            </span>
          </td>
        </tr>
        <!-- Body -->
        <tr><td style="padding:40px 48px;">${body}</td></tr>
        <!-- Footer -->
        <tr>
          <td style="padding:24px 48px 40px;border-top:1px solid #d4d4d4;">
            <span style="font-size:11px;letter-spacing:0.1em;text-transform:uppercase;color:#a5a5a5;">
              Matt Banton Photography &middot; London &middot;
              <a href="${SITE}" style="color:#a5a5a5;text-decoration:none;">${SITE.replace(/^https?:\/\//, '')}</a>
            </span>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`
}

/* ── Shared field row ─────────────────────────────────── */
function row(label: string, value: string) {
  return `
    <tr>
      <td style="padding:10px 16px 10px 0;vertical-align:top;width:130px;
                 font-size:10px;font-weight:700;letter-spacing:0.18em;
                 text-transform:uppercase;color:#6b6b6b;white-space:nowrap;">
        ${label}
      </td>
      <td style="padding:10px 0;font-size:15px;color:#0a0a0a;line-height:1.5;">
        ${value}
      </td>
    </tr>`
}

/* ── Types ────────────────────────────────────────────── */
export interface EnquiryData {
  name:           string
  email:          string
  company?:       string | null
  location?:      string | null
  project_type:   string
  preferred_date?: string | null
  budget?:        string | null
  message:        string
}

/* ── 1. Notification to Matt ─────────────────────────── */
export async function sendEnquiryNotification(data: EnquiryData) {
  const { name, email, company, location, project_type, preferred_date, budget, message } = data

  const rows = [
    row('From',    `<a href="mailto:${email}" style="color:#0a0a0a;">${name}</a> &lt;${email}&gt;`),
    company       ? row('Company',  company)                                       : '',
    location      ? row('Location', location)                                      : '',
    row('Service', project_type),
    preferred_date ? row('Date',    preferred_date)                                : '',
    budget        ? row('Budget',   budget)                                        : '',
    row('Message', message.replace(/\n/g, '<br/>')),
  ].join('')

  const html = shell(`
    <p style="font-size:11px;font-weight:700;letter-spacing:0.2em;text-transform:uppercase;
              color:#6b6b6b;margin:0 0 20px;">New enquiry</p>
    <h1 style="font-size:28px;font-weight:700;text-transform:uppercase;color:#0a0a0a;
               margin:0 0 32px;line-height:1.1;">
      ${name}
    </h1>
    <table width="100%" cellpadding="0" cellspacing="0"
           style="border-top:1px solid #d4d4d4;">
      ${rows}
    </table>
    <div style="margin-top:32px;">
      <a href="mailto:${email}?subject=Re: Your enquiry"
         style="display:inline-block;padding:14px 24px;background:#0a0a0a;
                color:#ffffff;text-decoration:none;font-size:11px;font-weight:700;
                letter-spacing:0.18em;text-transform:uppercase;">
        Reply to ${name.split(' ')[0]}
      </a>
    </div>
  `)

  await resend.emails.send({
    from:    FROM,
    to:      TO_MATT,
    replyTo: email,
    subject: `New enquiry — ${name} · ${project_type}`,
    html,
  })
}

/* ── 2. Confirmation to submitter ────────────────────── */
export async function sendEnquiryConfirmation(data: EnquiryData) {
  const { name, email, project_type, preferred_date, budget, message } = data

  const firstName = name.split(' ')[0]

  const summaryRows = [
    row('Service', project_type),
    preferred_date ? row('Date',   preferred_date) : '',
    budget         ? row('Budget', budget)          : '',
    row('Message', message.replace(/\n/g, '<br/>')),
  ].join('')

  const html = shell(`
    <h1 style="font-size:32px;font-weight:700;text-transform:uppercase;color:#0a0a0a;
               margin:0 0 24px;line-height:1.1;">
      Got it, ${firstName}.
    </h1>
    <p style="font-size:16px;line-height:1.65;color:#2b2b2b;margin:0 0 12px;">
      Your enquiry came through. I&rsquo;ll come back to you within one working day —
      usually with a few questions and a rough sense of timing.
    </p>
    <p style="font-size:16px;line-height:1.65;color:#2b2b2b;margin:0 0 40px;">
      In the meantime, browse the portfolio at
      <a href="${SITE}" style="color:#0a0a0a;">${SITE.replace(/^https?:\/\//, '')}</a>.
    </p>
    <div style="border-top:1px solid #d4d4d4;padding-top:32px;">
      <p style="font-size:10px;font-weight:700;letter-spacing:0.18em;text-transform:uppercase;
                color:#6b6b6b;margin:0 0 16px;">Your enquiry</p>
      <table width="100%" cellpadding="0" cellspacing="0">
        ${summaryRows}
      </table>
    </div>
  `)

  await resend.emails.send({
    from:    FROM,
    to:      email,
    subject: `Enquiry received, ${firstName}`,
    html,
  })
}
