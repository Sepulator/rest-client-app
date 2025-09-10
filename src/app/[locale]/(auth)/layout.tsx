import { AuthNav } from '@/components/auth-nav';

export default function AuthLayout({ children }: LayoutProps<'/[locale]'>) {
  return (
    <section className="flex w-full flex-1 flex-col items-center justify-center gap-5">
      <AuthNav />
      {children}
    </section>
  );
}
