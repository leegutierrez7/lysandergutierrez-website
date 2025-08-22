import { getPostBySlug, getPostSlugs } from '../../../lib/blog'
import { notFound } from 'next/navigation'
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
    const slugs = getPostSlugs()
    return slugs.map((slug) => ({
        slug: slug,
    }))
}

export function generateMetadata({ params }: PageProps) {
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
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mt-8 mb-4" {...props} />
    ),
    h2: (props: any) => (
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-6 mb-3" {...props} />
    ),
    h3: (props: any) => (
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-4 mb-2" {...props} />
    ),
    p: (props: any) => (
        <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed" {...props} />
    ),
    code: (props: any) => (
        <code className="bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded text-sm font-mono" {...props} />
    ),
    pre: (props: any) => (
        <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto mb-4" {...props} />
    ),
    ul: (props: any) => (
        <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 mb-4 space-y-1" {...props} />
    ),
    ol: (props: any) => (
        <ol className="list-decimal list-inside text-gray-700 dark:text-gray-300 mb-4 space-y-1" {...props} />
    ),
    blockquote: (props: any) => (
        <blockquote className="border-l-4 border-blue-500 pl-4 py-2 mb-4 italic text-gray-700 dark:text-gray-300" {...props} />
    ),
    a: (props: any) => (
        <a className="text-blue-600 dark:text-blue-400 hover:underline" {...props} />
    ),
}

export default function BlogPost({ params }: PageProps) {
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
                        className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200 mb-6 transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Blog
                    </Link>
                </div>
            </ScrollAnimation>

            <article className="max-w-4xl mx-auto">
                <ScrollAnimation animation="fadeInUp">
                    <header className="mb-8">
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                            {post.title}
                        </h1>

                        <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">
                            {post.description}
                        </p>

                        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-6">
                            <div className="flex items-center">
                                <User className="w-4 h-4 mr-1" />
                                <span>{post.author}</span>
                            </div>
                            <div className="flex items-center">
                                <Calendar className="w-4 h-4 mr-1" />
                                <time dateTime={post.date}>
                                    {new Date(post.date).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    })}
                                </time>
                            </div>
                            <div className="flex items-center">
                                <Clock className="w-4 h-4 mr-1" />
                                <span>{post.readingTime} min read</span>
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-2">
                            {post.tags.map((tag) => (
                                <span
                                    key={tag}
                                    className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                                >
                                    <Tag className="w-3 h-3 mr-1" />
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
                    <footer className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
                        <div className="flex justify-between items-center">
                            <Link
                                href="/blog"
                                className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200 transition-colors"
                            >
                                <ArrowLeft className="w-4 h-4 mr-2" />
                                Back to Blog
                            </Link>
                            <Link
                                href="/contact"
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
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
