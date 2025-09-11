import { AuthNav } from '@/components/auth-nav';

export default function AuthLayout({ children }: LayoutProps<'/[locale]'>) {
  return (
    <section className="flex min-h-[90vh] flex-1 flex-col items-center justify-center gap-5 p-6">
      <AuthNav />
      {children}
    </section>
  );
}
