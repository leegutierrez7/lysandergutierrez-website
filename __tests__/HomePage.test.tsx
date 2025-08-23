import { render, screen } from '@testing-library/react'
import HomePage from '../app/page'
import type { ReactNode } from 'react'

// Mock ScrollAnimation component
jest.mock('../components/ScrollAnimation', () => {
  interface MockScrollAnimationProps {
    children: ReactNode
    animation?: string
    delay?: number
  }
  return function MockScrollAnimation({
    children,
    animation,
  }: MockScrollAnimationProps) {
    return <div data-testid={`scroll-animation-${animation}`}>{children}</div>
  }
})

describe('HomePage', () => {
  it('renders the hero section with name and title', () => {
    render(<HomePage />)

    expect(screen.getByText('Lysander Gutierrez')).toBeInTheDocument()
    expect(
      screen.getByText('Full-Stack Software Engineer | Cloud Enthusiast')
    ).toBeInTheDocument()
  })

  it('renders the introduction text', () => {
    render(<HomePage />)

    expect(
      screen.getByText(/Welcome to my personal website!/)
    ).toBeInTheDocument()
    expect(
      screen.getByText(/passionate about building scalable applications/)
    ).toBeInTheDocument()
  })

  it('renders call-to-action buttons', () => {
    render(<HomePage />)

    expect(screen.getByRole('link', { name: /view my work/i })).toHaveAttribute(
      'href',
      '/projects'
    )
    expect(screen.getByRole('link', { name: /get in touch/i })).toHaveAttribute(
      'href',
      '/contact'
    )
  })

  it('renders technology skills section', () => {
    render(<HomePage />)

    expect(screen.getByText('Technologies I Work With')).toBeInTheDocument()

    // Check for some key technologies
    expect(screen.getByText('React/Next.js')).toBeInTheDocument()
    expect(screen.getByText('TypeScript')).toBeInTheDocument()
    expect(screen.getByText('AWS/Cloud')).toBeInTheDocument()
    expect(screen.getByText('Python')).toBeInTheDocument()
  })

  it('renders final call-to-action section', () => {
    render(<HomePage />)

    expect(
      screen.getByText('Ready to Build Something Amazing?')
    ).toBeInTheDocument()
    expect(
      screen.getByRole('link', { name: /start a conversation/i })
    ).toHaveAttribute('href', '/contact')
  })

  it('has proper heading hierarchy', () => {
    render(<HomePage />)

    const h1 = screen.getByRole('heading', { level: 1 })
    const h2Elements = screen.getAllByRole('heading', { level: 2 })

    expect(h1).toHaveTextContent('Lysander Gutierrez')
    expect(h2Elements).toHaveLength(2) // Technologies and Ready to Build
  })

  it('renders responsive image with proper attributes', () => {
    render(<HomePage />)

    const image = screen.getByAltText('Lysander Gutierrez')
    expect(image).toBeInTheDocument()
    expect(image).toHaveAttribute(
      'src',
      expect.stringContaining('headshot.jpg')
    )
  })
})
