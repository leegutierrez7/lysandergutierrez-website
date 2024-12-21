'use client'

import { useState, FormEvent } from 'react';
// @ts-expect-error - thin-backend types are not properly exported
import { initThinBackend, createRecord } from 'thin-backend';
import { ThinBackend } from 'thin-backend-react';



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
        // 4A. Wrap everything in <ThinBackend> so the hooks & functions work
        <ThinBackend requireLogin={false}>
            <section>
                <h1 className="text-3xl font-semibold mb-4">Contact</h1>
                <p className="mb-4">
                    Interested in working together or just want to say hello? Feel free to connect with me!
                </p>

                {/* 4B. Our custom form that uses React state & handleSubmit */}
                <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-sm">
                    <div>
                        <label className="block mb-1 font-medium dark:text-gray-300">Name</label>
                        <input
                            type="text"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="border border-gray-300 dark:border-gray-600 p-2 w-full rounded 
                                 dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 
                                 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block mb-1 font-medium dark:text-gray-300">Email</label>
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="border border-gray-300 dark:border-gray-600 p-2 w-full rounded 
                                 dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 
                                 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block mb-1 font-medium dark:text-gray-300">Message</label>
                        <textarea
                            rows={5}
                            required
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            className="border border-gray-300 dark:border-gray-600 p-2 w-full rounded 
                                 dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 
                                 focus:ring-blue-500 resize-none"
                        ></textarea>
                    </div>

                    <button
                        type="submit"
                        className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700 
                               focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                        Send
                    </button>
                </form>

                {/* 4C. Show success/error messages */}
                {status === 'success' && (
                    <p className="text-green-600 dark:text-green-400 mt-2">Thank you for your message!</p>
                )}
                {status === 'error' && (
                    <p className="text-red-600 dark:text-red-400 mt-2">
                        Something went wrong. Please try again.
                    </p>
                )}

                <p className="mt-4 dark:text-gray-300">
                    Or find me on{' '}
                    <a
                        href="https://www.linkedin.com/in/lysandergutierrez/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 underline hover:text-blue-400 transition-colors"
                    >
                        LinkedIn
                    </a>{' '}
                    or{' '}
                    <a
                        href="https://github.com/leegutierrez7"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 underline hover:text-blue-400 transition-colors"
                    >
                        GitHub
                    </a>.
                </p>
            </section>
        </ThinBackend>
    );
}