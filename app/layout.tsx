import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '../styles/globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'FARVUE Media - Professional Video Editing & Design Services',
  description: 'Scale your brand with professional video editing and design services. We help creators and businesses grow through high-quality content creation for YouTube, Instagram, TikTok, and more.',
  keywords: ['video editing', 'content creation', 'youtube editing', 'thumbnail design', 'social media content', 'brand scaling'],
  authors: [{ name: 'FARVUE Media' }],
  creator: 'FARVUE Media',
  publisher: 'FARVUE Media',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://farvue.media',
    title: 'FARVUE Media - Professional Video Editing & Design Services',
    description: 'Scale your brand with professional video editing and design services. We help creators and businesses grow through high-quality content creation.',
    siteName: 'FARVUE Media',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'FARVUE Media - Professional Video Editing & Design Services',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FARVUE Media - Professional Video Editing & Design Services',
    description: 'Scale your brand with professional video editing and design services.',
    images: ['/og-image.jpg'],
    creator: '@farvuemedia',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en' className={inter.variable}>
      <head>
        <link rel='icon' href='/favicon.ico' />
        <link rel='apple-touch-icon' sizes='180x180' href='/apple-touch-icon.png' />
        <link rel='icon' type='image/png' sizes='32x32' href='/favicon-32x32.png' />
        <link rel='icon' type='image/png' sizes='16x16' href='/favicon-16x16.png' />
        <link rel='manifest' href='/site.webmanifest' />
        <meta name='theme-color' content='#123456' />
        <meta name='viewport' content='width=device-width, initial-scale=1, shrink-to-fit=no' />
      </head>
      <body className='font-sans'>
        {/* Skip to main content link for accessibility */}
        <a 
          href='#main-content' 
          className='skip-link'
          aria-label='Skip to main content'
        >
          Skip to main content
        </a>
        
        {children}
        
        {/* Schema.org structured data */}
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'FARVUE Media',
              description: 'Professional video editing and design services for content creators and businesses',
              url: 'https://farvue.media',
              logo: 'https://farvue.media/logo.png',
              contactPoint: {
                '@type': 'ContactPoint',
                telephone: '+1-XXX-XXX-XXXX',
                contactType: 'customer service',
                availableLanguage: 'English'
              },
              sameAs: [
                'https://twitter.com/farvuemedia',
                'https://instagram.com/farvuemedia',
                'https://linkedin.com/company/farvuemedia'
              ],
              serviceOffered: [
                {
                  '@type': 'Service',
                  name: 'Video Editing',
                  description: 'Professional video editing for YouTube, social media, and business content'
                },
                {
                  '@type': 'Service',
                  name: 'Thumbnail Design',
                  description: 'Eye-catching thumbnail designs to increase click-through rates'
                },
                {
                  '@type': 'Service',
                  name: 'Content Strategy',
                  description: 'Strategic content planning and creation services'
                }
              ]
            })
          }}
        />
      </body>
    </html>
  );
}