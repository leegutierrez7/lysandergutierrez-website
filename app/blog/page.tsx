import { getAllPosts, BlogPost } from '../../lib/blog'
import ScrollAnimation from '../../components/ScrollAnimation'
import Link from 'next/link'
import { Clock, Calendar, Tag } from 'lucide-react'
import { isBlogEnabled } from '../../lib/featureFlags'
import { notFound } from 'next/navigation'

export const metadata = {
  title: 'Blog | Lysander Gutierrez',
  description:
    'Articles about software development, web technologies, and programming insights.',
}

function BlogCard({ post }: { post: BlogPost }) {
  return (
    <ScrollAnimation animation="fadeInUp">
      <article className="transform overflow-hidden rounded-lg bg-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl dark:bg-gray-800">
        <div className="p-6">
          <div className="mb-3 flex items-center text-sm text-gray-500 dark:text-gray-400">
            <Calendar className="mr-1 h-4 w-4" />
            <time dateTime={post.date}>
              {new Date(post.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
            <span className="mx-2">•</span>
            <Clock className="mr-1 h-4 w-4" />
            <span>{post.readingTime} min read</span>
          </div>

          <h2 className="mb-3 text-xl font-bold text-gray-900 transition-colors hover:text-blue-600 dark:text-white dark:hover:text-blue-400">
            <Link href={`/blog/${post.slug}`}>{post.title}</Link>
          </h2>

          <p className="mb-4 line-clamp-3 text-gray-600 dark:text-gray-300">
            {post.description}
          </p>

          <div className="mb-4 flex flex-wrap gap-2">
            {post.tags.map(tag => (
              <span
                key={tag}
                className="inline-flex items-center rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-200"
              >
                <Tag className="mr-1 h-3 w-3" />
                {tag}
              </span>
            ))}
          </div>

          <Link
            href={`/blog/${post.slug}`}
            className="inline-flex items-center font-medium text-blue-600 transition-colors hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-200"
          >
            Read more →
          </Link>
        </div>
      </article>
    </ScrollAnimation>
  )
}

export default function BlogPage() {
  if (!isBlogEnabled()) {
    // Return 404 if blog disabled
    notFound()
  }
  const posts = getAllPosts()

  return (
    <div className="min-h-screen py-8">
      <ScrollAnimation animation="fadeInUp">
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white">
            Blog
          </h1>
          <p className="mx-auto max-w-2xl text-xl text-gray-600 dark:text-gray-300">
            Thoughts on software development, web technologies, and the
            ever-evolving tech landscape.
          </p>
        </div>
      </ScrollAnimation>

      {posts.length > 0 ? (
        <div className="mx-auto grid max-w-4xl gap-8 md:grid-cols-2 lg:grid-cols-1">
          {posts.map((post, index) => (
            <div key={post.slug} style={{ animationDelay: `${index * 100}ms` }}>
              <BlogCard post={post} />
            </div>
          ))}
        </div>
      ) : (
        <ScrollAnimation animation="fadeInUp">
          <div className="py-16 text-center">
            <p className="text-lg text-gray-500 dark:text-gray-400">
              No blog posts found. Check back soon for updates!
            </p>
          </div>
        </ScrollAnimation>
      )}
    </div>
  )
}
