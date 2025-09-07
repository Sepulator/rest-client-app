import { Divider } from '@heroui/react';

import { FeatureCard } from '@/features/home-screen/components/card';
import { keyFeatures } from '@/features/home-screen/constants/key-features';

export function HomeScreen() {
  return (
    <div className="flex flex-col gap-20">
      <div>
        <h2 className="mb-7 text-3xl">What is V-REST?</h2>
        <p className="text-foreground-600 max-w-200">
          This lightweight alternative to Postman combines essential features in one app, developed in teams of three
          during RS School React course Supports authorization and authentication capabilities. Access to the tool is
          restricted to authorized users only. The history section provides quick access to previously executed requests
        </p>
      </div>

      <Divider />

      <div>
        <h2 className="mb-5 text-3xl">New Features</h2>
        <p className="text-foreground-500 max-w-200">
          Streamline your API development workflow with our comprehensive REST client tool
        </p>

        <div className="my-20 grid grid-cols-2 gap-5 xl:grid-cols-3">
          {keyFeatures.map((info) => (
            <FeatureCard key={info.title} cardInfo={info} />
          ))}
        </div>
      </div>
    </div>
  );
}
