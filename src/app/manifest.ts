import type { MetadataRoute } from 'next'

export const dynamic = 'force-static'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Rohit Kumar Pulamarasetty — Builder & Founder',
    short_name: 'Rohit Pulamarasetty',
    description:
      'Portfolio of Rohit Kumar Pulamarasetty — IIT Madras Data Science student, founder of Beyond Binary Solutions, builder of IITM Grade Suite and Findora.',
    start_url: '/',
    display: 'standalone',
    background_color: '#f5f0e4',
    theme_color: '#c2661a',
    icons: [
      { src: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { src: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
  }
}
