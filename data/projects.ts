export interface ProjectMeta {
    slug: string
    name: string
    description: string
    highlights: string[]
    tech: string[]
    repo?: string
    demo?: string
    icon?: string
    year?: string
    status?: 'active' | 'archived' | 'in-progress'
    category?: 'web' | 'mobile' | 'api' | 'tool' | 'library'
    images?: string[]
}

export const personalProjects: ProjectMeta[] = [
    {
        slug: 'portfolio',
        name: 'Portfolio Platform',
        description: 'Modern, accessible, dark-mode aware personal site built with the Next.js App Router and performance-focused patterns.',
        highlights: [
            'App Router + incremental SEO (robots, sitemap, JSON‑LD)',
            'Accessibility upgrades (skip link, reduced‑motion fallbacks)',
            'Reusable animation + counter primitives',
            'Command palette for enhanced navigation',
            'Blog system with MDX support'
        ],
        tech: ['Next.js 15', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'MDX'],
        repo: 'https://github.com/leegutierrez7/lysandergutierrez-website',
        demo: 'https://lysandergutierrez.com',
        icon: '🌐',
        year: new Date().getFullYear().toString(),
        status: 'active',
        category: 'web'
    },
    {
        slug: 'ai-chat',
        name: 'AI Chat Application',
        description: 'Real‑time chat interface integrating LLM responses with conversation context retention.',
        highlights: [
            'Streaming token UX with real-time responses',
            'Conversation persistence layer',
            'Prompt/response latency optimizations',
            'Multi-model support (GPT, Claude, etc.)',
            'Custom RAG implementation'
        ],
        tech: ['React', 'OpenAI API', 'WebSockets', 'Node.js', 'PostgreSQL'],
        icon: '🤖',
        year: '2024',
        status: 'in-progress',
        category: 'web'
    },
    {
        slug: 'nasa-mission-tracker',
        name: 'NASA Mission Tracker',
        description: 'Real-time tracking dashboard for NASA missions with live telemetry data visualization.',
        highlights: [
            'Live telemetry data integration',
            'Interactive 3D visualization',
            'Real-time mission status updates',
            'Multi-mission support',
            'Mobile-responsive design'
        ],
        tech: ['React', 'Three.js', 'Python', 'NASA APIs', 'WebGL'],
        icon: '🚀',
        year: '2024',
        status: 'active',
        category: 'web'
    },
    {
        slug: 'microservices-api',
        name: 'Microservices API Gateway',
        description: 'Scalable API gateway built with Go, featuring load balancing, rate limiting, and service discovery.',
        highlights: [
            'High-performance Go implementation',
            'Automatic service discovery',
            'Rate limiting and circuit breaker patterns',
            'Comprehensive monitoring and logging',
            'Docker containerization'
        ],
        tech: ['Go', 'Docker', 'Kubernetes', 'Redis', 'Prometheus'],
        repo: 'https://github.com/leegutierrez7/api-gateway',
        icon: '⚡',
        year: '2023',
        status: 'active',
        category: 'api'
    },
    {
        slug: 'fintech-dashboard',
        name: 'FinTech Analytics Dashboard',
        description: 'Comprehensive financial analytics platform with real-time market data and trading insights.',
        highlights: [
            'Real-time market data integration',
            'Advanced charting and visualization',
            'Portfolio performance tracking',
            'Risk assessment algorithms',
            'Secure authentication and authorization'
        ],
        tech: ['Next.js', 'TypeScript', 'D3.js', 'Python', 'AWS'],
        icon: '📊',
        year: '2023',
        status: 'archived',
        category: 'web'
    },
    {
        slug: 'cli-deployment-tool',
        name: 'CLI Deployment Tool',
        description: 'Command-line tool for automated application deployment across multiple cloud providers.',
        highlights: [
            'Multi-cloud support (AWS, GCP, Azure)',
            'Infrastructure as Code integration',
            'Automated rollback capabilities',
            'Configuration validation',
            'Deployment pipeline orchestration'
        ],
        tech: ['Go', 'Terraform', 'AWS CLI', 'GitHub Actions'],
        repo: 'https://github.com/leegutierrez7/deploy-cli',
        icon: '🛠️',
        year: '2023',
        status: 'active',
        category: 'tool'
    }
]

export const workProjects: ProjectMeta[] = [
    {
        slug: 'flight-operations-system',
        name: 'Flight Operations Management System',
        description: 'Enterprise system for managing flight operations, crew scheduling, and aircraft maintenance at NASA.',
        highlights: [
            'Real-time flight tracking and monitoring',
            'Crew scheduling optimization algorithms',
            'Maintenance tracking and compliance',
            'Integration with FAA systems',
            'High availability and disaster recovery'
        ],
        tech: ['Java', 'Spring Boot', 'Oracle DB', 'Angular', 'Apache Kafka'],
        icon: '✈️',
        year: '2024',
        status: 'active',
        category: 'web'
    },
    {
        slug: 'financial-risk-api',
        name: 'Financial Risk Assessment API',
        description: 'High-performance API for real-time financial risk assessment and fraud detection at Capital One.',
        highlights: [
            'Sub-100ms response times',
            'Machine learning integration',
            'Real-time fraud detection',
            'Compliance with financial regulations',
            'Scalable microservices architecture'
        ],
        tech: ['Python', 'FastAPI', 'TensorFlow', 'Kubernetes', 'PostgreSQL'],
        icon: '🏦',
        year: '2023',
        status: 'active',
        category: 'api'
    }
]

export const getAllProjects = (): ProjectMeta[] => {
    return [...personalProjects, ...workProjects].sort((a, b) => {
        const yearA = parseInt(a.year || '0')
        const yearB = parseInt(b.year || '0')
        return yearB - yearA
    })
}

export const getProjectsByCategory = (category: string): ProjectMeta[] => {
    return getAllProjects().filter(project => project.category === category)
}

export const getFeaturedProjects = (): ProjectMeta[] => {
    return getAllProjects().filter(project => project.status === 'active').slice(0, 4)
}
