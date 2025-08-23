import { NextRequest, NextResponse } from 'next/server'

interface NewsletterRequest {
  email: string
}

interface NewsletterResponse {
  success: boolean
  message: string
  error?: string
}

export async function POST(
  request: NextRequest
): Promise<NextResponse<NewsletterResponse>> {
  try {
    const { email }: NewsletterRequest = await request.json()

    // Validate email
    if (!email || !email.includes('@')) {
      return NextResponse.json(
        {
          success: false,
          message: 'Please provide a valid email address',
          error: 'Invalid email format',
        },
        { status: 400 }
      )
    }

    // Example integration with ConvertKit
    const CONVERTKIT_API_URL = 'https://api.convertkit.com/v3'
    const FORM_ID = process.env.CONVERTKIT_FORM_ID
    const API_KEY = process.env.CONVERTKIT_API_KEY

    if (!FORM_ID || !API_KEY) {
      console.error('ConvertKit configuration missing')
      return NextResponse.json(
        {
          success: false,
          message: 'Newsletter service is temporarily unavailable',
          error: 'Configuration missing',
        },
        { status: 500 }
      )
    }

    // Subscribe to ConvertKit
    const response = await fetch(
      `${CONVERTKIT_API_URL}/forms/${FORM_ID}/subscribe`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          api_key: API_KEY,
          email: email,
          tags: ['website-newsletter', 'lysander-gutierrez-website'],
        }),
      }
    )

    if (response.ok) {
      const data = await response.json()

      // Log successful subscription (for analytics)
      console.log(`Newsletter subscription: ${email}`)

      return NextResponse.json({
        success: true,
        message: 'Successfully subscribed! Check your email for confirmation.',
      })
    } else {
      const errorData = await response.json()
      console.error('ConvertKit API error:', errorData)

      // Handle specific ConvertKit errors
      if (errorData.message?.includes('already subscribed')) {
        return NextResponse.json(
          {
            success: false,
            message: 'This email is already subscribed to our newsletter.',
            error: 'Already subscribed',
          },
          { status: 409 }
        )
      }

      return NextResponse.json(
        {
          success: false,
          message: 'Failed to subscribe. Please try again later.',
          error: errorData.message || 'ConvertKit API error',
        },
        { status: 500 }
      )
    }
  } catch (error) {
    console.error('Newsletter subscription error:', error)

    return NextResponse.json(
      {
        success: false,
        message: 'An unexpected error occurred. Please try again later.',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}

// Handle GET requests (not needed for newsletter, but good practice)
export async function GET(): Promise<NextResponse> {
  return NextResponse.json({
    message: 'Newsletter API endpoint. Use POST to subscribe.',
    endpoints: {
      POST: '/api/newsletter - Subscribe to newsletter',
    },
  })
}
