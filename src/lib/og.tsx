import { ImageResponse } from 'next/og';

/** Shared 1200×630 social card (Open Graph / X / LinkedIn / WhatsApp previews). */
export const ogSize = { width: 1200, height: 630 };
export const ogContentType = 'image/png';

const LOGO =
  'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHZpZXdCb3g9IjAgMCA1NiA1NiI+PHJlY3QgZmlsbD0iIzE1MTUxNSIgaGVpZ2h0PSI1NiIgcng9IjEyIiB3aWR0aD0iNTYiLz48cGF0aCBkPSJNMTIgMTJoMTBsNCA0djlsLTQgNEgxMlYxMloiIGZpbGw9IiNGN0YxRTciLz48cGF0aCBkPSJNMTYgMTZoNWwxLjUgMS41djVMMjEgMjRoLTV2LThaIiBmaWxsPSIjMTUxNTE1Ii8+PHBhdGggZD0iTTEyIDMxaDVsMTAgMTNoLTZMMTIgMzV2LTRaIiBmaWxsPSIjRkY0RDA4Ii8+PHBhdGggZD0iTTMwIDEyaDV2MTJoN1YxMmg1djMyaC01VjMwaC03djE0aC01VjEyWiIgZmlsbD0iI0Y3RjFFNyIvPjxwYXRoIGQ9Im00OCAxOCAzLjUgMy41LTMuNSAzLjUtMy41LTMuNUw0OCAxOFoiIGZpbGw9IiNGRkNCM0QiLz48cGF0aCBkPSJtNDggMzEgMy41IDMuNS0zLjUgMy41LTMuNS0zLjVMNDggMzFaIiBmaWxsPSIjRkY0RDA4Ii8+PC9zdmc+Cg==';

const pills = ['Web apps', 'E-commerce', 'AWS cloud', 'AI automation'];

export function renderOgImage({ eyebrow, title }: { eyebrow: string; title: string }) {
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '64px 72px',
        background: '#111113',
        backgroundImage:
          'radial-gradient(circle at 85% 15%, rgba(255,106,43,0.55), transparent 45%), radial-gradient(circle at 70% 95%, rgba(122,162,255,0.35), transparent 40%)',
        color: '#fafaf7',
        fontFamily: 'sans-serif',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={LOGO} width={64} height={64} alt="" />
        <div style={{ display: 'flex', fontSize: 34, fontWeight: 700 }}>
          RevHack&nbsp;<span style={{ color: '#ff6a2b' }}>AI</span>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
        <div
          style={{
            display: 'flex',
            fontSize: 24,
            letterSpacing: 4,
            textTransform: 'uppercase',
            color: '#ff8a57',
          }}
        >
          {eyebrow}
        </div>
        <div
          style={{
            display: 'flex',
            fontSize: 66,
            fontWeight: 800,
            lineHeight: 1.08,
            letterSpacing: -2,
            maxWidth: 1000,
          }}
        >
          {title}
        </div>
      </div>

      <div style={{ display: 'flex', gap: 14 }}>
        {pills.map((pill) => (
          <div
            key={pill}
            style={{
              display: 'flex',
              padding: '10px 22px',
              borderRadius: 999,
              border: '2px solid rgba(250,250,247,0.25)',
              fontSize: 24,
              color: '#e8e8ea',
            }}
          >
            {pill}
          </div>
        ))}
      </div>
    </div>,
    ogSize,
  );
}
