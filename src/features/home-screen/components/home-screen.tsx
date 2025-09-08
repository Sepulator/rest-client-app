import { Divider } from '@heroui/react';

import { Background } from '@/features/home-screen/components/background';
import { FeatureCard } from '@/features/home-screen/components/card';
import { keyFeatures } from '@/features/home-screen/constants/key-features';

export function HomeScreen() {
  const textStyle = 'text-small max-w-200';

  return (
    <div className="relative flex flex-col gap-15">
      <div>
        <h2>What is V-REST?</h2>
        <p className={textStyle}>
          This lightweight alternative to Postman combines essential features in one app, developed in teams of three
          during RS School React course Supports authorization and authentication capabilities. Access to the tool is
          restricted to authorized users only. The history section provides quick access to previously executed requests
        </p>
      </div>

      <Divider />

      <div>
        <h2>New Features</h2>
        <p className={textStyle}>Streamline your API development workflow with our comprehensive REST client tool</p>

        <div className="my-20 flex flex-wrap gap-5">
          {keyFeatures.map((info) => (
            <FeatureCard key={info.title} cardInfo={info} />
          ))}
        </div>
      </div>
      <Background className="pointer-events-none fixed right-[-20%] bottom-0 h-200 w-200" />
    </div>
  );
}
