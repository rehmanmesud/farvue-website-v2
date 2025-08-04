# Project Structure Overview

## 📁 Complete File Tree

```
farvue-media-website/
├── 📁 app/                          # Next.js 14 App Router
│   ├── 📄 layout.tsx               # Root layout with metadata & SEO
│   └── 📄 page.tsx                 # Homepage (combines all sections)
│   
├── 📁 components/                   # Reusable React Components
│   ├── 📄 Header.tsx               # Navigation header with mobile menu
│   ├── 📄 Hero.tsx                 # Hero section with CTA
│   ├── 📄 About.tsx                # About section with client cards
│   ├── 📄 Services.tsx             # Services overview
│   ├── 📄 Portfolio.tsx            # Work samples with filtering
│   ├── 📄 Pricing.tsx              # Pricing plans comparison
│   ├── 📄 WhyChooseUs.tsx          # Comparison with competitors
│   ├── 📄 Testimonials.tsx         # Client testimonials carousel
│   ├── 📄 Team.tsx                 # Team member profiles
│   ├── 📄 FAQ.tsx                  # Frequently asked questions
│   └── 📄 Footer.tsx               # Site footer with links
│   
├── 📁 lib/                         # Utility Functions
│   └── 📄 utils.ts                 # Helper functions & utilities
│   
├── 📁 types/                       # TypeScript Definitions
│   └── 📄 index.ts                 # Component & data type definitions
│   
├── 📁 styles/                      # Stylesheets
│   └── 📄 globals.css              # Global styles & Tailwind imports
│   
├── 📁 public/                      # Static Assets
│   └── 📄 README.md                # Asset guidelines & requirements
│   
├── 📁 Configuration Files
│   ├── 📄 package.json             # Dependencies & scripts
│   ├── 📄 tsconfig.json            # TypeScript configuration
│   ├── 📄 tailwind.config.js       # Tailwind CSS configuration
│   ├── 📄 next.config.js           # Next.js configuration
│   ├── 📄 postcss.config.js        # PostCSS configuration
│   ├── 📄 .eslintrc.js             # ESLint rules
│   ├── 📄 .prettierrc              # Prettier formatting rules
│   └── 📄 .gitignore               # Git ignore patterns
│   
└── 📁 Documentation
    ├── 📄 README.md                # Main project documentation
    ├── 📄 DEPLOYMENT.md            # Deployment guide
    └── 📄 STRUCTURE.md             # This file
```

## 🧩 Component Architecture

### Layout Components
- **Header**: Responsive navigation with smooth scrolling
- **Footer**: Site links, newsletter signup, social media

### Content Sections
- **Hero**: Main landing section with value proposition
- **About**: Company introduction with client previews
- **Services**: Three main service offerings
- **Portfolio**: Filterable work samples with before/after
- **Pricing**: Three-tier pricing comparison
- **WhyChooseUs**: Competitive advantage comparison
- **Testimonials**: Client testimonial carousel
- **Team**: Team member profiles with social links
- **FAQ**: Expandable frequently asked questions

## 🎨 Design System

### Colors (Tailwind Classes)
```css
primary-500     /* #123456 - Main brand blue */
secondary-500   /* #789ABC - Accent blue */
accent-500      /* #e53e3e - CTA red */
dark-900        /* #000000 - Background black */
```

### Typography Scale
```css
heading-xl      /* 4xl-6xl responsive headings */
heading-lg      /* 3xl-5xl section headings */
heading-md      /* 2xl-4xl sub-headings */
text-lg         /* Large body text */
text-base       /* Regular body text */
text-sm         /* Small text & captions */
```

### Component Classes
```css
btn-primary     /* Primary CTA button */
btn-secondary   /* Secondary button */
btn-outline     /* Outline button */
card            /* Standard card component */
card-gradient   /* Gradient card variant */
section-padding /* Standard section spacing */
container-custom /* Container with max-width */
```

## 📱 Responsive Breakpoints

```css
sm: 640px       /* Small tablets */
md: 768px       /* Tablets */
lg: 1024px      /* Small desktops */
xl: 1280px      /* Large desktops */
2xl: 1536px     /* Extra large screens */
```

## ♿ Accessibility Features

### WCAG 2.1 AA Compliance
- **Keyboard Navigation**: Full keyboard accessibility
- **Screen Readers**: Proper ARIA labels and semantic HTML
- **Color Contrast**: 4.5:1 minimum contrast ratio
- **Focus Management**: Clear focus indicators
- **Alternative Text**: All images have descriptive alt text
- **Skip Links**: Skip to main content functionality

### Implementation
- Focus rings with `focus:ring-2 focus:ring-secondary-500`
- ARIA roles and labels on interactive elements
- Semantic HTML5 elements (`<nav>`, `<main>`, `<section>`)
- Screen reader only text with `.sr-only` class
- Reduced motion support with `@media (prefers-reduced-motion)`

## 🚀 Performance Optimizations

### Next.js Features
- **App Router**: Latest Next.js 14 architecture
- **Image Optimization**: Automatic WebP/AVIF conversion
- **Code Splitting**: Route-based automatic splitting
- **Static Generation**: Pre-rendered at build time

### Custom Optimizations
- **Lazy Loading**: Components load on scroll
- **Intersection Observer**: Animate elements on viewport entry
- **Font Optimization**: Google Fonts with `font-display: swap`
- **Bundle Analysis**: Webpack bundle analyzer integration

## 🔧 Development Workflow

### Code Quality Tools
```bash
npm run lint        # ESLint code linting
npm run format      # Prettier code formatting
npm run type-check  # TypeScript type checking
```

### Build Process
```bash
npm run dev         # Development server
npm run build       # Production build
npm run start       # Production server
```

### File Naming Conventions
- **Components**: PascalCase (`Header.tsx`)
- **Utilities**: camelCase (`utils.ts`)
- **Types**: camelCase (`index.ts`)
- **Styles**: kebab-case (`globals.css`)

## 📦 Dependencies

### Production Dependencies
- **next**: React framework with App Router
- **react**: UI library
- **lucide-react**: Icon library
- **framer-motion**: Animation library
- **react-intersection-observer**: Scroll animations

### Development Dependencies
- **typescript**: Type safety
- **tailwindcss**: Utility-first CSS
- **eslint**: Code linting
- **prettier**: Code formatting
- **@tailwindcss/forms**: Form styling
- **@tailwindcss/typography**: Typography utilities

## 🌐 Deployment Ready

The project is configured for:
- **Vercel**: Zero-config deployment
- **Netlify**: Static site deployment
- **Docker**: Containerized deployment
- **CDN**: Optimized for global delivery

---

**Built with modern web standards and best practices** 🚀