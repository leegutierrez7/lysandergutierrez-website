import SkillBar from '../../components/SkillBar'
import AnimatedCounter from '../../components/AnimatedCounter'
import ScrollAnimation from '../../components/ScrollAnimation'

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl space-y-8 py-8">
      <ScrollAnimation>
        <div className="mb-12 text-center">
          <h1 className="mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-4xl font-bold text-transparent">
            About Me
          </h1>
          <div className="mx-auto h-1 w-24 rounded-full bg-gradient-to-r from-blue-600 to-purple-600"></div>
        </div>
      </ScrollAnimation>

      <div className="grid items-start gap-12 md:grid-cols-2">
        <div className="space-y-6">
          <ScrollAnimation animation="fadeInLeft" delay={200}>
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-lg dark:border-gray-700 dark:bg-gray-800">
              <h2 className="mb-4 text-2xl font-semibold text-blue-600 dark:text-blue-400">
                Background
              </h2>
              <p className="leading-relaxed text-gray-700 dark:text-gray-300">
                I&apos;m a software engineer with a passion for building
                high-performance web applications and scalable APIs. I hold an
                M.S. in Computer Science from UT Austin and a B.S. in Computer
                Engineering from Texas A&M.
              </p>
            </div>
          </ScrollAnimation>

          <ScrollAnimation animation="fadeInLeft" delay={400}>
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-lg dark:border-gray-700 dark:bg-gray-800">
              <h2 className="mb-4 text-2xl font-semibold text-purple-600 dark:text-purple-400">
                Experience
              </h2>
              <p className="leading-relaxed text-gray-700 dark:text-gray-300">
                I&apos;ve worked at NASA and Capital One, where I improved
                latency, automated deployments, and contributed to
                mission-critical software systems. These experiences taught me
                the importance of reliability, scalability, and clean code.
              </p>
            </div>
          </ScrollAnimation>
        </div>

        <div className="space-y-6">
          <ScrollAnimation animation="fadeInRight" delay={200}>
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-lg dark:border-gray-700 dark:bg-gray-800">
              <h2 className="mb-4 text-2xl font-semibold text-green-600 dark:text-green-400">
                Interests
              </h2>
              <p className="leading-relaxed text-gray-700 dark:text-gray-300">
                Outside of work, I enjoy exploring emerging technologies,
                contributing to open-source projects, and mentoring students in
                computer science. I&apos;m particularly interested in cloud
                architecture, DevOps practices, and modern web development
                frameworks.
              </p>
            </div>
          </ScrollAnimation>

          <ScrollAnimation animation="fadeInRight" delay={400}>
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-lg dark:border-gray-700 dark:bg-gray-800">
              <h2 className="mb-4 text-2xl font-semibold text-orange-600 dark:text-orange-400">
                Let&apos;s Connect
              </h2>
              <p className="mb-4 leading-relaxed text-gray-700 dark:text-gray-300">
                I&apos;m always open to discussing new opportunities,
                interesting projects, or just chatting about technology.
              </p>
              <a
                href="/Lysander-Gutierrez-Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex transform items-center rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white shadow-lg transition-all duration-200 hover:scale-105 hover:bg-blue-700 hover:shadow-xl"
              >
                📄 Download My Résumé
              </a>
            </div>
          </ScrollAnimation>
        </div>
      </div>

      {/* Skills Section */}
      <ScrollAnimation delay={600}>
        <div className="mt-12 rounded-xl bg-gradient-to-r from-blue-50 to-purple-50 p-8 dark:from-gray-800 dark:to-gray-700">
          <h2 className="mb-8 text-center text-3xl font-bold text-gray-900 dark:text-white">
            Technical Skills
          </h2>
          <div className="grid gap-8 md:grid-cols-2">
            <div className="space-y-4">
              <h3 className="mb-4 text-xl font-semibold text-gray-800 dark:text-gray-200">
                Programming Languages
              </h3>
              <SkillBar
                skill="JavaScript/TypeScript"
                percentage={95}
                color="bg-gradient-to-r from-yellow-400 to-yellow-600"
                delay={100}
              />
              <SkillBar
                skill="Python"
                percentage={90}
                color="bg-gradient-to-r from-blue-400 to-blue-600"
                delay={200}
              />
              <SkillBar
                skill="Go"
                percentage={85}
                color="bg-gradient-to-r from-cyan-400 to-cyan-600"
                delay={300}
              />
              <SkillBar
                skill="Java"
                percentage={80}
                color="bg-gradient-to-r from-red-400 to-red-600"
                delay={400}
              />
            </div>
            <div className="space-y-4">
              <h3 className="mb-4 text-xl font-semibold text-gray-800 dark:text-gray-200">
                Technologies & Tools
              </h3>
              <SkillBar
                skill="React/Next.js"
                percentage={95}
                color="bg-gradient-to-r from-blue-400 to-blue-600"
                delay={100}
              />
              <SkillBar
                skill="AWS/Cloud"
                percentage={88}
                color="bg-gradient-to-r from-orange-400 to-orange-600"
                delay={200}
              />
              <SkillBar
                skill="Docker/K8s"
                percentage={85}
                color="bg-gradient-to-r from-blue-500 to-indigo-600"
                delay={300}
              />
              <SkillBar
                skill="PostgreSQL"
                percentage={82}
                color="bg-gradient-to-r from-blue-600 to-purple-600"
                delay={400}
              />
            </div>
          </div>
        </div>
      </ScrollAnimation>

      {/* Stats Section */}
      <ScrollAnimation delay={800}>
        <div className="rounded-xl border border-gray-200 bg-white p-8 shadow-lg dark:border-gray-700 dark:bg-gray-800">
          <h2 className="mb-8 text-center text-3xl font-bold text-gray-900 dark:text-white">
            Experience Overview
          </h2>
          <div className="grid grid-cols-2 gap-8 text-center md:grid-cols-4">
            <div className="space-y-2">
              <div className="text-blue-600 dark:text-blue-400">
                <AnimatedCounter end={4} suffix="+" />
              </div>
              <p className="font-medium text-gray-600 dark:text-gray-400">
                Years Experience
              </p>
            </div>
            <div className="space-y-2">
              <div className="text-green-600 dark:text-green-400">
                <AnimatedCounter end={50} suffix="+" />
              </div>
              <p className="font-medium text-gray-600 dark:text-gray-400">
                Projects Completed
              </p>
            </div>
            <div className="space-y-2">
              <div className="text-purple-600 dark:text-purple-400">
                <AnimatedCounter end={30} suffix="%" />
              </div>
              <p className="font-medium text-gray-600 dark:text-gray-400">
                Performance Improvements
              </p>
            </div>
            <div className="space-y-2">
              <div className="text-orange-600 dark:text-orange-400">
                <AnimatedCounter end={1} />
              </div>
              <p className="font-medium text-gray-600 dark:text-gray-400">
                Fortune 500 Company (Capital One)
              </p>
            </div>
          </div>
        </div>
      </ScrollAnimation>

      {/* Education Section */}
      <ScrollAnimation delay={1000}>
        <div className="mt-12 rounded-xl bg-gradient-to-r from-blue-50 to-purple-50 p-8 dark:from-gray-800 dark:to-gray-700">
          <h2 className="mb-8 text-center text-3xl font-bold text-gray-900 dark:text-white">
            Education
          </h2>
          <div className="grid gap-8 md:grid-cols-2">
            <div className="transform rounded-lg bg-white p-6 text-center shadow-md transition-all duration-300 hover:scale-105 dark:bg-gray-800">
              <h3 className="mb-2 text-xl font-semibold text-orange-600">
                🎓 University of Texas at Austin
              </h3>
              <p className="font-medium text-gray-700 dark:text-gray-300">
                Master of Science
              </p>
              <p className="text-gray-600 dark:text-gray-400">
                Computer Science
              </p>
            </div>
            <div className="transform rounded-lg bg-white p-6 text-center shadow-md transition-all duration-300 hover:scale-105 dark:bg-gray-800">
              <h3 className="mb-2 text-xl font-semibold text-red-600">
                🎓 Texas A&M University
              </h3>
              <p className="font-medium text-gray-700 dark:text-gray-300">
                Bachelor of Science
              </p>
              <p className="text-gray-600 dark:text-gray-400">
                Computer Engineering
              </p>
            </div>
          </div>
        </div>
      </ScrollAnimation>
    </div>
  )
}
