import ScrollAnimation from '../components/ScrollAnimation'
import Image from 'next/image'

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="flex flex-col items-center text-center py-20 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900">
        <ScrollAnimation animation="scaleIn">
          <div className="relative w-48 h-48 mb-8 group">
            <Image
              src="/headshot.jpg"
              alt="Lysander Gutierrez"
              fill
              className="rounded-full shadow-xl ring-4 ring-blue-100 dark:ring-blue-900 transition-transform duration-300 group-hover:scale-105 object-cover"
            />
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
          </div>
        </ScrollAnimation>

        <ScrollAnimation animation="fadeInUp" delay={200}>
          <h1 className="text-6xl font-bold mb-4 text-gray-900 dark:text-white bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Lysander Gutierrez
          </h1>
        </ScrollAnimation>

        <ScrollAnimation animation="fadeInUp" delay={400}>
          <p className="text-2xl text-gray-700 dark:text-gray-300 mb-8 font-light">
            Full-Stack Software Engineer | Cloud Enthusiast
          </p>
        </ScrollAnimation>

        <ScrollAnimation animation="fadeInUp" delay={600}>
          <p className="max-w-2xl text-lg text-gray-600 dark:text-gray-400 mb-12 leading-relaxed">
            Welcome to my personal website! I&apos;m passionate about building scalable applications,
            exploring cutting-edge technologies, and solving complex problems. Explore my background,
            view my projects, or get in touch to collaborate.
          </p>
        </ScrollAnimation>

        {/* CTA Buttons */}
        <ScrollAnimation animation="fadeInUp" delay={800}>
          <div className="flex gap-4 flex-wrap justify-center">
            <a
              href="/projects"
              className="px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              View My Work
            </a>
            <a
              href="/contact"
              className="px-8 py-3 border-2 border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400 rounded-lg font-semibold hover:bg-blue-600 hover:text-white dark:hover:bg-blue-400 dark:hover:text-gray-900 transition-all duration-200 transform hover:scale-105"
            >
              Get In Touch
            </a>
          </div>
        </ScrollAnimation>
      </section>

      {/* Quick Skills Section */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-4">
          <ScrollAnimation>
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
              Technologies I Work With
            </h2>
          </ScrollAnimation>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: 'React/Next.js', icon: '⚛️' },
              { name: 'Node.js', icon: '🟢' },
              { name: 'TypeScript', icon: '🔷' },
              { name: 'Python', icon: '🐍' },
              { name: 'AWS/Cloud', icon: '☁️' },
              { name: 'Docker', icon: '🐳' },
              { name: 'Go', icon: '🔵' },
              { name: 'PostgreSQL', icon: '🐘' }
            ].map((tech, index) => (
              <ScrollAnimation key={tech.name} animation="scaleIn" delay={index * 100}>
                <div className="text-center p-4 rounded-lg bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200 transform hover:scale-105">
                  <div className="text-3xl mb-2">{tech.icon}</div>
                  <div className="font-medium text-gray-700 dark:text-gray-300">{tech.name}</div>
                </div>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <ScrollAnimation animation="fadeInUp">
            <h2 className="text-3xl font-bold mb-4">Ready to Build Something Amazing?</h2>
            <p className="text-xl mb-8 opacity-90">
              Let&apos;s collaborate on your next project and bring your ideas to life.
            </p>
            <a
              href="/contact"
              className="inline-block px-8 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-200 transform hover:scale-105 shadow-lg"
            >
              Start a Conversation
            </a>
          </ScrollAnimation>
        </div>
      </section>
    </div>
  )
}