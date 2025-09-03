import { Link } from '@/i18n/navigation';
import React from 'react';

export function AuthNav() {
  return (
    <div className="flex gap-5">
      <Link href="/login">Sign In</Link>
      <Link href="/sign-up">Sign Up</Link>
    </div>
  );
}
