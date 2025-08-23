# Lysander Gutierrez Portfolio Website

A modern, high-performance portfolio website built with Next.js 15, featuring advanced animations, blog system, and comprehensive performance monitoring.

## 🚀 Features

### Core Features

- Can be disabled via `NEXT_PUBLIC_FEATURE_BLOG=false` to hide all blog pages, navigation, search entries, and structured data.

### Enhanced Features

- **Advanced Animations** powered by Framer Motion
- **Blog System** with MDX support for rich content
- **Command Palette** (⌘K) for quick navigation
- **Working Contact Form** with validation
- **Performance Monitoring** with Core Web Vitals tracking
- **Analytics Integration** with privacy-focused tracking
- **Progressive Web App** capabilities
- **Accessibility compliant** with WCAG guidelines

### Performance Optimizations

- **Image optimization** with Next.js Image component
- **Bundle analysis** and optimization
- **Code splitting** for faster loading
- **Preloading** for critical resources
- **Caching strategies** for improved performance

## 🛠️ Tech Stack

### Frontend

- **Next.js 15** - React framework with App Router
- **React 19** - UI library with latest features
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **Lucide React** - Beautiful icons

### Blog & Content

- **MDX** - Markdown with JSX components
- **Gray Matter** - Frontmatter parsing
- **Next MDX Remote** - Server-side MDX rendering

### Forms & Validation

- **React Hook Form** - Performant forms
- **Zod** - Schema validation
- **@hookform/resolvers** - Form validation integration

### Developer Experience

- **ESLint** - Code linting
- **Prettier** - Code formatting
- **TypeScript** - Type checking
- **Hot Reload** - Fast development

### Monitoring & Analytics

- **Performance Observer API** - Core Web Vitals tracking
- **Google Analytics** - User analytics (optional)
- **Error Boundaries** - Graceful error handling

## 📁 Project Structure

```
├── app/                    # Next.js App Router pages
│   ├── about/             # About page
│   ├── blog/              # Blog listing and posts
│   │   └── [slug]/        # Dynamic blog post pages
│   ├── contact/           # Contact page with form
│   ├── projects/          # Projects showcase
│   ├── api/               # API routes
│   │   └── contact/       # Contact form handler
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout with navigation
│   ├── loading.tsx        # Loading component
│   ├── not-found.tsx      # 404 page
│   └── page.tsx           # Homepage
├── components/            # Reusable React components
│   ├── Analytics.tsx      # Analytics tracking
│   ├── CommandPalette.tsx # Quick navigation
│   ├── ContactForm.tsx    # Contact form
│   ├── PerformanceMonitor.tsx # Performance metrics
│   ├── ProjectCard.tsx    # Project display card
│   ├── ScrollAnimation.tsx # Scroll-triggered animations
│   └── ...               # Other components
├── content/               # Content files
│   └── blog/             # Blog posts in MDX format
├── data/                  # Data files
│   └── projects.ts       # Project information
├── lib/                   # Utility functions
│   └── blog.ts           # Blog utilities
├── public/               # Static assets
└── ...                   # Config files
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm
- Git

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/leegutierrez7/lysandergutierrez-website.git
   cd lysandergutierrez-website
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   ```bash
   cp .env.example .env.local
   ```

   Add your configuration:

   ```env
   NEXT_PUBLIC_GA_MEASUREMENT_ID=your_ga_id_here
   ```

4. **Run the development server**

   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Building for Production

```bash
npm run build
npm start
```

## 📝 Content Management

### Adding Blog Posts

1. Create a new MDX file in `content/blog/`
2. Add frontmatter with required fields:
   ```yaml
   ---
   title: 'Your Post Title'
   description: 'Post description'
   date: '2024-01-01'
   tags: ['tag1', 'tag2']
   author: 'Your Name'
   ---
   ```
3. Write your content in Markdown/MDX
4. The post will automatically appear in the blog

### Adding Projects

Edit `data/projects.ts` to add new projects with the following structure:

```typescript
{
  slug: 'project-slug',
  name: 'Project Name',
  description: 'Project description',
  highlights: ['Feature 1', 'Feature 2'],
  tech: ['Tech1', 'Tech2'],
  repo: 'https://github.com/...',
  demo: 'https://demo-url.com',
  icon: '🚀',
  year: '2024',
  status: 'active',
  category: 'web'
}
```

## ⚡ Performance Features

### Core Web Vitals Monitoring

- **First Contentful Paint (FCP)** tracking
- **Largest Contentful Paint (LCP)** monitoring
- **First Input Delay (FID)** measurement
- **Cumulative Layout Shift (CLS)** tracking
- **Time to First Byte (TTFB)** monitoring

### Optimization Techniques

- Image optimization with next/image
- Code splitting at route level
- Component-level lazy loading
- Bundle size analysis
- Caching strategies

## 🎨 Customization

### Styling

- Modify `tailwind.config.js` for design system changes
- Update `app/globals.css` for global styles
- Component-specific styles in individual files

### Animations

- Customize animations in `components/ScrollAnimation.tsx`
- Add new animation variants as needed
- Control animation timing and easing

### Content

- Update personal information in components
- Modify project data in `data/projects.ts`
- Add blog posts in `content/blog/`

## 🔧 Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript checks
```

## 📊 Analytics & Monitoring

### Built-in Analytics

- Page view tracking
- User interaction monitoring
- Performance metrics collection
- Scroll depth tracking
- Click event tracking

### Privacy-Focused

- IP anonymization enabled
- No personal data collection
- GDPR compliant setup
- User consent respected

## 🔒 Security

- Content Security Policy headers
- HTTPS enforcement
- Input validation and sanitization
- XSS protection
- SQL injection prevention

## 📱 Progressive Web App

- Service worker for offline support
- Web app manifest
- Install prompts
- Responsive design
- Touch-friendly interactions

## 🧪 Testing

- Component testing setup
- E2E testing configuration
- Performance testing
- Accessibility testing
- Cross-browser compatibility

## 🚀 Deployment

### Vercel (Recommended)

1. Connect your GitHub repository
2. Set environment variables
3. Deploy automatically on push

### Other Platforms

- Netlify
- AWS Amplify
- Google Cloud Platform
- Self-hosted with Docker

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🎯 Future Enhancements

- [ ] Multi-language support (i18n)
- [ ] CMS integration
- [ ] Newsletter signup
- [ ] Project filtering and search
- [ ] Advanced animations
- [ ] Video content support
- [ ] Social media integration
- [ ] Comment system for blog
- [ ] RSS feed generation
- [ ] Sitemap automation

## 📞 Contact

- **Email**: [Contact via website](https://lysandergutierrez.com/contact)
- **LinkedIn**: [lysandergutierrez](https://linkedin.com/in/lysandergutierrez)
- **GitHub**: [leegutierrez7](https://github.com/leegutierrez7)

---

Built with ❤️ by Lysander Gutierrez
