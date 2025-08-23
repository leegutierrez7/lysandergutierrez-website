import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ContactForm from '../components/ContactForm'

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    refresh: jest.fn(),
  }),
}))

describe('ContactForm', () => {
  beforeEach(() => {
    // Reset any fetch mocks
    global.fetch = jest.fn()
  })

  afterEach(() => {
    jest.resetAllMocks()
  })

  it('renders all form fields', () => {
    render(<ContactForm />)

    expect(screen.getByLabelText(/name/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/subject/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/message/i)).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: /send message/i })
    ).toBeInTheDocument()
  })

  it('shows validation errors for empty required fields', async () => {
    const user = userEvent.setup()
    render(<ContactForm />)

    const submitButton = screen.getByRole('button', { name: /send message/i })
    await user.click(submitButton)

    await waitFor(() => {
      expect(
        screen.getByText(/name must be at least 2 characters/i)
      ).toBeInTheDocument()
      expect(
        screen.getByText(/please enter a valid email address/i)
      ).toBeInTheDocument()
      expect(
        screen.getByText(/subject must be at least 5 characters/i)
      ).toBeInTheDocument()
      expect(
        screen.getByText(/message must be at least 10 characters/i)
      ).toBeInTheDocument()
    })
  })

  it('submits form with valid data', async () => {
    const user = userEvent.setup()

    // Mock successful API response
    ;(global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true }),
    })

    render(<ContactForm />)

    // Fill out the form
    await user.type(screen.getByLabelText(/name/i), 'John Doe')
    await user.type(screen.getByLabelText(/email/i), 'john@example.com')
    await user.type(screen.getByLabelText(/subject/i), 'Test Subject')
    await user.type(
      screen.getByLabelText(/message/i),
      'This is a test message that is long enough.'
    )

    const submitButton = screen.getByRole('button', { name: /send message/i })
    await user.click(submitButton)

    // Check that the API was called
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: 'John Doe',
          email: 'john@example.com',
          subject: 'Test Subject',
          message: 'This is a test message that is long enough.',
        }),
      })
    })
  })

  it('shows loading state during submission', async () => {
    const user = userEvent.setup()

    // Mock delayed API response
    ;(global.fetch as jest.Mock).mockImplementationOnce(
      () =>
        new Promise(resolve =>
          setTimeout(
            () => resolve({ ok: true, json: () => ({ success: true }) }),
            100
          )
        )
    )

    render(<ContactForm />)

    // Fill out form with valid data
    await user.type(screen.getByLabelText(/name/i), 'John Doe')
    await user.type(screen.getByLabelText(/email/i), 'john@example.com')
    await user.type(screen.getByLabelText(/subject/i), 'Test Subject')
    await user.type(screen.getByLabelText(/message/i), 'Test message here')

    const submitButton = screen.getByRole('button', { name: /send message/i })
    await user.click(submitButton)

    // Check loading state
    expect(screen.getByText(/sending.../i)).toBeInTheDocument()
    expect(submitButton).toBeDisabled()
  })

  it('handles API errors gracefully', async () => {
    const user = userEvent.setup()

    // Mock API error
    ;(global.fetch as jest.Mock).mockRejectedValueOnce(
      new Error('Network error')
    )

    render(<ContactForm />)

    // Fill out form
    await user.type(screen.getByLabelText(/name/i), 'John Doe')
    await user.type(screen.getByLabelText(/email/i), 'john@example.com')
    await user.type(screen.getByLabelText(/subject/i), 'Test Subject')
    await user.type(screen.getByLabelText(/message/i), 'Test message here')

    const submitButton = screen.getByRole('button', { name: /send message/i })
    await user.click(submitButton)

    // Check error handling
    await waitFor(() => {
      expect(screen.getByText(/something went wrong/i)).toBeInTheDocument()
    })
  })
})
