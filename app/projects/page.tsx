import Image from 'next/image'
import ScrollAnimation from '../../components/ScrollAnimation'
import ProjectCard from '../../components/ProjectCard'
import { personalProjects } from '../../data/projects'
import CompanyLogo from '../../components/CompanyLogo'
import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Projects & Experience | Lysander Gutierrez',
    description: 'Professional software engineering experience and selected projects showcasing impact, performance and scalability focus.'
}

/**
 * ProjectsPage component displays the professional experience and projects.
 */
export default function ProjectsPage() {
    const projectStructuredData = {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        itemListElement: personalProjects.map((p, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            item: {
                '@type': 'SoftwareSourceCode',
                name: p.name,
                description: p.description,
                programmingLanguage: p.tech.join(', '),
                codeRepository: p.repo,
                url: p.repo || 'https://lysandergutierrez.com/projects'
            }
        }))
    }
    return (
        <div className="space-y-20 py-10">
            <ScrollAnimation>
                <header className="text-center space-y-6 max-w-3xl mx-auto">
                    <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Projects & Experience</h1>
                    <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                        Selected work emphasizing impact, performance, and reliability. Each entry focuses on measurable results rather than feature lists.
                    </p>
                </header>
            </ScrollAnimation>

            <section aria-labelledby="experience-heading" className="space-y-10">
                <ScrollAnimation animation="fadeInUp" delay={200}>
                    <h2 id="experience-heading" className="text-2xl font-semibold tracking-tight text-gray-900 dark:text-white text-center">Professional Experience</h2>
                </ScrollAnimation>

                <div className="grid gap-10">
                    {/* NASA */}
                    <ScrollAnimation animation="fadeInLeft" delay={250}>
                        <article className="relative rounded-2xl border border-gray-200 dark:border-gray-700 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-800 p-8 shadow-md hover:shadow-lg transition-shadow">
                            <header className="flex flex-wrap items-center gap-6 mb-6">
                                <CompanyLogo src="/nasa.png" alt="NASA" size={72} variant="minimal" priority className="shadow-sm" />
                                <div className="space-y-1">
                                    <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">NASA</h3>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">Software Engineer · Feb 2020 – Mar 2022</p>
                                </div>
                            </header>
                            <ul className="space-y-3 text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                                <li><strong className="text-gray-900 dark:text-white">Mission Control OS Upgrade:</strong> Led RHEL 6 → 8 migration across mission-critical systems improving security baseline & patch cadence (<span className="font-medium">0 critical CVEs outstanding post‑migration</span>).</li>
                                <li>Optimized deployment scripts cutting rollout time from ~4h to <span className="font-medium">1h15m</span> using parallel orchestration & checksum gating.</li>
                                <li>Instituted infrastructure validation checks reducing post-deploy incidents by <span className="font-medium">&gt;30%</span>.</li>
                            </ul>
                            <div className="flex flex-wrap gap-2 mt-5">
                                {['Linux', 'RHEL', 'Bash', 'Ansible', 'Mission Critical'].map(t => (
                                    <span key={t} className="px-3 py-1 bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-200 rounded-full text-xs font-medium">{t}</span>
                                ))}
                            </div>
                        </article>
                    </ScrollAnimation>
                    {/* Capital One */}
                    <ScrollAnimation animation="fadeInRight" delay={300}>
                        <article className="relative rounded-2xl border border-gray-200 dark:border-gray-700 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-800 dark:to-gray-800 p-8 shadow-md hover:shadow-lg transition-shadow">
                            <header className="flex flex-wrap items-center gap-6 mb-6">
                                <CompanyLogo src="/capone.jpg" alt="Capital One" size={72} variant="minimal" className="shadow-sm" />
                                <div className="space-y-1">
                                    <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">Capital One</h3>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">Principal Associate Software Engineer · Mar 2022 – Present</p>
                                </div>
                            </header>
                            <ul className="space-y-3 text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                                <li><strong className="text-gray-900 dark:text-white">Latency Reduction Initiative:</strong> Re-architected core microservice in Go cutting P95 latency by <span className="font-medium">30%</span> (210ms → 147ms) via query batching & connection pooling.</li>
                                <li>Implemented canary + automated rollback pipeline reducing failed deploy MTTR to <span className="font-medium">&lt; 10 minutes</span>.</li>
                                <li>Drove container resource tuning saving ~<span className="font-medium">18%</span> monthly compute cost.</li>
                            </ul>
                            <div className="flex flex-wrap gap-2 mt-5">
                                {['Go', 'AWS', 'Docker', 'Kubernetes', 'Observability'].map(t => (
                                    <span key={t} className="px-3 py-1 bg-purple-100 dark:bg-purple-900/40 text-purple-800 dark:text-purple-200 rounded-full text-xs font-medium">{t}</span>
                                ))}
                            </div>
                        </article>
                    </ScrollAnimation>
                </div>
            </section>

            <section aria-labelledby="projects-heading" className="space-y-10">
                <ScrollAnimation animation="fadeInUp" delay={350}>
                    <h2 id="projects-heading" className="text-2xl font-semibold tracking-tight text-gray-900 dark:text-white text-center">Selected Projects</h2>
                </ScrollAnimation>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {personalProjects.map((p, i) => (
                        <ScrollAnimation key={p.slug} animation="scaleIn" delay={400 + i * 80}>
                            <ProjectCard project={p} index={i} />
                        </ScrollAnimation>
                    ))}
                    <ScrollAnimation animation="scaleIn" delay={400 + personalProjects.length * 80}>
                        <article className="rounded-2xl border border-dashed border-gray-300 dark:border-gray-600 p-6 flex flex-col items-center justify-center text-center text-sm text-gray-500 dark:text-gray-400">
                            <div className="text-4xl mb-3">🚀</div>
                            Coming Soon
                            <p className="mt-2">New experiments in cloud & AI are in progress.</p>
                        </article>
                    </ScrollAnimation>
                </div>
            </section>

            <ScrollAnimation animation="fadeInUp" delay={800}>
                <section className="rounded-2xl border border-gray-200 dark:border-gray-700 p-10 text-center bg-white dark:bg-gray-800 shadow-sm">
                    <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">Interested in Collaborating?</h2>
                    <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-6">I focus on performance, reliability, and developer experience. If that aligns with your needs, let’s connect.</p>
                    <a href="/contact" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium shadow focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors">
                        Get In Touch
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17L17 7" /><path d="M8 7h9v9" /></svg>
                    </a>
                </section>
            </ScrollAnimation>
            <script
                type="application/ld+json"
                // eslint-disable-next-line react/no-danger
                dangerouslySetInnerHTML={{ __html: JSON.stringify(projectStructuredData) }}
            />
        </div>
    )
}
