import { ROUTES } from '@/config/routes';
import { Link } from '@/i18n/navigation';

export function AuthNav() {
  return (
    <div className="flex gap-5">
      <Link href={ROUTES.LOGIN}>Sign In</Link>
      <Link href={ROUTES.SIGN_UP}>Sign Up</Link>
    </div>
  );
}
