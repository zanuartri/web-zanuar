import { ImageResponse } from 'next/og';

export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#d7ff3f',
        }}
      >
        <svg width="100" height="100" viewBox="0 0 32 32">
          <path
            d="M10 9 L18 16 L10 23"
            stroke="#000000"
            strokeWidth={3.2}
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <rect x="21" y="20" width="6" height="3.2" fill="#000000" />
        </svg>
      </div>
    ),
    { ...size }
  );
}
