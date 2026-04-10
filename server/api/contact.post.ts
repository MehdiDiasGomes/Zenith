import { Resend } from 'resend'
import { z } from 'zod'
import { generateContactEmailHtml, generateContactEmailText, type ContactEmailData } from '~/templates/email/contact'

const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  subject: z.string().min(3),
  message: z.string().min(10),
})

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

    const { resendApiKey, contactEmail } = useRuntimeConfig()

    if (!resendApiKey) throw createError({ statusCode: 500, statusMessage: 'Resend API key is not configured' })
    if (!contactEmail) throw createError({ statusCode: 500, statusMessage: 'Contact email is not configured' })

    const messageId = await sendContactEmail(resendApiKey, contactEmail, validatedData)

    return { success: true, messageId }
  } catch (error) {
    console.error('Contact form error:', error)

    if (error instanceof z.ZodError) {
      throw createError({ statusCode: 400, statusMessage: 'Invalid form data', data: error.errors })
    }

    throw createError({ statusCode: 500, statusMessage: 'Internal server error' })
  }
})
