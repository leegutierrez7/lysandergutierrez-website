import Link from 'next/link'
import ScrollAnimation from '../components/ScrollAnimation'
import { Home, ArrowLeft, Search } from 'lucide-react'

export default function NotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center py-16">
            <div className="text-center max-w-2xl mx-auto px-4">
                <ScrollAnimation animation="bounce">
                    <div className="text-8xl font-bold text-blue-600 dark:text-blue-400 mb-8">
                        404
                    </div>
                </ScrollAnimation>

                <ScrollAnimation animation="fadeInUp" delay={200}>
                    <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                        Page Not Found
                    </h1>
                </ScrollAnimation>

                <ScrollAnimation animation="fadeInUp" delay={400}>
                    <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                        Oops! The page you're looking for seems to have wandered off into the digital void.
                    </p>
                </ScrollAnimation>

                <ScrollAnimation animation="fadeInUp" delay={600}>
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 mb-8">
                        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                            What can you do?
                        </h2>
                        <ul className="space-y-2 text-gray-600 dark:text-gray-300 text-left">
                            <li className="flex items-center">
                                <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                                Check the URL for typos
                            </li>
                            <li className="flex items-center">
                                <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                                Use the navigation menu above
                            </li>
                            <li className="flex items-center">
                                <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                                Try the command palette (⌘K)
                            </li>
                            <li className="flex items-center">
                                <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                                Visit one of the popular pages below
                            </li>
                        </ul>
                    </div>
                </ScrollAnimation>

                <ScrollAnimation animation="fadeInUp" delay={800}>
                    <div className="flex flex-wrap gap-4 justify-center mb-8">
                        <Link
                            href="/"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-all duration-200 transform hover:scale-105 shadow-lg"
                        >
                            <Home className="w-4 h-4" />
                            Go Home
                        </Link>

                        <Link
                            href="/projects"
                            className="inline-flex items-center gap-2 px-6 py-3 border border-blue-600 text-blue-600 dark:text-blue-400 rounded-lg font-semibold hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-200"
                        >
                            View Projects
                        </Link>

                        <Link
                            href="/blog"
                            className="inline-flex items-center gap-2 px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-semibold hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-200"
                        >
                            Read Blog
                        </Link>
                    </div>
                </ScrollAnimation>

                <ScrollAnimation animation="fadeInUp" delay={1000}>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                        <p>
                            If you think this is an error, please{' '}
                            <Link href="/contact" className="text-blue-600 dark:text-blue-400 hover:underline">
                                let me know
                            </Link>
                            .
                        </p>
                    </div>
                </ScrollAnimation>

                {/* Easter egg */}
                <ScrollAnimation animation="fadeInUp" delay={1200}>
                    <div className="mt-16 text-xs text-gray-400 dark:text-gray-500">
                        <p>🎭 Fun fact: 404 was named after room 404 at CERN where the original web server was located.</p>
                    </div>
                </ScrollAnimation>
            </div>
        </div>
    )
}
