import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
    const base = 'https://lysandergutierrez.com'
    const routes = ['', '/about', '/projects', '/contact'].map(path => ({
        url: `${base}${path}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: path === '' ? 1 : 0.7
    }))
    return routes
}
