import { Button, cn } from '@heroui/react';

import { BookOpenIcon } from '@/components/icons/book-open';
import { ChevronIcon } from '@/components/icons/chevron';
import { CodeBracketSquareIcon } from '@/components/icons/code-bracket-square';
import { HomeIcon } from '@/components/icons/home';
import { InboxStackIcon } from '@/components/icons/inbox-stack';
import { ROUTES } from '@/config/routes';
import { Link, usePathname } from '@/i18n/navigation';

const navBarLink = [
  { href: ROUTES.HOME, title: 'Home', Icon: HomeIcon },
  { href: ROUTES.CLIENT, title: 'REST Client', Icon: CodeBracketSquareIcon },
  { href: ROUTES.HISTORY, title: 'History', Icon: InboxStackIcon },
  { href: ROUTES.VARIABLES, title: 'Variables', Icon: BookOpenIcon },
];

type SideNavBarProps = {
  tempLogout: () => void;
};

export function SideNavBar({ tempLogout }: SideNavBarProps) {
  const pathname = usePathname();

  return (
    <div className="sticky top-20 flex max-h-screen w-80 flex-col justify-center gap-3 p-10">
      <Button isIconOnly variant="light" className="absolute top-1 right-5">
        <ChevronIcon className="text-xl" />
      </Button>

      {navBarLink.map(({ href, title, Icon }) => {
        const isActive = pathname === href;

        return (
          <Link
            href={href}
            key={title}
            className={cn(
              'flex gap-6 rounded-lg border-l-4 border-gray-700 px-5 py-3 transition-all duration-200 hover:bg-gray-900/50',
              isActive ? 'border-primary opacity-100' : 'opacity-70'
            )}
          >
            <Icon className={cn('text-2xl', isActive && 'text-primary-500')} />
            {title}
          </Link>
        );
      })}
      <Button className="mt-7" onPress={tempLogout}>
        Temp Logout remove later
      </Button>
    </div>
  );
}
