'use client'

import { useState, useEffect, useMemo } from 'react'
import { Search, X, FileText, Code2, User, Mail } from 'lucide-react'
import { getAllProjects } from '../data/projects'
import { getAllPosts } from '../lib/blog'
import { isBlogEnabled } from '../lib/featureFlags'

interface SearchResult {
  id: string
  type: 'page' | 'project' | 'blog' | 'skill'
  title: string
  description: string
  url: string
  icon: React.ReactNode
  tags?: string[]
  score?: number
}

interface SearchModalProps {
  isOpen: boolean
  onClose: () => void
}

// Search index data
const getSearchData = async (): Promise<SearchResult[]> => {
  const projects = getAllProjects()
  const blogPosts = isBlogEnabled() ? getAllPosts() : []

  const searchData: SearchResult[] = [
    // Pages
    {
      id: 'home',
      type: 'page',
      title: 'Home',
      description: 'Lysander Gutierrez - Full-Stack Software Engineer',
      url: '/',
      icon: <User className="h-4 w-4" />,
      tags: ['home', 'about', 'intro', 'lysander', 'gutierrez'],
    },
    {
      id: 'about',
      type: 'page',
      title: 'About',
      description: 'Learn more about my background and experience',
      url: '/about',
      icon: <User className="h-4 w-4" />,
      tags: ['about', 'background', 'experience', 'bio'],
    },
    {
      id: 'projects',
      type: 'page',
      title: 'Projects',
      description: 'View my software engineering projects and work',
      url: '/projects',
      icon: <Code2 className="h-4 w-4" />,
      tags: ['projects', 'work', 'portfolio', 'code', 'development'],
    },
    ...(isBlogEnabled()
      ? [
          {
            id: 'blog',
            type: 'page' as const,
            title: 'Blog',
            description: 'Read my latest thoughts on software development',
            url: '/blog',
            icon: <FileText className="h-4 w-4" />,
            tags: ['blog', 'articles', 'writing', 'thoughts', 'development'],
          },
        ]
      : []),
    {
      id: 'contact',
      type: 'page',
      title: 'Contact',
      description: 'Get in touch with me',
      url: '/contact',
      icon: <Mail className="h-4 w-4" />,
      tags: ['contact', 'email', 'reach out', 'hire', 'collaborate'],
    },

    // Projects
    ...projects.map(project => ({
      id: `project-${project.slug}`,
      type: 'project' as const,
      title: project.name,
      description: project.description,
      url: `/projects#${project.slug}`,
      icon: <Code2 className="h-4 w-4" />,
      tags: [
        ...project.tech.map(t => t.toLowerCase()),
        project.category || '',
        ...project.highlights.map(h => h.toLowerCase()),
      ],
    })),

    // Blog posts
    ...blogPosts.map(post => ({
      id: `blog-${post.slug}`,
      type: 'blog' as const,
      title: post.title,
      description: post.description,
      url: `/blog/${post.slug}`,
      icon: <FileText className="h-4 w-4" />,
      tags: [...(post.tags || []).map(t => t.toLowerCase()), 'blog', 'article'],
    })),

    // Skills/Technologies
    {
      id: 'skill-react',
      type: 'skill',
      title: 'React & Next.js',
      description: 'Frontend framework expertise',
      url: '/projects',
      icon: <Code2 className="h-4 w-4" />,
      tags: ['react', 'nextjs', 'frontend', 'javascript', 'typescript'],
    },
    {
      id: 'skill-backend',
      type: 'skill',
      title: 'Backend Development',
      description: 'Node.js, Python, Go, APIs',
      url: '/projects',
      icon: <Code2 className="h-4 w-4" />,
      tags: ['backend', 'nodejs', 'python', 'go', 'api', 'server'],
    },
    {
      id: 'skill-cloud',
      type: 'skill',
      title: 'Cloud & DevOps',
      description: 'AWS, Docker, Kubernetes',
      url: '/projects',
      icon: <Code2 className="h-4 w-4" />,
      tags: ['cloud', 'aws', 'docker', 'kubernetes', 'devops', 'deployment'],
    },
  ]

  return searchData
}

