import ScrollAnimation from '../../components/ScrollAnimation'
import { Github, Linkedin } from 'lucide-react'

export const metadata = {
    title: 'Contact | Lysander Gutierrez',
    description: 'Get in touch with me for collaborations, opportunities, or just to say hello.',
}

export default function ContactPage() {
    return (
        <div className="min-h-screen py-16">
            <ScrollAnimation animation="fadeInUp">
                <div className="text-center max-w-2xl mx-auto">
                    <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Let's Connect</h1>
                    <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">Thanks for your interest — I no longer accept messages via this site. Connect with me on GitHub or LinkedIn instead.</p>

                    <div className="flex items-center justify-center gap-6">
                        <a
                            href="https://github.com/leegutierrez7"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-3 px-5 py-3 rounded-lg bg-gray-900 text-white hover:bg-gray-800 transition-colors"
                        >
                            <Github className="w-5 h-5" />
                            View GitHub
                        </a>

                        <a
                            href="https://linkedin.com/in/lysandergutierrez"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-3 px-5 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                        >
                            <Linkedin className="w-5 h-5" />
                            Connect on LinkedIn
                        </a>
                    </div>
                </div>
            </ScrollAnimation>
        </div>
    )
}
