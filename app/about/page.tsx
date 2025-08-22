import SkillBar from '../../components/SkillBar'
import AnimatedCounter from '../../components/AnimatedCounter'
import ScrollAnimation from '../../components/ScrollAnimation'

export default function AboutPage() {
    return (
        <div className="max-w-4xl mx-auto space-y-8 py-8">
            <ScrollAnimation>
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        About Me
                    </h1>
                    <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full"></div>
                </div>
            </ScrollAnimation>

            <div className="grid md:grid-cols-2 gap-12 items-start">
                <div className="space-y-6">
                    <ScrollAnimation animation="fadeInLeft" delay={200}>
                        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
                            <h2 className="text-2xl font-semibold mb-4 text-blue-600 dark:text-blue-400">Background</h2>
                            <p className="leading-relaxed text-gray-700 dark:text-gray-300">
                                I&apos;m a software engineer with a passion for building high-performance web applications and scalable APIs.
                                I hold an M.S. in Computer Science from UT Austin and a B.S. in Computer Engineering from Texas A&M.
                            </p>
                        </div>
                    </ScrollAnimation>

                    <ScrollAnimation animation="fadeInLeft" delay={400}>
                        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
                            <h2 className="text-2xl font-semibold mb-4 text-purple-600 dark:text-purple-400">Experience</h2>
                            <p className="leading-relaxed text-gray-700 dark:text-gray-300">
                                I&apos;ve worked at NASA and Capital One, where I improved latency, automated deployments, and contributed
                                to mission-critical software systems. These experiences taught me the importance of reliability,
                                scalability, and clean code.
                            </p>
                        </div>
                    </ScrollAnimation>
                </div>

                <div className="space-y-6">
                    <ScrollAnimation animation="fadeInRight" delay={200}>
                        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
                            <h2 className="text-2xl font-semibold mb-4 text-green-600 dark:text-green-400">Interests</h2>
                            <p className="leading-relaxed text-gray-700 dark:text-gray-300">
                                Outside of work, I enjoy exploring emerging technologies, contributing to open-source projects,
                                and mentoring students in computer science. I&apos;m particularly interested in cloud architecture,
                                DevOps practices, and modern web development frameworks.
                            </p>
                        </div>
                    </ScrollAnimation>

                    <ScrollAnimation animation="fadeInRight" delay={400}>
                        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
                            <h2 className="text-2xl font-semibold mb-4 text-orange-600 dark:text-orange-400">Let&apos;s Connect</h2>
                            <p className="leading-relaxed text-gray-700 dark:text-gray-300 mb-4">
                                I&apos;m always open to discussing new opportunities, interesting projects, or just chatting about technology.
                            </p>
                            <a
                                href="/Lysander-Gutierrez-Resume.pdf"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
                            >
                                📄 Download My Résumé
                            </a>
                        </div>
                    </ScrollAnimation>
                </div>
            </div>

            {/* Skills Section */}
            <ScrollAnimation delay={600}>
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 p-8 rounded-xl mt-12">
                    <h2 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">Technical Skills</h2>
                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="space-y-4">
                            <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Programming Languages</h3>
                            <SkillBar skill="JavaScript/TypeScript" percentage={95} color="bg-gradient-to-r from-yellow-400 to-yellow-600" delay={100} />
                            <SkillBar skill="Python" percentage={90} color="bg-gradient-to-r from-blue-400 to-blue-600" delay={200} />
                            <SkillBar skill="Go" percentage={85} color="bg-gradient-to-r from-cyan-400 to-cyan-600" delay={300} />
                            <SkillBar skill="Java" percentage={80} color="bg-gradient-to-r from-red-400 to-red-600" delay={400} />
                        </div>
                        <div className="space-y-4">
                            <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Technologies & Tools</h3>
                            <SkillBar skill="React/Next.js" percentage={95} color="bg-gradient-to-r from-blue-400 to-blue-600" delay={100} />
                            <SkillBar skill="AWS/Cloud" percentage={88} color="bg-gradient-to-r from-orange-400 to-orange-600" delay={200} />
                            <SkillBar skill="Docker/K8s" percentage={85} color="bg-gradient-to-r from-blue-500 to-indigo-600" delay={300} />
                            <SkillBar skill="PostgreSQL" percentage={82} color="bg-gradient-to-r from-blue-600 to-purple-600" delay={400} />
                        </div>
                    </div>
                </div>
            </ScrollAnimation>

            {/* Stats Section */}
            <ScrollAnimation delay={800}>
                <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
                    <h2 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">Experience Overview</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        <div className="space-y-2">
                            <div className="text-blue-600 dark:text-blue-400">
                                <AnimatedCounter end={4} suffix="+" />
                            </div>
                            <p className="text-gray-600 dark:text-gray-400 font-medium">Years Experience</p>
                        </div>
                        <div className="space-y-2">
                            <div className="text-green-600 dark:text-green-400">
                                <AnimatedCounter end={50} suffix="+" />
                            </div>
                            <p className="text-gray-600 dark:text-gray-400 font-medium">Projects Completed</p>
                        </div>
                        <div className="space-y-2">
                            <div className="text-purple-600 dark:text-purple-400">
                                <AnimatedCounter end={30} suffix="%" />
                            </div>
                            <p className="text-gray-600 dark:text-gray-400 font-medium">Performance Improvements</p>
                        </div>
                        <div className="space-y-2">
                            <div className="text-orange-600 dark:text-orange-400">
                                <AnimatedCounter end={2} />
                            </div>
                            <p className="text-gray-600 dark:text-gray-400 font-medium">Fortune 500 Companies</p>
                        </div>
                    </div>
                </div>
            </ScrollAnimation>

            {/* Education Section */}
            <ScrollAnimation delay={1000}>
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 p-8 rounded-xl mt-12">
                    <h2 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">Education</h2>
                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md transform hover:scale-105 transition-all duration-300">
                            <h3 className="text-xl font-semibold text-orange-600 mb-2">🎓 University of Texas at Austin</h3>
                            <p className="text-gray-700 dark:text-gray-300 font-medium">Master of Science</p>
                            <p className="text-gray-600 dark:text-gray-400">Computer Science</p>
                        </div>
                        <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md transform hover:scale-105 transition-all duration-300">
                            <h3 className="text-xl font-semibold text-red-600 mb-2">🎓 Texas A&M University</h3>
                            <p className="text-gray-700 dark:text-gray-300 font-medium">Bachelor of Science</p>
                            <p className="text-gray-600 dark:text-gray-400">Computer Engineering</p>
                        </div>
                    </div>
                </div>
            </ScrollAnimation>
        </div>
    )
}
