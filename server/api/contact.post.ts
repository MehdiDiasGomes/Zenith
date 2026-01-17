import { Resend } from 'resend'
import { z } from 'zod'
import { generateContactEmailHtml, generateContactEmailText } from '~/templates/email/contact'

const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  subject: z.string().min(3),
  message: z.string().min(10),
})

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const validatedData = contactSchema.parse(body)

    const config = useRuntimeConfig()
    const resendApiKey: string | undefined = config.resendApiKey
    const contactEmail: string | undefined = config.contactEmail

    if (!resendApiKey) {
      throw createError({
        statusCode: 500,
        statusMessage: 'Resend API key is not configured',
      })
    }

    if (!contactEmail) {
      throw createError({
        statusCode: 500,
        statusMessage: 'Contact email is not configured',
      })
    }

    const resend = new Resend(resendApiKey)

    const htmlContent: string = generateContactEmailHtml(validatedData)
    const textContent: string = generateContactEmailText(validatedData)

    const { data, error } = await resend.emails.send({
      from: useRuntimeConfig().contactEmail,
      to: [contactEmail],
      replyTo: validatedData.email,
      subject: `Nouveau contact: ${validatedData.subject}`,
      html: htmlContent,
      text: textContent,
    })

    if (error) {
      console.error('Resend error:', error)
      throw createError({
        statusCode: 500,
        statusMessage: 'Failed to send email',
      })
    }

    return {
      success: true,
      messageId: data?.id,
    }
  } catch (error) {
    console.error('Contact form error:', error)

    if (error instanceof z.ZodError) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Invalid form data',
        data: error.errors,
      })
    }

    throw createError({
      statusCode: 500,
      statusMessage: 'Internal server error',
    })
  }
})
