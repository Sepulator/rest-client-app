'use client';

import Error from 'next/error';

const NOT_FOUND_CODE = 404;

export default function NotFound() {
  return (
    <html lang="en">
      <body>
        <Error statusCode={NOT_FOUND_CODE} />
      </body>
    </html>
  );
}
