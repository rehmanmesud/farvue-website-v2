# 🚀 FARVUE Media Website - Quick Start Guide

Get the FARVUE Media website up and running in under 5 minutes!

## ⚡ One-Line Install & Run

```bash
git clone https://github.com/farvuemedia/website.git && cd farvue-media-website && npm install && npm run dev
```

Then open [http://localhost:3000](http://localhost:3000) in your browser!

## 🔧 Prerequisites

- **Node.js** 18.0 or later
- **npm** or **yarn** package manager
- **Git** for version control

## 📋 Step-by-Step Setup

### 1. Clone the Repository
```bash
git clone https://github.com/farvuemedia/website.git
cd farvue-media-website
```

### 2. Install Dependencies
```bash
npm install
# or
yarn install
```

### 3. Start Development Server
```bash
npm run dev
# or
yarn dev
```

### 4. Open in Browser
Navigate to [http://localhost:3000](http://localhost:3000)

## 🎯 What You Get

### ✅ Complete Website Sections
- **Header** with responsive navigation
- **Hero** section with compelling CTA
- **About** section with client testimonials
- **Services** showcase (3 main offerings)
- **Portfolio** with filterable work samples
- **Pricing** plans with feature comparison
- **Why Choose Us** competitive analysis
- **Client Testimonials** with video carousel
- **Team** profiles with social links
- **FAQ** with expandable questions
- **Footer** with newsletter signup

### ✅ Modern Tech Stack
- **Next.js 14** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **Lucide React** for icons
- **React Intersection Observer** for scroll animations

### ✅ Production Ready Features
- **Fully Responsive** (mobile-first design)
- **SEO Optimized** (meta tags, structured data)
- **Accessibility Compliant** (WCAG 2.1 AA)
- **Performance Optimized** (lazy loading, code splitting)
- **Type Safe** (100% TypeScript)

## 🌈 Brand Customization

The website is pre-configured with FARVUE Media branding:

### Colors
- **Primary**: `#123456` (Deep blue)
- **Secondary**: `#789ABC` (Light blue)  
- **Accent**: `#e53e3e` (Red)
- **Background**: `#000000` (Black)

### Fonts
- **Primary**: Inter (Google Fonts)
- **Headings**: Bold weights (600-800)
- **Body**: Regular weight (400)

## 🛠️ Development Commands

```bash
# Development
npm run dev          # Start dev server
npm run build        # Build for production
npm run start        # Start production server

# Code Quality
npm run lint         # Run linting
npm run lint:fix     # Fix linting issues
npm run format       # Format code
npm run type-check   # Check TypeScript
```

## 🚀 Deploy in 30 Seconds

### Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Netlify
```bash
npm run build
# Upload 'out' folder to Netlify
```

## 📁 Key Files to Know

```
farvue-media-website/
├── app/
│   ├── layout.tsx      # Site layout & SEO
│   └── page.tsx        # Main homepage
├── components/         # All page sections
├── styles/
│   └── globals.css     # Global styles
├── tailwind.config.js  # Design system
└── package.json        # Dependencies
```

## 🎨 Quick Customizations

### Change Colors
Edit `tailwind.config.js`:
```javascript
colors: {
  primary: {
    500: '#YOUR_PRIMARY_COLOR'
  }
}
```

### Update Content
Each component in `/components` has its own content that can be easily updated.

### Add New Sections
Create new components in `/components` and import them in `app/page.tsx`.

## 🔧 Environment Setup (Optional)

Create `.env.local` for:
```env
NEXT_PUBLIC_GA_ID=your-analytics-id
NEXT_PUBLIC_CONTACT_EMAIL=hello@farvue.media
NEXT_PUBLIC_CALENDLY_URL=https://calendly.com/farvuemedia
```

## 🐛 Troubleshooting

### Common Issues

**Port 3000 already in use?**
```bash
npm run dev -- -p 3001
```

**Node version issues?**
```bash
nvm use 18  # or install Node.js 18+
```

**Build errors?**
```bash
rm -rf node_modules package-lock.json
npm install
```

## 📚 Next Steps

1. **Customize content** in each component
2. **Add your branding** (logo, colors, fonts)
3. **Set up analytics** (Google Analytics)
4. **Configure contact forms** (Calendly, email)
5. **Deploy to production** (Vercel, Netlify)

## 💡 Pro Tips

- **Hot reload** is enabled - changes appear instantly
- **TypeScript** will catch errors before runtime
- **Tailwind** classes provide responsive design
- **Components** are fully independent and reusable
- **Accessibility** is built-in - no extra work needed

## 🆘 Need Help?

- **Documentation**: Check `README.md` for comprehensive docs
- **Deployment**: See `DEPLOYMENT.md` for deployment options
- **Structure**: Review `STRUCTURE.md` for project architecture
- **Support**: Email hello@farvue.media

---

**🎉 Happy coding! Your FARVUE Media website is ready to scale!**