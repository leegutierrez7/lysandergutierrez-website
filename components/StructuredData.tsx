import React from 'react'

interface PersonSchema {
  '@context': string
  '@type': string
  name: string
  jobTitle: string
  description: string
  url: string
  image?: string
  worksFor?: {
    '@type': string
    name: string
    url?: string
  }
  sameAs: string[]
  knowsAbout: string[]
  alumniOf?: {
    '@type': string
    name: string
  }[]
  address?: {
    '@type': string
    addressLocality: string
    addressRegion: string
    addressCountry: string
  }
}

interface BlogPostSchema {
  '@context': string
  '@type': string
  headline: string
  description: string
  image?: string
  author: {
    '@type': string
    name: string
    url: string
  }
  publisher: {
    '@type': string
    name: string
    url: string
  }
  datePublished: string
  dateModified: string
  mainEntityOfPage: {
    '@type': string
    '@id': string
  }
}

interface WebsiteSchema {
  '@context': string
  '@type': string
  name: string
  description: string
  url: string
  author: {
    '@type': string
    name: string
  }
  inLanguage: string
}

interface StructuredDataProps {
  type?: 'person' | 'blog-post' | 'website'
  data?: any
}

export default function StructuredData({
  type = 'person',
  data = {},
}: StructuredDataProps) {
  const getPersonSchema = (): PersonSchema => ({
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Lysander Gutierrez',
    jobTitle: 'Full-Stack Software Engineer',
    description:
      'Software Engineer specializing in full-stack development, cloud architecture, and scalable APIs. Experienced at NASA and Capital One.',
    url: 'https://lysandergutierrez.com',
    image: 'https://lysandergutierrez.com/headshot.jpg',
    worksFor: {
      '@type': 'Organization',
      name: 'NASA',
      url: 'https://nasa.gov',
    },
    sameAs: [
      'https://linkedin.com/in/lysandergutierrez',
      'https://github.com/leegutierrez7',
      'https://twitter.com/lysandergutierrez',
    ],
    knowsAbout: [
      'JavaScript',
      'TypeScript',
      'React',
      'Next.js',
      'Node.js',
      'Python',
      'Go',
      'AWS',
      'Docker',
      'Kubernetes',
      'PostgreSQL',
      'Software Engineering',
      'Full-Stack Development',
      'Cloud Computing',
      'API Development',
    ],
    alumniOf: [
      {
        '@type': 'EducationalOrganization',
        name: 'University of Central Florida',
      },
    ],
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Orlando',
      addressRegion: 'FL',
      addressCountry: 'US',
    },
  })

  const getBlogPostSchema = (): BlogPostSchema => ({
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: data.title || 'Blog Post',
    description: data.description || 'A blog post by Lysander Gutierrez',
    image: data.image || 'https://lysandergutierrez.com/headshot.jpg',
    author: {
      '@type': 'Person',
      name: 'Lysander Gutierrez',
      url: 'https://lysandergutierrez.com',
    },
    publisher: {
      '@type': 'Person',
      name: 'Lysander Gutierrez',
      url: 'https://lysandergutierrez.com',
    },
    datePublished: data.date || new Date().toISOString(),
    dateModified: data.updatedDate || data.date || new Date().toISOString(),
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://lysandergutierrez.com/blog/${data.slug}`,
    },
  })

  const getWebsiteSchema = (): WebsiteSchema => ({
    '@context': 'https://schema.org',
    '@type': 'Website',
    name: 'Lysander Gutierrez Portfolio',
    description:
      'Personal website of Lysander Gutierrez, Software Engineer specializing in full-stack development, cloud architecture, and scalable APIs.',
    url: 'https://lysandergutierrez.com',
    author: {
      '@type': 'Person',
      name: 'Lysander Gutierrez',
    },
    inLanguage: 'en-US',
  })

  const getSchema = () => {
    switch (type) {
      case 'person':
        return getPersonSchema()
      case 'blog-post':
        return getBlogPostSchema()
      case 'website':
        return getWebsiteSchema()
      default:
        return getPersonSchema()
    }
  }

  const schema = getSchema()

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema, null, 2),
      }}
    />
  )
}
