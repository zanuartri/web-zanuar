import { ImageResponse } from 'next/og';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          backgroundColor: '#111113',
          padding: '80px',
          position: 'relative',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: -120,
            right: -120,
            width: 480,
            height: 480,
            borderRadius: '50%',
            backgroundColor: 'rgba(215,255,63,0.15)',
            display: 'flex',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: -160,
            left: -100,
            width: 420,
            height: 420,
            borderRadius: '50%',
            backgroundColor: 'rgba(36,64,255,0.18)',
            display: 'flex',
          }}
        />

        <div style={{ display: 'flex', alignItems: 'center', fontSize: 30 }}>
          <span style={{ color: '#d7ff3f' }}>~/</span>
          <span style={{ color: '#fbfbf7' }}>zanuar</span>
        </div>

        <div
          style={{
            display: 'flex',
            marginTop: 36,
            fontSize: 62,
            fontWeight: 600,
            color: '#fbfbf7',
            maxWidth: 980,
            lineHeight: 1.15,
          }}
        >
          I build agents that act, not just chat.
        </div>

        <div style={{ display: 'flex', gap: 12, marginTop: 40 }}>
          {['LangGraph', 'LangChain', 'RAG'].map((tag) => (
            <div
              key={tag}
              style={{
                display: 'flex',
                border: '2px solid #fbfbf7',
                borderRadius: 8,
                padding: '8px 18px',
                color: '#fbfbf7',
                fontSize: 22,
              }}
            >
              {tag}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  );
}
