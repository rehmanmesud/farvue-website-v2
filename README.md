# FARVUE Media Website

A modern, responsive website for FARVUE Media - Professional Video Editing & Design Services. Built with Next.js 14, TypeScript, and Tailwind CSS.

## 🌟 Features

- **Modern Design**: Clean, professional design with smooth animations and micro-interactions
- **Fully Responsive**: Optimized for mobile, tablet, and desktop devices
- **Accessibility First**: WCAG 2.1 AA compliant with proper ARIA labels and keyboard navigation
- **Performance Optimized**: Fast loading with code splitting and lazy loading
- **SEO Ready**: Comprehensive meta tags, structured data, and OpenGraph support
- **TypeScript**: Full type safety and better developer experience
- **Tailwind CSS**: Utility-first CSS framework for rapid development

## 🚀 Quick Start

### Prerequisites

- Node.js 18.0 or later
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/farvuemedia/website.git
   cd farvue-media-website
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000) to see the website.

## 📁 Project Structure

```
farvue-media-website/
├── app/                    # Next.js 14 App Router
│   ├── layout.tsx         # Root layout with metadata
│   └── page.tsx           # Main homepage
├── components/            # React components
│   ├── Header.tsx         # Navigation header
│   ├── Hero.tsx           # Hero section
│   ├── About.tsx          # About section
│   ├── Services.tsx       # Services section
│   ├── Portfolio.tsx      # Work portfolio
│   ├── Pricing.tsx        # Pricing plans
│   ├── WhyChooseUs.tsx    # Comparison section
│   ├── Testimonials.tsx   # Client testimonials
│   ├── Team.tsx           # Team members
│   ├── FAQ.tsx            # FAQ section
│   └── Footer.tsx         # Site footer
├── lib/                   # Utility functions
│   └── utils.ts           # Helper functions
├── types/                 # TypeScript definitions
│   └── index.ts           # Type definitions
├── styles/                # Stylesheets
│   └── globals.css        # Global styles and Tailwind
├── public/                # Static assets
└── config files           # Various configuration files
```

## 🎨 Design System

### Colors

The website uses a carefully crafted color palette based on FARVUE Media's brand:

- **Primary**: `#123456` - Deep blue for trust and professionalism
- **Secondary**: `#789ABC` - Light blue for accents and highlights
- **Accent**: `#e53e3e` - Red for CTAs and important elements
- **Dark**: `#000000` - Pure black for backgrounds
- **Text**: Various shades of white and gray for readability

### Typography

- **Font Family**: Inter (Google Fonts)
- **Headings**: Bold weights (600-800) with tight line height
- **Body Text**: Regular weight (400) with relaxed line height
- **Small Text**: Medium weight (500) for labels and captions

## 🧩 Components

### Header
- Responsive navigation with mobile menu
- Smooth scroll to sections
- Sticky header with background blur effect

### Hero
- Animated gradient background
- Client testimonial preview
- Dual CTA buttons with hover effects

### Services
- Three main service offerings
- Interactive cards with hover animations
- Clear value propositions

### Pricing
- Three pricing tiers with feature comparison
- Popular plan highlighting
- Responsive card layout

### Portfolio
- Filterable work samples
- Before/after comparisons
- Video thumbnails with play buttons

### Testimonials
- Carousel with client videos
- Social proof with ratings
- Responsive testimonial cards

## 🔧 Development

### Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server

# Code Quality
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint errors
npm run format       # Format code with Prettier
npm run type-check   # Run TypeScript checks
```

### Code Style

The project uses:
- **ESLint** for code linting
- **Prettier** for code formatting
- **TypeScript** for type checking
- **Accessibility ESLint plugin** for a11y checks

### Git Hooks (Recommended)

Add these scripts to your `package.json` for automated checks:

```json
{
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged"
    }
  },
  "lint-staged": {
    "*.{js,jsx,ts,tsx}": [
      "eslint --fix",
      "prettier --write"
    ]
  }
}
```

## 🌐 Deployment

### Vercel (Recommended)

1. **Connect to Vercel**
   ```bash
   npm install -g vercel
   vercel
   ```

2. **Configure environment variables** (if needed)
   - Add any API keys or environment-specific variables

3. **Deploy**
   ```bash
   vercel --prod
   ```

### Netlify

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Deploy to Netlify**
   - Upload the `out` folder or connect your Git repository

### Docker

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## ♿ Accessibility

The website follows WCAG 2.1 AA guidelines:

- **Keyboard Navigation**: All interactive elements are keyboard accessible
- **Screen Readers**: Proper ARIA labels and semantic HTML
- **Color Contrast**: All text meets 4.5:1 contrast ratio
- **Focus Management**: Clear focus indicators and logical tab order
- **Reduced Motion**: Respects `prefers-reduced-motion` setting

### Accessibility Testing

```bash
# Install axe-core for automated testing
npm install --save-dev @axe-core/react

# Run accessibility tests
npm run test:a11y
```

## 📈 Performance

### Optimization Features

- **Image Optimization**: Next.js automatic image optimization
- **Code Splitting**: Automatic route-based code splitting
- **Lazy Loading**: Components load on demand
- **Font Optimization**: Optimized Google Fonts loading
- **Bundle Analysis**: Webpack bundle analyzer

### Performance Testing

```bash
# Build and analyze bundle
npm run build
npm run analyze

# Lighthouse testing
npx lighthouse http://localhost:3000 --output html
```

## 🔒 Security

- **Content Security Policy**: Configured headers for XSS protection
- **HTTPS Only**: All external resources use HTTPS
- **Input Validation**: All form inputs are validated
- **Dependency Scanning**: Regular security audits

## 🧪 Testing

### Unit Testing (Jest + React Testing Library)

```bash
npm run test          # Run tests
npm run test:watch    # Run tests in watch mode
npm run test:coverage # Generate coverage report
```

### E2E Testing (Playwright)

```bash
npm run test:e2e      # Run end-to-end tests
npm run test:e2e:ui   # Run tests with UI
```

## 📊 Analytics

### Google Analytics 4

Add your GA4 tracking ID:

```javascript
// app/layout.tsx
<Script
  src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
  strategy="afterInteractive"
/>
```

### Performance Monitoring

- **Core Web Vitals**: Tracked automatically
- **Real User Monitoring**: Performance metrics collection
- **Error Tracking**: Sentry or similar service integration

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file:

```env
# Analytics
NEXT_PUBLIC_GA_ID=your-ga-id

# Contact Form
NEXT_PUBLIC_CONTACT_EMAIL=hello@farvue.media

# Calendar Integration
NEXT_PUBLIC_CALENDLY_URL=https://calendly.com/farvuemedia
```

### Tailwind Configuration

The `tailwind.config.js` includes:
- Custom color palette
- Extended spacing scale
- Custom animations
- Typography plugin
- Forms plugin

## 🤝 Contributing

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Commit your changes**
   ```bash
   git commit -m 'Add some amazing feature'
   ```
4. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Open a Pull Request**

### Coding Standards

- Use TypeScript for all new components
- Follow the existing component structure
- Add proper ARIA labels for accessibility
- Include responsive design considerations
- Write meaningful commit messages

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

For questions or support:

- **Email**: hello@farvue.media
- **Website**: [https://farvue.media](https://farvue.media)
- **Calendar**: [Book a consultation](https://calendly.com/farvuemedia)

## 🚀 Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **Intersection Observer**: React Intersection Observer
- **Deployment**: Vercel (recommended)
- **Package Manager**: npm/yarn

## 📚 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Web Performance Best Practices](https://web.dev/performance/)

---

**Built with ❤️ by FARVUE Media**