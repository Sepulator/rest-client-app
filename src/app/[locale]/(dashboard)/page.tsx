import { getLocale } from 'next-intl/server';

import { Greeting } from '@/features/home-screen/components/greeting';
import { HomeScreen } from '@/features/home-screen/components/home-screen';
import { getDayOfWeek } from '@/utils/get-day-of-week';

export default async function HomePage() {
  const userName = 'Temp User';
  const locale = await getLocale();
  const dayOfWeek = getDayOfWeek(locale);

  return (
    <div className="mr-auto mb-auto flex flex-col gap-8">
      <Greeting userName={userName} dayOfWeek={dayOfWeek} />
      <HomeScreen />
    </div>
  );
}
