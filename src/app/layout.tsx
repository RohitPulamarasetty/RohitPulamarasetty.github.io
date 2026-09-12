import type { Metadata } from 'next'
import { Bricolage_Grotesque, Inter, JetBrains_Mono, Silkscreen } from 'next/font/google'
import { ThemeProvider } from 'next-themes'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import SmoothScroll from '@/components/layout/SmoothScroll'
import RevealController from '@/components/layout/RevealController'
import { socials } from '@/lib/data'
import './globals.css'

const display = Bricolage_Grotesque({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
  weight: ['500', '600', '700', '800'],
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
  weight: ['400', '500', '600'],
})

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono-custom',
  display: 'swap',
  weight: ['400', '500', '600'],
})

const silkscreen = Silkscreen({
  subsets: ['latin'],
  variable: '--font-pixel-custom',
  display: 'swap',
  weight: ['400', '700'],
})

const BASE_URL = 'https://rohitpulamarasetty.github.io'

// Google Search Console verification token. Get it from Search Console →
// add property "https://rohitpulamarasetty.github.io/" → "HTML tag" method →
// copy the content value here (just the token, e.g. "abc123..."). Deploy,
// then click Verify. Leaving it empty renders no verification tag.
const GOOGLE_SITE_VERIFICATION = 'SgZHaehIh0DTdEEYxC62Qsb80uDqO9GIY-7HreIWarY'
const TITLE = 'Rohit Kumar Pulamarasetty — IIT Madras Builder & Founder'
const DESCRIPTION =
  'Rohit Kumar Pulamarasetty is a Data Science student at IIT Madras (BS \'28) and founder of Beyond Binary Solutions. He built IITM Grade Suite (2,000+ students), Findora, and FoundBrew, and is going deeper into machine learning and quantitative finance.'

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: TITLE,
    template: '%s — Rohit Kumar Pulamarasetty',
  },
  description: DESCRIPTION,
  keywords: [
    'Rohit Kumar Pulamarasetty',
    'Rohit Pulamarasetty',
    'IIT Madras',
    'Data Science and Applications',
    'Beyond Binary Solutions',
    'IITM Grade Suite',
    'Findora',
    'FoundBrew',
    'Founder',
    'Software Engineer',
    'Full Stack Developer',
    'Machine Learning',
    'Quantitative Finance',
    'Data Analyst',
  ],
  authors: [{ name: 'Rohit Kumar Pulamarasetty', url: BASE_URL }],
  creator: 'Rohit Kumar Pulamarasetty',
  publisher: 'Rohit Kumar Pulamarasetty',
  category: 'technology',
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
  icons: {
    icon: [
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    shortcut: '/favicon-32.png',
    apple: '/icon-192.png',
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: BASE_URL,
    siteName: 'Rohit Kumar Pulamarasetty',
    type: 'profile',
    locale: 'en_US',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 675,
        type: 'image/jpeg',
        alt: 'Rohit Kumar Pulamarasetty — IIT Madras builder and founder of Beyond Binary Solutions',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
    images: ['/og-image.jpg'],
  },
  alternates: {
    canonical: `${BASE_URL}/`,
  },
  ...(GOOGLE_SITE_VERIFICATION
    ? { verification: { google: GOOGLE_SITE_VERIFICATION } }
    : {}),
}

