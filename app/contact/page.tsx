'use client'

import { useState, FormEvent } from 'react';
// @ts-expect-error - thin-backend types are not properly exported
import { initThinBackend, createRecord } from 'thin-backend';
import { ThinBackend } from 'thin-backend-react';
import ScrollAnimation from '../../components/ScrollAnimation';

export default function ContactPage() {

    initThinBackend({
        host: 'https://lysandergutierrez-website.thinbackend.app',
    });

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

    async function handleSubmit(e: FormEvent) {
        e.preventDefault();
        setStatus('idle');

        try {
            await createRecord('contactMessages', { name, email, message });
            setName('');
            setEmail('');
            setMessage('');
            setStatus('success');
        } catch (error) {
            console.error('Failed to submit contact message:', error);
            setStatus('error');
        }
    }

    return (
        <ThinBackend requireLogin={false}>
            <div className="max-w-4xl mx-auto py-8">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        Get In Touch
                    </h1>
                    <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full"></div>
                    <p className="text-lg text-gray-600 dark:text-gray-400 mt-6 max-w-2xl mx-auto">
                        I'm always excited to connect with fellow developers, discuss new opportunities, or chat about technology. 
                        Let's start a conversation!
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-12 items-start">
                    {/* Contact Form */}
                    <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700">
                        <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Send Me a Message</h2>
                        
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block mb-2 font-semibold text-gray-700 dark:text-gray-300">Name</label>
                                <input
                                    type="text"
                                    required
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg 
                                         dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 
                                         focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                    placeholder="Your full name"
                                />
                            </div>

                            <div>
                                <label className="block mb-2 font-semibold text-gray-700 dark:text-gray-300">Email</label>
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg 
                                         dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 
                                         focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                    placeholder="your.email@example.com"
                                />
                            </div>

                            <div>
                                <label className="block mb-2 font-semibold text-gray-700 dark:text-gray-300">Message</label>
                                <textarea
                                    rows={6}
                                    required
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg 
                                         dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 
                                         focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
                                    placeholder="Tell me about your project, opportunity, or just say hello..."
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-lg 
                                       font-semibold hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 
                                       focus:ring-blue-500 focus:ring-offset-2 transform hover:scale-[1.02] transition-all duration-200 shadow-lg"
                            >
                                Send Message ✨
                            </button>
                        </form>

                        {/* Status Messages */}
                        {status === 'success' && (
                            <div className="mt-6 p-4 bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-700 rounded-lg">
                                <p className="text-green-700 dark:text-green-300 font-medium">
                                    🎉 Thank you for your message! I'll get back to you soon.
                                </p>
                            </div>
                        )}
                        {status === 'error' && (
                            <div className="mt-6 p-4 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-700 rounded-lg">
                                <p className="text-red-700 dark:text-red-300 font-medium">
                                    ⚠️ Something went wrong. Please try again or reach out via social media.
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Contact Information */}
                    <div className="space-y-8">
                        <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 p-8 rounded-2xl">
                            <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Let's Connect</h2>
                            <div className="space-y-6">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                                        <span className="text-white text-xl">💼</span>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900 dark:text-white">LinkedIn</h3>
                                        <a
                                            href="https://www.linkedin.com/in/lysandergutierrez/"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
                                        >
                                            /in/lysandergutierrez
                                        </a>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center">
                                        <span className="text-white text-xl">🐙</span>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900 dark:text-white">GitHub</h3>
                                        <a
                                            href="https://github.com/leegutierrez7"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
                                        >
                                            @leegutierrez7
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
                            <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Response Time</h3>
                            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                                I typically respond to messages within 24-48 hours. For urgent matters, 
                feel free to reach out on LinkedIn for a faster response.
                            </p>
                        </div>

                        <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
                            <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Open to Discuss</h3>
                            <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                                <li className="flex items-center gap-2">
                                    <span className="text-green-500">✓</span> Job opportunities
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="text-green-500">✓</span> Freelance projects
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="text-green-500">✓</span> Technical consultations
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="text-green-500">✓</span> Mentoring opportunities
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="text-green-500">✓</span> Tech discussions
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </ThinBackend>
    );
}