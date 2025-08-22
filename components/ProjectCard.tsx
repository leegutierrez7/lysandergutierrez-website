import React from 'react'
import { ProjectMeta } from '../data/projects'
import { ExternalLink, Github, Calendar, Tag } from 'lucide-react'

interface Props {
    project: ProjectMeta
    index: number
    compact?: boolean
}

export default function ProjectCard({ project, index, compact = false }: Props) {
    const statusColors = {
        active: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400',
        'in-progress': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400',
        archived: 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400'
    }

    return (
        <article
            className="group relative rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6 flex flex-col gap-4 shadow-sm hover:shadow-lg transition-all duration-300 transform hover:scale-105 focus-within:ring-2 focus-within:ring-blue-500"
            tabIndex={-1}
            aria-labelledby={`project-${project.slug}`}
            style={{ animationDelay: `${index * 80}ms` }}
        >
            <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                    <div className="text-3xl" aria-hidden>{project.icon || '📦'}</div>
                    <div>
                        <h3 id={`project-${project.slug}`} className="text-xl font-semibold text-gray-900 dark:text-white">
                            {project.name}
                        </h3>
                        {project.year && (
                            <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400 mt-1">
                                <Calendar className="w-3 h-3" />
                                {project.year}
                            </div>
                        )}
                    </div>
                </div>
                {project.status && (
                    <span className={`px-2 py-1 text-xs rounded-full ${statusColors[project.status as keyof typeof statusColors]}`}>
                        {project.status}
                    </span>
                )}
            </div>

            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                {project.description}
            </p>

            {!compact && project.highlights?.length > 0 && (
                <ul className="space-y-1 text-sm text-gray-700 dark:text-gray-300 list-disc pl-5">
                    {project.highlights.slice(0, 3).map(h => <li key={h}>{h}</li>)}
                </ul>
            )}

            <div className="flex flex-wrap gap-2">
                {project.tech.slice(0, compact ? 3 : 5).map((tech: string) => (
                    <span
                        key={tech}
                        className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-200"
                    >
                        <Tag className="w-3 h-3 mr-1" />
                        {tech}
                    </span>
                ))}
                {project.tech.length > (compact ? 3 : 5) && (
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                        +{project.tech.length - (compact ? 3 : 5)} more
                    </span>
                )}
            </div>

            <div className="flex items-center gap-3 mt-auto pt-2">
                {project.repo && (
                    <a
                        href={project.repo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                        aria-label={`View ${project.name} source code`}
                    >
                        <Github className="w-4 h-4" />
                        Code
                    </a>
                )}
                {project.demo && (
                    <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                        aria-label={`View ${project.name} live demo`}
                    >
                        <ExternalLink className="w-4 h-4" />
                        Demo
                    </a>
                )}
            </div>
        </article>
    )
}
// Component cleaned: only single return and closing.
