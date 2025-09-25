import './[locale]/globals.css';
import { RootPagesLayout } from '@/app/[locale]/_components/root-pages-layout';
import { NotFoundComponent } from '@/components/not-found/not-found';

export default function GlobalNotFound() {
  return (
    <html lang="en">
      <RootPagesLayout>
        <NotFoundComponent buttonText="Go Home" title="Page Not Found" description="global non localized" />
      </RootPagesLayout>
    </html>
  );
}
