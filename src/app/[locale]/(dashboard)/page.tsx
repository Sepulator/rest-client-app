import { getLocale } from 'next-intl/server';

import { Greeting } from '@/features/home-screen/greeting';
import { HomeScreen } from '@/features/home-screen/home-screen';
import { getDayOfWeek } from '@/utils/get-day-of-week';

export default async function HomePage() {
  const locale = await getLocale();
  const dayOfWeek = getDayOfWeek(locale);

  return (
    <div className="mr-auto mb-auto flex flex-col gap-8">
      <Greeting dayOfWeek={dayOfWeek} />
      <HomeScreen />
    </div>
  );
}
