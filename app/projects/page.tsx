import Image from 'next/image'
import ScrollAnimation from '../../components/ScrollAnimation'

/**
 * ProjectsPage component displays the professional experience and projects.
 */
export default function ProjectsPage() {
    return (
        <div className="space-y-12 py-8">
            <ScrollAnimation>
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        Projects & Experience
                    </h1>
                    <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full"></div>
                    <p className="text-lg text-gray-600 dark:text-gray-400 mt-6 max-w-2xl mx-auto">
                        A showcase of my professional journey and the impactful projects I&apos;ve contributed to at leading organizations.
                    </p>
                </div>
            </ScrollAnimation>

            <ScrollAnimation animation="fadeInUp" delay={200}>
                <h2 className="font-bold mb-8 text-3xl text-center text-gray-900 dark:text-white">Professional Experience</h2>
            </ScrollAnimation>

            {/* NASA Experience */}
            <ScrollAnimation animation="fadeInLeft" delay={400}>
                <div className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-800 dark:to-gray-700 p-8 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-600 transform hover:scale-[1.02] transition-all duration-300">
                    {/* NASA Header with Logo */}
                    <div className="flex items-center gap-6 mb-8">
                        <div className="relative w-24 h-24 bg-white rounded-full p-2 shadow-lg">
                            <Image
                                src="/nasa.png"
                                alt="NASA logo"
                                fill
                                className="object-contain rounded-full"
                            />
                        </div>
                        <div>
                            <h3 className="font-bold text-2xl text-gray-900 dark:text-white">NASA</h3>
                            <p className="text-blue-600 dark:text-blue-400 font-semibold text-lg">Software Engineer</p>
                            <p className="text-gray-600 dark:text-gray-400">Feb 2020 - Mar 2022</p>
                        </div>
                    </div>

                    {/* NASA Projects */}
                    <div className="space-y-6">
                        <div className="bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.01]">
                            <div className="flex gap-6 items-center">
                                <div className="relative w-20 h-20 flex-shrink-0">
                                    <Image
                                        src="/flightops.jpg"
                                        alt="Flight Operations Logo"
                                        fill
                                        className="object-contain rounded-lg"
                                    />
                                </div>
                                <div className="flex-grow">
                                    <h4 className="font-bold text-xl mb-3 text-gray-900 dark:text-white">Mission Control OS Upgrade</h4>
                                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                                        Led the critical upgrade of Mission Control Center&apos;s operating system from RHEL 6 to 8, 
                                        significantly enhancing security posture and system performance for space missions.
                                    </p>
                                    <div className="flex flex-wrap gap-2 mt-4">
                                        <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm font-medium">Linux</span>
                                        <span className="px-3 py-1 bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 rounded-full text-sm font-medium">RHEL</span>
                                        <span className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full text-sm font-medium">Mission Critical</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </ScrollAnimation>

            {/* Capital One Experience */}
            <ScrollAnimation animation="fadeInRight" delay={600}>
                <div className="bg-gradient-to-br from-purple-50 to-pink-100 dark:from-gray-800 dark:to-gray-700 p-8 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-600 transform hover:scale-[1.02] transition-all duration-300">
                    {/* Capital One Header with Logo */}
                    <div className="flex items-center gap-6 mb-8">
                        <div className="relative w-24 h-24 bg-white rounded-full p-2 shadow-lg">
                            <Image
                                src="/capone.jpg"
                                alt="Capital One logo"
                                fill
                                className="object-contain rounded-full"
                            />
                        </div>
                        <div>
                            <h3 className="font-bold text-2xl text-gray-900 dark:text-white">Capital One</h3>
                            <p className="text-purple-600 dark:text-purple-400 font-semibold text-lg">Senior Associate Software Engineer</p>
                            <p className="text-gray-600 dark:text-gray-400">Mar 2022 - Present</p>
                        </div>
                    </div>

                    {/* Capital One Projects */}
                    <div className="space-y-6">
                        <div className="bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.01]">
                            <div className="flex gap-6 items-center">
                                <div className="relative w-20 h-20 flex-shrink-0">
                                    <Image
                                        src="/golang.png"
                                        alt="API Project screenshot"
                                        fill
                                        className="object-contain rounded-lg"
                                    />
                                </div>
                                <div className="flex-grow">
                                    <h4 className="font-bold text-xl mb-3 text-gray-900 dark:text-white">API Latency Reduction</h4>
                                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                                        Architected and implemented high-performance APIs using Go, achieving a 30% reduction in response latency. 
                                        Deployed microservices on AWS infrastructure using Docker containers and Kubernetes orchestration.
                                    </p>
                                    <div className="flex flex-wrap gap-2 mt-4">
                                        <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm font-medium">Go</span>
                                        <span className="px-3 py-1 bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200 rounded-full text-sm font-medium">AWS</span>
                                        <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 rounded-full text-sm font-medium">Docker</span>
                                        <span className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full text-sm font-medium">Kubernetes</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </ScrollAnimation>

            {/* Personal Projects Section */}
            <div className="mt-16">
                <ScrollAnimation animation="fadeInUp" delay={800}>
                    <h2 className="font-bold mb-8 text-3xl text-center text-gray-900 dark:text-white">Personal Projects</h2>
                </ScrollAnimation>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <ScrollAnimation animation="scaleIn" delay={900}>
                        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]">
                            <div className="text-center mb-4">
                                <div className="text-4xl mb-3">🌐</div>
                                <h3 className="font-bold text-xl text-gray-900 dark:text-white">Portfolio Website</h3>
                            </div>
                            <p className="text-gray-700 dark:text-gray-300 mb-4">
                                Built this responsive portfolio website using Next.js, TypeScript, and Tailwind CSS. 
                                Features dark mode, smooth animations, and modern design principles.
                            </p>
                            <div className="flex flex-wrap gap-2">
                                <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm font-medium">Next.js</span>
                                <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 rounded-full text-sm font-medium">TypeScript</span>
                                <span className="px-3 py-1 bg-cyan-100 dark:bg-cyan-900 text-cyan-800 dark:text-cyan-200 rounded-full text-sm font-medium">Tailwind</span>
                            </div>
                        </div>
                    </ScrollAnimation>

                    <ScrollAnimation animation="scaleIn" delay={1000}>
                        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]">
                            <div className="text-center mb-4">
                                <div className="text-4xl mb-3">🤖</div>
                                <h3 className="font-bold text-xl text-gray-900 dark:text-white">AI Chat Application</h3>
                            </div>
                            <p className="text-gray-700 dark:text-gray-300 mb-4">
                                Developed a real-time chat application with AI integration using OpenAI API, featuring 
                                natural language processing and conversation history.
                            </p>
                            <div className="flex flex-wrap gap-2">
                                <span className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full text-sm font-medium">React</span>
                                <span className="px-3 py-1 bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 rounded-full text-sm font-medium">OpenAI</span>
                                <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm font-medium">WebSockets</span>
                            </div>
                        </div>
                    </ScrollAnimation>

                    <ScrollAnimation animation="scaleIn" delay={1100}>
                        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]">
                            <div className="text-center mb-4">
                                <div className="text-4xl mb-3">🚀</div>
                                <h3 className="font-bold text-xl text-gray-900 dark:text-white">Coming Soon</h3>
                            </div>
                            <p className="text-gray-700 dark:text-gray-300 mb-4">
                                I&apos;m always working on new projects! Check back soon to see what I&apos;m building next. 
                                It might be a cloud-native application, an AI tool, or something completely different.
                            </p>
                            <div className="flex flex-wrap gap-2">
                                <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-full text-sm font-medium">TBD</span>
                            </div>
                        </div>
                    </ScrollAnimation>
                </div>
            </div>

            {/* Call to Action */}
            <ScrollAnimation animation="fadeInUp" delay={1200}>
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8 rounded-2xl text-center">
                    <h2 className="text-3xl font-bold mb-4">Interested in Collaborating?</h2>
                    <p className="text-xl mb-6 opacity-90">
                        I&apos;m always open to discussing new opportunities and exciting projects.
                    </p>
                    <a
                        href="/contact"
                        className="inline-block px-8 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-200 transform hover:scale-105 shadow-lg"
                    >
                        Let&apos;s Talk
                    </a>
                </div>
            </ScrollAnimation>
        </div>
    )
}
