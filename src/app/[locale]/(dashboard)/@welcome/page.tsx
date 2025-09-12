import { Greeting } from '@/features/home-screen/greeting';
import { HomeScreen } from '@/features/home-screen/home-screen';

export default function WelcomePage() {
  return (
    <section className="mx-auto flex h-full flex-1 flex-col justify-center gap-20 p-8">
      <Greeting />
      <HomeScreen />
    </section>
  );
}
