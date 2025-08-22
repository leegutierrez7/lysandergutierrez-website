import { getAllPosts, BlogPost } from '../../lib/blog'
import ScrollAnimation from '../../components/ScrollAnimation'
import Link from 'next/link'
import { Clock, Calendar, Tag } from 'lucide-react'

export const metadata = {
    title: 'Blog | Lysander Gutierrez',
    description: 'Articles about software development, web technologies, and programming insights.',
}

function BlogCard({ post }: { post: BlogPost }) {
    return (
        <ScrollAnimation animation="fadeInUp">
            <article className="bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 overflow-hidden">
                <div className="p-6">
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-3">
                        <Calendar className="w-4 h-4 mr-1" />
                        <time dateTime={post.date}>
                            {new Date(post.date).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                            })}
                        </time>
                        <span className="mx-2">•</span>
                        <Clock className="w-4 h-4 mr-1" />
                        <span>{post.readingTime} min read</span>
                    </div>

                    <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                        <Link href={`/blog/${post.slug}`}>
                            {post.title}
                        </Link>
                    </h2>

                    <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                        {post.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-4">
                        {post.tags.map((tag) => (
                            <span
                                key={tag}
                                className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                            >
                                <Tag className="w-3 h-3 mr-1" />
                                {tag}
                            </span>
                        ))}
                    </div>

                    <Link
                        href={`/blog/${post.slug}`}
                        className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200 font-medium transition-colors"
                    >
                        Read more →
                    </Link>
                </div>
            </article>
        </ScrollAnimation>
    )
}

export default function BlogPage() {
    const posts = getAllPosts()

    return (
        <div className="min-h-screen py-8">
            <ScrollAnimation animation="fadeInUp">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                        Blog
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                        Thoughts on software development, web technologies, and the ever-evolving tech landscape.
                    </p>
                </div>
            </ScrollAnimation>

            {posts.length > 0 ? (
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-1 max-w-4xl mx-auto">
                    {posts.map((post, index) => (
                        <div key={post.slug} style={{ animationDelay: `${index * 100}ms` }}>
                            <BlogCard post={post} />
                        </div>
                    ))}
                </div>
            ) : (
                <ScrollAnimation animation="fadeInUp">
                    <div className="text-center py-16">
                        <p className="text-gray-500 dark:text-gray-400 text-lg">
                            No blog posts found. Check back soon for updates!
                        </p>
                    </div>
                </ScrollAnimation>
            )}
        </div>
    )
}
