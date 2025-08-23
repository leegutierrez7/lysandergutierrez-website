import React from 'react'
import ScrollAnimation from '../components/ScrollAnimation'
import Image from 'next/image'

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="flex flex-col items-center bg-gradient-to-br from-blue-50 via-white to-purple-50 py-20 text-center dark:from-gray-900 dark:via-gray-800 dark:to-purple-900">
        <ScrollAnimation animation="scaleIn">
          <div className="group relative mb-8 h-48 w-48">
            <Image
              src="/headshot.jpg"
              alt="Lysander Gutierrez"
              fill
              className="rounded-full object-cover shadow-xl ring-4 ring-blue-100 transition-transform duration-300 group-hover:scale-105 dark:ring-blue-900"
            />
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 opacity-0 transition-opacity duration-300 group-hover:opacity-20"></div>
          </div>
        </ScrollAnimation>

        <ScrollAnimation animation="fadeInUp" delay={200}>
          <h1 className="gradient-shadow mb-4 text-6xl font-bold text-blue-600 dark:text-blue-400">
            Lysander Gutierrez
          </h1>
        </ScrollAnimation>

        <ScrollAnimation animation="fadeInUp" delay={400}>
          <p className="mb-8 text-2xl font-light text-gray-700 dark:text-gray-300">
            Full-Stack Software Engineer | Cloud Enthusiast
          </p>
        </ScrollAnimation>

        <ScrollAnimation animation="fadeInUp" delay={600}>
          <p className="mb-12 max-w-2xl text-lg leading-relaxed text-gray-600 dark:text-gray-400">
            Welcome to my personal website! I&apos;m passionate about building
            scalable applications, exploring cutting-edge technologies, and
            solving complex problems. Explore my background, view my projects,
            or get in touch to collaborate.
          </p>
        </ScrollAnimation>

        {/* CTA Buttons */}
        <ScrollAnimation animation="fadeInUp" delay={800}>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="/projects"
              className="transform rounded-lg bg-blue-600 px-8 py-3 font-semibold text-white shadow-lg transition-all duration-200 hover:scale-105 hover:bg-blue-700 hover:shadow-xl"
            >
              View My Work
            </a>
            <a
              href="/contact"
              className="transform rounded-lg border-2 border-blue-600 px-8 py-3 font-semibold text-blue-600 transition-all duration-200 hover:scale-105 hover:bg-blue-600 hover:text-white dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-400 dark:hover:text-gray-900"
            >
              Get In Touch
            </a>
          </div>
        </ScrollAnimation>
      </section>

      {/* Quick Skills Section */}
      <section className="bg-white py-16 dark:bg-gray-900">
        <div className="mx-auto max-w-4xl px-4">
          <ScrollAnimation>
            <h2 className="mb-12 text-center text-3xl font-bold text-gray-900 dark:text-white">
              Technologies I Work With
            </h2>
          </ScrollAnimation>
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {[
              { name: 'React/Next.js', icon: '⚛️' },
              { name: 'Node.js', icon: '🟢' },
              { name: 'TypeScript', icon: '🔷' },
              { name: 'Python', icon: '🐍' },
              { name: 'AWS/Cloud', icon: '☁️' },
              { name: 'Docker', icon: '🐳' },
              { name: 'Go', icon: '🔵' },
              { name: 'PostgreSQL', icon: '🐘' },
            ].map((tech, index) => (
              <ScrollAnimation
                key={tech.name}
                animation="scaleIn"
                delay={index * 100}
              >
                <div className="transform rounded-lg bg-gray-50 p-4 text-center transition-all duration-200 hover:scale-105 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700">
                  <div className="mb-2 text-3xl">{tech.icon}</div>
                  <div className="font-medium text-gray-700 dark:text-gray-300">
                    {tech.name}
                  </div>
                </div>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 py-16 text-white">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <ScrollAnimation animation="fadeInUp">
            <h2 className="mb-4 text-3xl font-bold">
              Ready to Build Something Amazing?
            </h2>
            <p className="mb-8 text-xl opacity-90">
              Let&apos;s collaborate on your next project and bring your ideas
              to life.
            </p>
            <a
              href="/contact"
              className="inline-block transform rounded-lg bg-white px-8 py-3 font-semibold text-blue-600 shadow-lg transition-all duration-200 hover:scale-105 hover:bg-gray-100"
            >
              Start a Conversation
            </a>
          </ScrollAnimation>
        </div>
      </section>
    </div>
  )
}
