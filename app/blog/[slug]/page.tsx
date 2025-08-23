import { getPostBySlug, getPostSlugs } from '../../../lib/blog'
import { notFound } from 'next/navigation'
import { isBlogEnabled } from '../../../lib/featureFlags'
import { MDXRemote } from 'next-mdx-remote/rsc'
import ScrollAnimation from '../../../components/ScrollAnimation'
import Link from 'next/link'
import { ArrowLeft, Calendar, Clock, Tag, User } from 'lucide-react'

interface PageProps {
  // Using `any` here to match Next's generated types during build and
  // avoid a mismatch between the inferred params type and the local one.
  // This is a minimal, temporary change to unblock the build; we can
  // make a stricter type later.
  params: any
}

export function generateStaticParams() {
  if (!isBlogEnabled()) return []
  const slugs = getPostSlugs()
  return slugs.map(slug => ({
    slug: slug,
  }))
}

export function generateMetadata({ params }: PageProps) {
  if (!isBlogEnabled()) {
    return { title: 'Not Found' }
  }
  const post = getPostBySlug(params.slug)

  if (!post) {
    return {
      title: 'Post Not Found',
    }
  }

  return {
    title: `${post.title} | Lysander Gutierrez`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
      tags: post.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
    },
  }
}

const components = {
  h1: (props: any) => (
    <h1
      className="mb-4 mt-8 text-3xl font-bold text-gray-900 dark:text-white"
      {...props}
    />
  ),
  h2: (props: any) => (
    <h2
      className="mb-3 mt-6 text-2xl font-semibold text-gray-900 dark:text-white"
      {...props}
    />
  ),
  h3: (props: any) => (
    <h3
      className="mb-2 mt-4 text-xl font-semibold text-gray-900 dark:text-white"
      {...props}
    />
  ),
  p: (props: any) => (
    <p
      className="mb-4 leading-relaxed text-gray-700 dark:text-gray-300"
      {...props}
    />
  ),
  code: (props: any) => (
    <code
      className="rounded bg-gray-100 px-1 py-0.5 font-mono text-sm dark:bg-gray-800"
      {...props}
    />
  ),
  pre: (props: any) => (
    <pre
      className="mb-4 overflow-x-auto rounded-lg bg-gray-100 p-4 dark:bg-gray-800"
      {...props}
    />
  ),
  ul: (props: any) => (
    <ul
      className="mb-4 list-inside list-disc space-y-1 text-gray-700 dark:text-gray-300"
      {...props}
    />
  ),
  ol: (props: any) => (
    <ol
      className="mb-4 list-inside list-decimal space-y-1 text-gray-700 dark:text-gray-300"
      {...props}
    />
  ),
  blockquote: (props: any) => (
    <blockquote
      className="mb-4 border-l-4 border-blue-500 py-2 pl-4 italic text-gray-700 dark:text-gray-300"
      {...props}
    />
  ),
  a: (props: any) => (
    <a
      className="text-blue-600 hover:underline dark:text-blue-400"
      {...props}
    />
  ),
}

export default function BlogPost({ params }: PageProps) {
  if (!isBlogEnabled()) {
    notFound()
  }
  const post = getPostBySlug(params.slug)

  if (!post) {
    notFound()
  }

  return (
    <div className="min-h-screen py-8">
      <ScrollAnimation animation="fadeInUp">
        <div className="mb-8">
          <Link
            href="/blog"
            className="mb-6 inline-flex items-center text-blue-600 transition-colors hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-200"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Blog
          </Link>
        </div>
      </ScrollAnimation>

      <article className="mx-auto max-w-4xl">
        <ScrollAnimation animation="fadeInUp">
          <header className="mb-8">
            <h1 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white md:text-5xl">
              {post.title}
            </h1>

            <p className="mb-6 text-xl text-gray-600 dark:text-gray-300">
              {post.description}
            </p>

            <div className="mb-6 flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
              <div className="flex items-center">
                <User className="mr-1 h-4 w-4" />
                <span>{post.author}</span>
              </div>
              <div className="flex items-center">
                <Calendar className="mr-1 h-4 w-4" />
                <time dateTime={post.date}>
                  {new Date(post.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </time>
              </div>
              <div className="flex items-center">
                <Clock className="mr-1 h-4 w-4" />
                <span>{post.readingTime} min read</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {post.tags.map(tag => (
                <span
                  key={tag}
                  className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                >
                  <Tag className="mr-1 h-3 w-3" />
                  {tag}
                </span>
              ))}
            </div>
          </header>
        </ScrollAnimation>

        <ScrollAnimation animation="fadeInUp" delay={200}>
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <MDXRemote source={post.content} components={components} />
          </div>
        </ScrollAnimation>

        <ScrollAnimation animation="fadeInUp" delay={400}>
          <footer className="mt-12 border-t border-gray-200 pt-8 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <Link
                href="/blog"
                className="inline-flex items-center text-blue-600 transition-colors hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-200"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Blog
              </Link>
              <Link
                href="/contact"
                className="rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
              >
                Discuss This Post
              </Link>
            </div>
          </footer>
        </ScrollAnimation>
      </article>
    </div>
  )
}
