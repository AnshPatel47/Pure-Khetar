'use client';

/** Last-resort boundary: replaces the whole page if the root layout itself fails. */
export default function GlobalError({ reset }: { error: Error; reset: () => void }) {
  return (
    <html lang="en">
      <body style={{ fontFamily: 'system-ui, sans-serif', background: '#FAF6EC', color: '#1F4D2E', textAlign: 'center', padding: '6rem 1rem' }}>
        <h1>Pure Khetar is having a moment</h1>
        <p>Please refresh the page or try again shortly.</p>
        <button onClick={reset} style={{ marginTop: 16, padding: '12px 24px', borderRadius: 999, border: 0, background: '#1F4D2E', color: '#FAF6EC', fontWeight: 700, cursor: 'pointer' }}>
          Try again
        </button>
      </body>
    </html>
  );
}
