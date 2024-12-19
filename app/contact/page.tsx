export default function ContactPage() {
    return (
        <section>
            <h1 className="text-3xl font-semibold mb-4">Contact</h1>
            <p className="mb-4">
                Interested in working together or just want to say hello? Feel free to connect with me!
            </p>

            <form
                action="https://formspree.io/f/YOUR_FORM_ID"
                method="POST"
                className="flex flex-col gap-4 max-w-sm"
            >
                <div>
                    <label className="block mb-1 font-medium dark:text-gray-300">Name</label>
                    <input
                        type="text"
                        name="name"
                        required
                        className="border border-gray-300 dark:border-gray-600 p-2 w-full rounded 
                         dark:bg-gray-800 dark:text-white 
                         focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                </div>

                <div>
                    <label className="block mb-1 font-medium dark:text-gray-300">Email</label>
                    <input
                        type="email"
                        name="email"
                        required
                        className="border border-gray-300 dark:border-gray-600 p-2 w-full rounded 
                         dark:bg-gray-800 dark:text-white 
                         focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                </div>

                <div>
                    <label className="block mb-1 font-medium dark:text-gray-300">Message</label>
                    <textarea
                        name="message"
                        rows={5}
                        required
                        className="border border-gray-300 dark:border-gray-600 p-2 w-full rounded 
                         dark:bg-gray-800 dark:text-white 
                         focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    ></textarea>
                </div>

                <button
                    type="submit"
                    className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition-colors 
                       focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                    Send
                </button>
            </form>

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
    )
}