export const viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#0e0d0b' },
    { media: '(prefers-color-scheme: light)', color: '#f5f0e4' },
  ],
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Person',
      '@id': `${BASE_URL}/#person`,
      name: 'Rohit Kumar Pulamarasetty',
      url: BASE_URL,
      image: `${BASE_URL}/icon-512.png`,
      jobTitle: 'Founder & Student',
      description: DESCRIPTION,
      knowsAbout: [
        'Data Science',
        'Machine Learning',
        'Quantitative Finance',
        'Full-Stack Development',
        'Next.js',
        'Python',
        'SQL',
        'Product Development',
      ],
      alumniOf: {
        '@type': 'CollegeOrUniversity',
        name: 'Indian Institute of Technology Madras',
      },
      affiliation: {
        '@type': 'CollegeOrUniversity',
        name: 'Indian Institute of Technology Madras',
      },
      worksFor: {
        '@type': 'Organization',
        name: 'Beyond Binary Solutions',
        url: 'https://beyondbinarysolutions.com',
      },
      sameAs: [socials.github, socials.linkedin, socials.instagram],
    },
    {
      '@type': 'Organization',
      '@id': 'https://beyondbinarysolutions.com/#organization',
      name: 'Beyond Binary Solutions',
      url: 'https://beyondbinarysolutions.com',
      founder: { '@id': `${BASE_URL}/#person` },
    },
    {
      '@type': 'WebSite',
      '@id': `${BASE_URL}/#website`,
      name: 'Rohit Kumar Pulamarasetty',
      url: BASE_URL,
      author: { '@id': `${BASE_URL}/#person` },
      inLanguage: 'en-US',
    },
    {
      '@type': 'SoftwareApplication',
      name: 'IITM Grade Suite',
      url: 'https://iitm-grade-suite.pages.dev',
      applicationCategory: 'EducationApplication',
      operatingSystem: 'Web',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      creator: { '@id': `${BASE_URL}/#person` },
      description:
        'A free grade calculator, end-term predictor, and CGPA tracker built from the official IITM BS Data Science grading rules, used by 2,000+ students.',
    },
    {
      '@type': 'SoftwareApplication',
      name: 'Findora',
      url: 'https://findora.live',
      applicationCategory: 'UtilitiesApplication',
      operatingSystem: 'Web',
      creator: { '@id': `${BASE_URL}/#person` },
      description:
        'A verified lost-and-found platform for the IIT Madras BS student community, with under-48-hour average recovery times.',
    },
    {
      '@type': 'SoftwareApplication',
      name: 'FoundBrew',
      url: 'https://foundbrew.beyondbinarysolutions.com',
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Web',
      creator: { '@id': `${BASE_URL}/#person` },
      description: 'A community that helps builders find who to build with, and gives that work a public record.',
    },
    {
      '@type': 'FAQPage',
      '@id': `${BASE_URL}/#faq`,
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Who is Rohit Kumar Pulamarasetty?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Rohit Kumar Pulamarasetty is a Data Science and Applications student at IIT Madras (BS, class of 2028) and the founder of Beyond Binary Solutions, a software studio. He built IITM Grade Suite and Findora, and is now studying machine learning and quantitative finance.',
          },
        },
        {
          '@type': 'Question',
          name: 'What has Rohit Kumar Pulamarasetty built?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'He built IITM Grade Suite, a grade calculator and CGPA tracker used by 2,000+ IIT Madras students; Findora, a verified lost-and-found platform for IIT Madras; and FoundBrew, a community for finding collaborators to build with. He also founded Beyond Binary Solutions, a software studio for real businesses.',
          },
        },
        {
          '@type': 'Question',
          name: 'What is Beyond Binary Solutions?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Beyond Binary Solutions is a software studio founded by Rohit Kumar Pulamarasetty that builds software for real businesses with fixed scope and direct access to the engineer writing the code.',
          },
        },
        {
          '@type': 'Question',
          name: 'What are Rohit Kumar Pulamarasetty\'s technical skills?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'His skills span data analysis (Python, SQL, Pandas, NumPy, Statistics), analytics and BI (Power BI, Tableau, Excel), full-stack engineering (JavaScript, TypeScript, React, Next.js, Node.js), and backend work (Supabase, PostgreSQL, MySQL, APIs). He is currently studying machine learning and quantitative finance.',
          },
        },
      ],
    },
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${display.variable} ${inter.variable} ${jetbrains.variable} ${silkscreen.variable} font-sans antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <SmoothScroll>
            <a
              href="#main"
              className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:rounded-md focus:bg-[var(--color-accent)] focus:text-white"
            >
              Skip to content
            </a>
            <RevealController />
            <Header />
            {children}
            <Footer />
          </SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  )
}
