import { BookOpenIcon } from '@/components/icons/book-open';
import { CodeBracketSquareIcon } from '@/components/icons/code-bracket-square';
import { HomeIcon } from '@/components/icons/home';
import { InboxStackIcon } from '@/components/icons/inbox-stack';
import { ROUTES } from '@/config/routes';

export const links = [
  { href: ROUTES.HOME, key: 'home', Icon: HomeIcon },
  { href: ROUTES.CLIENT, key: 'client', Icon: CodeBracketSquareIcon },
  { href: ROUTES.HISTORY, key: 'history', Icon: InboxStackIcon },
  { href: ROUTES.VARIABLES, key: 'variables', Icon: BookOpenIcon },
] as const;
