'use client';

export default function GlobalError() {
  return (
    <html lang="en">
      <body>
        <h2>Something went wrong!</h2>
        <button
          type="button"
          onClick={() => {
            window.location.reload();
          }}
        >
          Refresh
        </button>
      </body>
    </html>
  );
}
