export default function AboutPage() {
    return (
        <section className="max-w-3xl mx-auto space-y-4">
            <h1 className="text-3xl font-semibold mb-4">About Me</h1>

            <p className="leading-relaxed text-gray-700 dark:text-gray-300">
                I’m a software engineer with a passion for building high-performance web applications and scalable APIs.
                I hold an M.S. in Computer Science from UT Austin and a B.S. in Computer Engineering from Texas A&M.
                I’ve worked at NASA and Capital One, where I improved latency, automated deployments, and contributed
                to mission-critical software systems.
            </p>

            <p className="leading-relaxed text-gray-700 dark:text-gray-300 mt-4">
                Outside of work, I enjoy exploring emerging technologies, contributing to open-source projects,
                and mentoring students in computer science.
            </p>

            <p className="mt-4">
                Interested in more details about my experience?{" "}
                <a
                    href="/Lysander-Gutierrez-Resume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline hover:text-blue-800"
                >
                    Download my résumé
                </a>.
            </p>
        </section>
    )
}
