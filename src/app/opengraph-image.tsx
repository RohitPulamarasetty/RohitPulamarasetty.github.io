import { ImageResponse } from 'next/og'

export const dynamic = 'force-static'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          display: 'flex',
          flexDirection: 'column',
          background: '#0a0a0a',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        {/* Top gradient accent bar */}
        <div style={{ display: 'flex', height: 5 }}>
          <div style={{ flex: 1, background: '#8b5cf6' }} />
          <div style={{ flex: 1, background: '#6366f1' }} />
          <div style={{ flex: 1, background: '#3b82f6' }} />
          <div style={{ flex: 1, background: '#06b6d4' }} />
          <div style={{ flex: 1, background: '#10b981' }} />
        </div>

        {/* Main layout: left content + right decorative */}
        <div style={{ display: 'flex', flex: 1 }}>

          {/* Left content */}
          <div style={{ display: 'flex', flex: 1, flexDirection: 'column', padding: '56px 72px', justifyContent: 'space-between' }}>

            {/* Badge */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ width: 8, height: 8, borderRadius: 4, background: '#10b981' }} />
              <span style={{ color: '#555', fontSize: 13, letterSpacing: 3, fontFamily: 'monospace' }}>
                IIT MADRAS · DATA SCIENCE & APPLICATIONS
              </span>
            </div>

            {/* Name + tagline */}
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', fontSize: 84, fontWeight: 900, color: '#f2f2f2', lineHeight: 0.92, letterSpacing: -3 }}>
                Rohit Kumar
              </div>
              <div style={{ display: 'flex', fontSize: 84, fontWeight: 900, color: '#333', lineHeight: 0.92, letterSpacing: -3, marginBottom: 28 }}>
                Pulamarasetty.
              </div>
              <div style={{ display: 'flex', fontSize: 24, fontWeight: 600, color: '#666' }}>
                Builder · Founder · Engineer
              </div>
            </div>

            {/* Stats row */}
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', gap: 40 }}>
                {/* Stat: Users */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                  <span style={{ fontSize: 34, fontWeight: 800, color: '#f2f2f2', lineHeight: 1 }}>1K+</span>
                  <span style={{ fontSize: 11, color: '#444', letterSpacing: 3 }}>USERS</span>
                </div>
                {/* Divider */}
                <div style={{ display: 'flex', width: 1, height: 44, background: '#1e1e1e', alignSelf: 'flex-end', marginBottom: 4 }} />
                {/* Stat: Records */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                  <span style={{ fontSize: 34, fontWeight: 800, color: '#f2f2f2', lineHeight: 1 }}>68M+</span>
                  <span style={{ fontSize: 11, color: '#444', letterSpacing: 3 }}>RECORDS</span>
                </div>
                {/* Divider */}
                <div style={{ display: 'flex', width: 1, height: 44, background: '#1e1e1e', alignSelf: 'flex-end', marginBottom: 4 }} />
                {/* Stat: Products */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                  <span style={{ fontSize: 34, fontWeight: 800, color: '#f2f2f2', lineHeight: 1 }}>3+</span>
                  <span style={{ fontSize: 11, color: '#444', letterSpacing: 3 }}>PRODUCTS</span>
                </div>
              </div>
              <span style={{ fontSize: 12, color: '#2a2a2a', fontFamily: 'monospace', letterSpacing: 1 }}>
                rohitpulamarasetty.github.io
              </span>
            </div>
          </div>

          {/* Right decorative panel */}
          <div
            style={{
              width: 300,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              borderLeft: '1px solid #141414',
              gap: 20,
              background: 'linear-gradient(180deg, #0d0d0d 0%, #0a0a0a 100%)',
            }}
          >
            {/* Monogram circle */}
            <div
              style={{
                width: 140,
                height: 140,
                borderRadius: 70,
                background: 'linear-gradient(135deg, #8b5cf6 0%, #3b82f6 50%, #10b981 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <div
                style={{
                  width: 130,
                  height: 130,
                  borderRadius: 65,
                  background: '#0a0a0a',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 56,
                  fontWeight: 900,
                  color: '#f2f2f2',
                  letterSpacing: -2,
                }}
              >
                RP
              </div>
            </div>

            {/* Decorative dots grid */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, opacity: 0.15 }}>
              {[0, 1, 2].map((row) => (
                <div key={row} style={{ display: 'flex', gap: 10 }}>
                  {[0, 1, 2, 3].map((col) => (
                    <div
                      key={col}
                      style={{ width: 4, height: 4, borderRadius: 2, background: '#888' }}
                    />
                  ))}
                </div>
              ))}
            </div>

            {/* Stack labels */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'center' }}>
              {['Next.js', 'TypeScript', 'Supabase'].map((tech) => (
                <div
                  key={tech}
                  style={{
                    fontSize: 11,
                    color: '#333',
                    fontFamily: 'monospace',
                    letterSpacing: 2,
                    borderBottom: '1px solid #1a1a1a',
                    paddingBottom: 4,
                    width: 90,
                    textAlign: 'center',
                    display: 'flex',
                    justifyContent: 'center',
                  }}
                >
                  {tech}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom border line */}
        <div style={{ display: 'flex', height: 1, background: '#141414' }} />
      </div>
    ),
    { ...size }
  )
}
