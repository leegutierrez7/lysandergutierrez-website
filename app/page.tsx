export default function HomePage() {
  return (
    <section className="flex flex-col items-center text-center py-20 bg-gradient-to-b from-white to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="relative w-40 h-40 mb-6">
        <img
          src="/headshot.jpg"
          alt="Lysander Gutierrez"
          className="rounded-full"
        />
      </div>

      <h1 className="text-5xl font-bold mb-4 text-gray-900 dark:text-white">Lysander Gutierrez</h1>
      <p className="text-xl text-gray-700 dark:text-gray-300 mb-6">Full-Stack Software Engineer | Cloud Enthusiast</p>
      <p className="max-w-xl text-gray-600 dark:text-gray-400">
        Welcome to my personal website! Explore my background, view my projects, or get in touch.
      </p>
    </section>
  )
}