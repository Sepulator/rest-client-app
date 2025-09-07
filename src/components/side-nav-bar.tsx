import { Button } from '@heroui/react';

import { ROUTES } from '@/config/routes';
import { Link } from '@/i18n/navigation';

const navBarLink = [
  { href: ROUTES.CLIENT, title: 'REST Client' },
  { href: ROUTES.HISTORY, title: 'History' },
  { href: ROUTES.VARIABLES, title: 'Variables' },
];

type SideNavBarProps = {
  tempLogout: () => void;
};

export function SideNavBar({ tempLogout }: SideNavBarProps) {
  return (
    <div className="sticky top-0 flex max-h-screen w-70 flex-col justify-center gap-5 p-10">
      {navBarLink.map((link) => (
        <Link href={link.href} key={link.title}>
          {link.title}
        </Link>
      ))}
      <Button onPress={tempLogout}>Temp Logout remove later</Button>
    </div>
  );
}
