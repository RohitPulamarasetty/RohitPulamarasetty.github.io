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
          background: '#080808',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        {/* Top gradient accent bar */}
        <div style={{ display: 'flex', height: 4 }}>
          <div style={{ flex: 1, background: '#8b5cf6' }} />
          <div style={{ flex: 1, background: '#6366f1' }} />
          <div style={{ flex: 1, background: '#3b82f6' }} />
          <div style={{ flex: 1, background: '#06b6d4' }} />
          <div style={{ flex: 1, background: '#10b981' }} />
        </div>

        {/* Main layout: left content + right decorative */}
        <div style={{ display: 'flex', flex: 1 }}>

          {/* Left content */}
          <div style={{ display: 'flex', flex: 1, flexDirection: 'column', padding: '52px 68px', justifyContent: 'space-between' }}>

            {/* Badge */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ width: 7, height: 7, borderRadius: 4, background: '#10b981' }} />
              <span style={{ color: '#555', fontSize: 12, letterSpacing: 3, fontFamily: 'monospace' }}>
                IIT MADRAS · DATA SCIENCE & APPLICATIONS
              </span>
            </div>

            {/* Name + tagline */}
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', fontSize: 88, fontWeight: 900, color: '#f2f2f2', lineHeight: 0.9, letterSpacing: -4 }}>
                Rohit Kumar
              </div>
              {/* Surname in violet — high contrast and eye-catching */}
              <div style={{ display: 'flex', fontSize: 88, fontWeight: 900, color: '#a78bfa', lineHeight: 0.9, letterSpacing: -4, marginBottom: 24 }}>
                Pulamarasetty.
              </div>
              <div style={{ display: 'flex', fontSize: 22, fontWeight: 500, color: '#666', letterSpacing: -0.5 }}>
                Builder · Founder · Engineer
              </div>
            </div>

            {/* Stats row */}
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', gap: 36 }}>
                {/* Stat: Users */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                  <span style={{ fontSize: 32, fontWeight: 800, color: '#a78bfa', lineHeight: 1 }}>1K+</span>
                  <span style={{ fontSize: 10, color: '#555', letterSpacing: 3 }}>USERS</span>
                </div>
                {/* Divider */}
                <div style={{ display: 'flex', width: 1, height: 40, background: '#222', alignSelf: 'flex-end', marginBottom: 4 }} />
                {/* Stat: Records */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                  <span style={{ fontSize: 32, fontWeight: 800, color: '#60a5fa', lineHeight: 1 }}>68M+</span>
                  <span style={{ fontSize: 10, color: '#555', letterSpacing: 3 }}>RECORDS</span>
                </div>
                {/* Divider */}
                <div style={{ display: 'flex', width: 1, height: 40, background: '#222', alignSelf: 'flex-end', marginBottom: 4 }} />
                {/* Stat: Products */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                  <span style={{ fontSize: 32, fontWeight: 800, color: '#34d399', lineHeight: 1 }}>3+</span>
                  <span style={{ fontSize: 10, color: '#555', letterSpacing: 3 }}>PRODUCTS</span>
                </div>
              </div>
              <span style={{ fontSize: 11, color: '#444', fontFamily: 'monospace', letterSpacing: 1 }}>
                rohitpulamarasetty.github.io
              </span>
            </div>
          </div>

          {/* Right decorative panel */}
          <div
            style={{
              width: 280,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              borderLeft: '1px solid #1c1c1c',
              gap: 28,
              background: 'linear-gradient(160deg, #110d1f 0%, #0d0d0d 50%)',
            }}
          >
            {/* Monogram circle with gradient ring */}
            <div
              style={{
                width: 152,
                height: 152,
                borderRadius: 76,
                background: 'linear-gradient(135deg, #8b5cf6 0%, #3b82f6 50%, #10b981 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <div
                style={{
                  width: 138,
                  height: 138,
                  borderRadius: 69,
                  background: '#0f0b18',
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
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, opacity: 0.45 }}>
              <div style={{ display: 'flex', gap: 10 }}>
                <div style={{ width: 4, height: 4, borderRadius: 2, background: '#777' }} />
                <div style={{ width: 4, height: 4, borderRadius: 2, background: '#777' }} />
                <div style={{ width: 4, height: 4, borderRadius: 2, background: '#777' }} />
                <div style={{ width: 4, height: 4, borderRadius: 2, background: '#777' }} />
              </div>
              <div style={{ display: 'flex', gap: 10 }}>
                <div style={{ width: 4, height: 4, borderRadius: 2, background: '#777' }} />
                <div style={{ width: 4, height: 4, borderRadius: 2, background: '#777' }} />
                <div style={{ width: 4, height: 4, borderRadius: 2, background: '#777' }} />
                <div style={{ width: 4, height: 4, borderRadius: 2, background: '#777' }} />
              </div>
              <div style={{ display: 'flex', gap: 10 }}>
                <div style={{ width: 4, height: 4, borderRadius: 2, background: '#777' }} />
                <div style={{ width: 4, height: 4, borderRadius: 2, background: '#777' }} />
                <div style={{ width: 4, height: 4, borderRadius: 2, background: '#777' }} />
                <div style={{ width: 4, height: 4, borderRadius: 2, background: '#777' }} />
              </div>
            </div>

            {/* Stack labels */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, alignItems: 'center' }}>
              <div
                style={{
                  fontSize: 11, color: '#666', fontFamily: 'monospace',
                  letterSpacing: 2, borderBottom: '1px solid #252525',
                  paddingBottom: 5, width: 92, textAlign: 'center', display: 'flex', justifyContent: 'center',
                }}
              >
                Next.js
              </div>
              <div
                style={{
                  fontSize: 11, color: '#666', fontFamily: 'monospace',
                  letterSpacing: 2, borderBottom: '1px solid #252525',
                  paddingBottom: 5, width: 92, textAlign: 'center', display: 'flex', justifyContent: 'center',
                }}
              >
                TypeScript
              </div>
              <div
                style={{
                  fontSize: 11, color: '#666', fontFamily: 'monospace',
                  letterSpacing: 2, borderBottom: '1px solid #252525',
                  paddingBottom: 5, width: 92, textAlign: 'center', display: 'flex', justifyContent: 'center',
                }}
              >
                Supabase
              </div>
            </div>
          </div>
        </div>

        {/* Bottom border line */}
        <div style={{ display: 'flex', height: 1, background: '#1a1a1a' }} />
      </div>
    ),
    { ...size }
  )
}
