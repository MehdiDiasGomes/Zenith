import { Resend } from 'resend'
import { z } from 'zod'
import { generateContactEmailHtml, generateContactEmailText, type ContactEmailData } from '~/templates/email/contact'

const RECAPTCHA_SCORE_THRESHOLD = 0.5

const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  subject: z.string().min(3),
  message: z.string().min(10),
  recaptchaToken: z.string().min(1),
})

interface RecaptchaVerifyResponse {
  success: boolean
  score: number
  action: string
  'error-codes'?: string[]
}

async function verifyRecaptchaToken(secretKey: string, token: string): Promise<void> {
  const res = await fetch('https://www.google.com/recaptcha/api/siteverify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `secret=${encodeURIComponent(secretKey)}&response=${encodeURIComponent(token)}`,
  })

  const response = await res.json() as RecaptchaVerifyResponse

  if (!response.success || response.score < RECAPTCHA_SCORE_THRESHOLD) {
    throw createError({ statusCode: 403, statusMessage: 'reCAPTCHA verification failed' })
  }
}

async function sendContactEmail(resendApiKey: string, contactEmail: string, data: ContactEmailData): Promise<string | undefined> {
  const resend = new Resend(resendApiKey)
  const { data: result, error } = await resend.emails.send({
    from: contactEmail,
    to: [contactEmail],
    replyTo: data.email,
    subject: `Nouveau contact: ${data.subject}`,
    html: generateContactEmailHtml(data),
    text: generateContactEmailText(data),
  })

  if (error) {
    console.error('Resend error:', error)
    throw createError({ statusCode: 500, statusMessage: 'Failed to send email' })
  }

  return result?.id
}

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const validatedData = contactSchema.parse(body)

    const { resendApiKey, contactEmail, recaptchaSecretKey } = useRuntimeConfig()

    if (!recaptchaSecretKey) throw createError({ statusCode: 500, statusMessage: 'reCAPTCHA secret key is not configured' })
    if (!resendApiKey) throw createError({ statusCode: 500, statusMessage: 'Resend API key is not configured' })
    if (!contactEmail) throw createError({ statusCode: 500, statusMessage: 'Contact email is not configured' })

    await verifyRecaptchaToken(recaptchaSecretKey, validatedData.recaptchaToken)

    const { recaptchaToken: _, ...emailData } = validatedData
    const messageId = await sendContactEmail(resendApiKey, contactEmail, emailData)

    return { success: true, messageId }
  } catch (error) {
    console.error('Contact form error:', error)

    if (error instanceof z.ZodError) {
      throw createError({ statusCode: 400, statusMessage: 'Invalid form data', data: error.errors })
    }

    throw error
  }
})
