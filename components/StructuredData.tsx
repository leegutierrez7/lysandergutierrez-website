import React from 'react'

export default function StructuredData() {
    const data = {
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: 'Lysander Gutierrez',
        url: 'https://lysandergutierrez.com',
        jobTitle: 'Full-Stack Software Engineer',
        sameAs: [
            'https://www.linkedin.com/in/lysandergutierrez',
            'https://github.com/leegutierrez7'
        ],
        knowsAbout: [
            'Software Engineering',
            'Cloud Architecture',
            'APIs',
            'React',
            'TypeScript',
            'AWS',
            'Go',
            'Python'
        ]
    }
    return (
        <script
            type="application/ld+json"
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
        />
    )
}
