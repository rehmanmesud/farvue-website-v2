# Deployment Guide

This guide covers various deployment options for the FARVUE Media website.

## 🚀 Quick Deploy

### Vercel (Recommended)

**One-click deployment:**

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/farvuemedia/website)

**Manual deployment:**

1. Install Vercel CLI
   ```bash
   npm install -g vercel
   ```

2. Login to Vercel
   ```bash
   vercel login
   ```

3. Deploy
   ```bash
   vercel
   ```

4. For production deployment
   ```bash
   vercel --prod
   ```

### Netlify

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Deploy via CLI**
   ```bash
   npm install -g netlify-cli
   netlify login
   netlify deploy --prod --dir=out
   ```

3. **Or connect via Git**
   - Go to [Netlify](https://netlify.com)
   - Connect your repository
   - Set build command: `npm run build`
   - Set publish directory: `out`

## 🔧 Environment Setup

### Environment Variables

Create environment variables for:

```bash
# Analytics
NEXT_PUBLIC_GA_ID=your-google-analytics-id

# Contact
NEXT_PUBLIC_CONTACT_EMAIL=hello@farvue.media
NEXT_PUBLIC_CALENDLY_URL=https://calendly.com/farvuemedia

# Social Media
NEXT_PUBLIC_TWITTER_URL=https://twitter.com/farvuemedia
NEXT_PUBLIC_INSTAGRAM_URL=https://instagram.com/farvuemedia
NEXT_PUBLIC_LINKEDIN_URL=https://linkedin.com/company/farvuemedia
```

### DNS Configuration

Set up these DNS records:

```
Type    Name    Value
A       @       Vercel IP or CNAME
CNAME   www     your-app.vercel.app
```

## 🐳 Docker Deployment

### Dockerfile

```dockerfile
FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./
RUN npm ci --only=production

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Expose port
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
```

### Docker Compose

```yaml
version: '3.8'
services:
  farvue-website:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
    restart: unless-stopped
```

### Build and run

```bash
docker build -t farvue-website .
docker run -p 3000:3000 farvue-website
```

## ☁️ Cloud Platforms

### AWS (with Amplify)

1. **Install AWS Amplify CLI**
   ```bash
   npm install -g @aws-amplify/cli
   amplify configure
   ```

2. **Initialize Amplify**
   ```bash
   amplify init
   ```

3. **Add hosting**
   ```bash
   amplify add hosting
   ```

4. **Deploy**
   ```bash
   amplify publish
   ```

### Google Cloud Platform

1. **Install gcloud CLI**
2. **Create app.yaml**
   ```yaml
   runtime: nodejs18
   
   env_variables:
     NODE_ENV: production
   
   handlers:
   - url: /.*
     script: auto
   ```

3. **Deploy**
   ```bash
   gcloud app deploy
   ```

### Azure Static Web Apps

1. **Create Azure resource**
2. **Connect GitHub repository**
3. **Configure build settings:**
   - App location: `/`
   - Build location: `out`
   - Build command: `npm run build`

## 🌐 CDN Setup

### Cloudflare

1. **Add site to Cloudflare**
2. **Update nameservers**
3. **Enable optimizations:**
   - Auto Minify (HTML, CSS, JS)
   - Brotli compression
   - Image optimization
   - Caching rules

### AWS CloudFront

```json
{
  "Comment": "FARVUE Media Distribution",
  "Origins": [{
    "DomainName": "your-app.vercel.app",
    "Id": "origin1",
    "CustomOriginConfig": {
      "HTTPPort": 443,
      "OriginProtocolPolicy": "https-only"
    }
  }],
  "DefaultCacheBehavior": {
    "TargetOriginId": "origin1",
    "ViewerProtocolPolicy": "redirect-to-https",
    "Compress": true,
    "CachePolicyId": "4135ea2d-6df8-44a3-9df3-4b5a84be39ad"
  }
}
```

## 🔒 Security Checklist

- [ ] HTTPS enabled
- [ ] Security headers configured
- [ ] Environment variables secured
- [ ] CORS configured properly
- [ ] Rate limiting enabled
- [ ] DDoS protection active
- [ ] Regular security scans

## 📊 Monitoring Setup

### Analytics

1. **Google Analytics 4**
   ```javascript
   gtag('config', 'GA_MEASUREMENT_ID');
   ```

2. **Google Search Console**
   - Add property
   - Verify ownership
   - Submit sitemap

### Performance Monitoring

1. **Vercel Analytics** (if using Vercel)
2. **Web Vitals tracking**
3. **Error monitoring** (Sentry recommended)

### Uptime Monitoring

Set up monitoring with:
- Pingdom
- UptimeRobot  
- StatusCake

## 🚀 CI/CD Pipeline

### GitHub Actions

```yaml
name: Deploy
on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run lint
      - run: npm run build
      - run: npm run test
      - uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
```

## 🔧 Post-Deployment

### Testing

1. **Functionality testing**
   - All links work
   - Forms submit correctly
   - Mobile responsiveness
   - Cross-browser compatibility

2. **Performance testing**
   ```bash
   # Lighthouse CI
   npm install -g @lhci/cli
   lhci autorun
   ```

3. **Accessibility testing**
   ```bash
   # axe-cli
   npm install -g @axe-core/cli
   axe https://your-domain.com
   ```

### SEO Setup

1. **Submit sitemap** to Google Search Console
2. **Set up Google My Business**
3. **Configure social media meta tags**
4. **Set up structured data**

### Backup Strategy

1. **Repository backup** (GitHub)
2. **Database backup** (if applicable)
3. **Asset backup** (cloud storage)
4. **Configuration backup**

## 📞 Support

If you encounter issues during deployment:

1. Check the deployment logs
2. Verify environment variables
3. Test locally first
4. Contact support: hello@farvue.media

---

**Happy Deploying! 🚀**