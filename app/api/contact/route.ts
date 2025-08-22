import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

const contactSchema = z.object({
    name: z.string().min(2),
    email: z.string().email(),
    subject: z.string().min(5),
    message: z.string().min(10),
})

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()

        // Validate the request body
        const validatedData = contactSchema.parse(body)

        // Here you would typically send an email or save to a database
        // For now, we'll just log the contact form submission
        console.log('Contact form submission:', {
            ...validatedData,
            timestamp: new Date().toISOString(),
            userAgent: request.headers.get('user-agent'),
            ip: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip'),
        })

        // In a real application, you would:
        // 1. Send an email using a service like SendGrid, Resend, or Nodemailer
        // 2. Store the contact in a database
        // 3. Send auto-reply confirmation email

        // Example with a hypothetical email service:
        /*
        await emailService.send({
          to: 'your-email@example.com',
          subject: `Contact Form: ${validatedData.subject}`,
          html: `
            <h3>New Contact Form Submission</h3>
            <p><strong>Name:</strong> ${validatedData.name}</p>
            <p><strong>Email:</strong> ${validatedData.email}</p>
            <p><strong>Subject:</strong> ${validatedData.subject}</p>
            <p><strong>Message:</strong></p>
            <p>${validatedData.message.replace(/\n/g, '<br>')}</p>
          `,
        })
        */

        return NextResponse.json(
            { message: 'Contact form submitted successfully' },
            { status: 200 }
        )
    } catch (error) {
        console.error('Contact form error:', error)

        if (error instanceof z.ZodError) {
            return NextResponse.json(
                { error: 'Invalid form data', details: error.issues },
                { status: 400 }
            )
        }

        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        )
    }
}
