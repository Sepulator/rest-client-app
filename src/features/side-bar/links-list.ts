import { BookOpenIcon } from '@/components/icons/book-open';
import { CodeBracketSquareIcon } from '@/components/icons/code-bracket-square';
import { HomeIcon } from '@/components/icons/home';
import { InboxStackIcon } from '@/components/icons/inbox-stack';
import { ROUTES } from '@/config/routes';

export const links = [
  { href: ROUTES.HOME, title: 'Home', Icon: HomeIcon },
  { href: ROUTES.CLIENT, title: 'REST Client', Icon: CodeBracketSquareIcon },
  { href: ROUTES.HISTORY, title: 'History', Icon: InboxStackIcon },
  { href: ROUTES.VARIABLES, title: 'Variables', Icon: BookOpenIcon },
];
