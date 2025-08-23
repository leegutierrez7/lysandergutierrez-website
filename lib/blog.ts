import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { isBlogEnabled } from './featureFlags'

export interface BlogPost {
  slug: string
  title: string
  description: string
  date: string
  tags: string[]
  author: string
  image?: string
  content: string
  readingTime: number
}

const postsDirectory = path.join(process.cwd(), 'content/blog')

export function getAllPosts(): BlogPost[] {
  if (!isBlogEnabled()) return []
  try {
    const fileNames = fs.readdirSync(postsDirectory)
    const allPostsData = fileNames
      .filter(fileName => fileName.endsWith('.mdx'))
      .map(fileName => {
        const slug = fileName.replace(/\.mdx$/, '')
        const fullPath = path.join(postsDirectory, fileName)
        const fileContents = fs.readFileSync(fullPath, 'utf8')
        const { data, content } = matter(fileContents)

        // Calculate reading time (rough estimate: 200 words per minute)
        const wordCount = content.split(/\s+/).length
        const readingTime = Math.ceil(wordCount / 200)

        return {
          slug,
          title: data.title,
          description: data.description,
          date: data.date,
          tags: data.tags || [],
          author: data.author,
          image: data.image,
          content,
          readingTime,
        }
      })

    return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1))
  } catch (error) {
    console.error('Error reading blog posts:', error)
    return []
  }
}

export function getPostBySlug(slug: string): BlogPost | null {
  if (!isBlogEnabled()) return null
  try {
    const fullPath = path.join(postsDirectory, `${slug}.mdx`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)

    const wordCount = content.split(/\s+/).length
    const readingTime = Math.ceil(wordCount / 200)

    return {
      slug,
      title: data.title,
      description: data.description,
      date: data.date,
      tags: data.tags || [],
      author: data.author,
      image: data.image,
      content,
      readingTime,
    }
  } catch (error) {
    console.error(`Error reading blog post ${slug}:`, error)
    return null
  }
}

export function getPostSlugs(): string[] {
  if (!isBlogEnabled()) return []
  try {
    const fileNames = fs.readdirSync(postsDirectory)
    return fileNames
      .filter(fileName => fileName.endsWith('.mdx'))
      .map(fileName => fileName.replace(/\.mdx$/, ''))
  } catch (error) {
    console.error('Error reading post slugs:', error)
    return []
  }
}
