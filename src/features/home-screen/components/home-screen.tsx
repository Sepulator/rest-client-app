import { Divider } from '@heroui/react';
import { getTranslations } from 'next-intl/server';

import { Background } from '@/features/home-screen/components/background';
import { FeatureCard } from '@/features/home-screen/components/card';

const CARDS_KEYS = ['rest', 'history', 'codeGeneration', 'variables', 'auth', 'lang'] as const;

export async function HomeScreen() {
  const t = await getTranslations('HomePage');
  const textStyle = 'text-small max-w-200';

  return (
    <div className="relative flex flex-col gap-15">
      <div>
        <h2 className="mb-4">{t('intro.title')}</h2>
        <p className={textStyle}>{t('intro.description')} </p>
      </div>

      <Divider />

      <div>
        <h2 className="mb-4">{t('features.title')}</h2>
        <p className={textStyle}>{t('features.description')}</p>

        <div className="my-20 flex flex-wrap gap-5">
          {CARDS_KEYS.map((key) => (
            <FeatureCard
              key={key}
              title={t(`keyFeatures.${key}.title`)}
              icon={t(`keyFeatures.${key}.icon`)}
              description={t(`keyFeatures.${key}.description`)}
            />
          ))}
        </div>
      </div>
      <Background className="pointer-events-none fixed right-[-20%] bottom-0 h-200 w-200" />
    </div>
  );
}
