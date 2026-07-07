import type { Metadata } from 'next'
import { Plus_Jakarta_Sans, JetBrains_Mono } from 'next/font/google'
import { ThemeProvider } from 'next-themes'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import './globals.css'

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800'],
})

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono-custom',
  display: 'swap',
  weight: ['400', '500'],
})

const BASE_URL = 'https://rohitpulamarasetty.github.io'

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: 'Rohit Kumar Pulamarasetty — Builder, Founder, Engineer',
  description:
    'I build products, startups, and tools that solve real problems. Student at IIT Madras pursuing Data Science. Founder of Beyond Binary Solutions.',
  keywords: [
    'Rohit Kumar Pulamarasetty',
    'IIT Madras',
    'Data Science',
    'Software Engineer',
    'Founder',
    'Beyond Binary Solutions',
    'Findora',
    'IITM Grade Suite',
    'Portfolio',
  ],
  authors: [{ name: 'Rohit Kumar Pulamarasetty', url: BASE_URL }],
  creator: 'Rohit Kumar Pulamarasetty',
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  openGraph: {
    title: 'Rohit Kumar Pulamarasetty — Builder, Founder, Engineer',
    description: 'Building products, startups, and tools from IIT Madras. 1K+ users, 68M+ records processed.',
    url: BASE_URL,
    siteName: 'Rohit Kumar Pulamarasetty',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rohit Kumar Pulamarasetty — Builder, Founder, Engineer',
    description: 'Building products, startups, and tools from IIT Madras. 1K+ users, 68M+ records processed.',
    creator: '@RohitPulamarasetty',
  },
  alternates: {
    canonical: BASE_URL,
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${jakarta.variable} ${jetbrains.variable} bg-white dark:bg-[#0a0a0a] text-[#0f0f0f] dark:text-[#f2f2f2]`}
      >
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <Header />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