// Fuzzy search implementation
const fuzzySearch = (query: string, data: SearchResult[]): SearchResult[] => {
  if (!query.trim()) return []

  const queryLower = query.toLowerCase()
  const queryWords = queryLower.split(' ').filter(word => word.length > 0)

  const scoredResults = data.map(item => {
    let score = 0
    const titleLower = item.title.toLowerCase()
    const descriptionLower = item.description.toLowerCase()
    const tagsText = (item.tags || []).join(' ').toLowerCase()

    // Exact title match (highest priority)
    if (titleLower === queryLower) {
      score += 100
    } else if (titleLower.includes(queryLower)) {
      score += 80
    }

    // Title word matches
    queryWords.forEach(word => {
      if (titleLower.includes(word)) {
        score += 50
      }
      if (titleLower.startsWith(word)) {
        score += 30
      }
    })

    // Description matches
    if (descriptionLower.includes(queryLower)) {
      score += 40
    }
    queryWords.forEach(word => {
      if (descriptionLower.includes(word)) {
        score += 20
      }
    })

    // Tag matches
    if (tagsText.includes(queryLower)) {
      score += 60
    }
    queryWords.forEach(word => {
      if (tagsText.includes(word)) {
        score += 30
      }
    })

    return { ...item, score }
  })

  return scoredResults
    .filter(item => item.score > 0)
    .sort((a, b) => (b.score || 0) - (a.score || 0))
    .slice(0, 8) // Limit to top 8 results
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('')
  const [searchData, setSearchData] = useState<SearchResult[]>([])
  const [selectedIndex, setSelectedIndex] = useState(0)

  // Load search data
  useEffect(() => {
    getSearchData().then(setSearchData)
  }, [])

  // Perform search
  const results = useMemo(() => {
    return fuzzySearch(query, searchData)
  }, [query, searchData])

  // Reset selected index when results change
  useEffect(() => {
    setSelectedIndex(0)
  }, [results])

  // Handle keyboard navigation
  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault()
          setSelectedIndex(prev => Math.min(prev + 1, results.length - 1))
          break
        case 'ArrowUp':
          e.preventDefault()
          setSelectedIndex(prev => Math.max(prev - 1, 0))
          break
        case 'Enter':
          e.preventDefault()
          if (results[selectedIndex]) {
            window.location.href = results[selectedIndex].url
            onClose()
          }
          break
        case 'Escape':
          onClose()
          break
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, results, selectedIndex, onClose])

  // Clear search when modal closes
  useEffect(() => {
    if (!isOpen) {
      setQuery('')
      setSelectedIndex(0)
    }
  }, [isOpen])

  if (!isOpen) return null

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'page':
        return 'text-blue-600 dark:text-blue-400'
      case 'project':
        return 'text-green-600 dark:text-green-400'
      case 'blog':
        return 'text-purple-600 dark:text-purple-400'
      case 'skill':
        return 'text-orange-600 dark:text-orange-400'
      default:
        return 'text-gray-600 dark:text-gray-400'
    }
  }

  const getTypeBadge = (type: string) => {
    switch (type) {
      case 'page':
        return 'Page'
      case 'project':
        return 'Project'
      case 'blog':
        return 'Blog'
      case 'skill':
        return 'Skill'
      default:
        return 'Item'
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/50 pt-[10vh] backdrop-blur-sm">
      <div className="mx-4 max-h-[80vh] w-full max-w-2xl overflow-hidden rounded-lg bg-white shadow-xl dark:bg-gray-800">
        {/* Search Input */}
        <div className="flex items-center border-b border-gray-200 p-4 dark:border-gray-700">
          <Search className="mr-3 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search projects, blog posts, skills..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            className="flex-1 bg-transparent text-lg text-gray-900 placeholder-gray-500 outline-none dark:text-white"
            autoFocus
          />
          <button
            onClick={onClose}
            className="ml-3 rounded-md p-1 transition-colors hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <X className="h-5 w-5 text-gray-400" />
          </button>
        </div>

        {/* Search Results */}
        <div className="max-h-96 overflow-y-auto">
          {query.trim() === '' ? (
            <div className="p-8 text-center text-gray-500 dark:text-gray-400">
              <Search className="mx-auto mb-4 h-12 w-12 opacity-50" />
              <p className="mb-2 text-lg font-medium">Search my portfolio</p>
              <p className="text-sm">
                Find projects, blog posts, skills, and more...
              </p>
            </div>
          ) : results.length === 0 ? (
            <div className="p-8 text-center text-gray-500 dark:text-gray-400">
              <Search className="mx-auto mb-4 h-12 w-12 opacity-50" />
              <p className="mb-2 text-lg font-medium">No results found</p>
              <p className="text-sm">
                Try searching for "React", "projects", or "blog"
              </p>
            </div>
          ) : (
            <div className="py-2">
              {results.map((result, index) => (
                <button
                  key={result.id}
                  onClick={() => {
                    window.location.href = result.url
                    onClose()
                  }}
                  className={`w-full px-4 py-3 text-left transition-colors hover:bg-gray-50 dark:hover:bg-gray-700 ${
                    index === selectedIndex ? 'bg-gray-50 dark:bg-gray-700' : ''
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <div className={`mt-1 ${getTypeColor(result.type)}`}>
                      {result.icon}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="mb-1 flex items-center space-x-2">
                        <h3 className="truncate text-sm font-medium text-gray-900 dark:text-white">
                          {result.title}
                        </h3>
                        <span
                          className={`rounded-full bg-gray-100 px-2 py-0.5 text-xs dark:bg-gray-700 ${getTypeColor(result.type)}`}
                        >
                          {getTypeBadge(result.type)}
                        </span>
                      </div>
                      <p className="line-clamp-2 text-sm text-gray-500 dark:text-gray-400">
                        {result.description}
                      </p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {query.trim() !== '' && results.length > 0 && (
          <div className="border-t border-gray-200 px-4 py-3 text-xs text-gray-500 dark:border-gray-700 dark:text-gray-400">
            <div className="flex items-center justify-between">
              <span>Use ↑↓ to navigate, Enter to select, Esc to close</span>
              <span>
                {results.length} result{results.length !== 1 ? 's' : ''}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
