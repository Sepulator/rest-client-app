import type { RenderOptions } from '@testing-library/react';
import type { PropsWithChildren, ReactElement } from 'react';

import { render } from '@testing-library/react';

import type { ProvidersProps } from '@/app/[locale]/providers';

import { TestProviders } from '@/testing/mocks/providers';
import { mockUserData } from '@/testing/mocks/user';
import { IntlProvider } from '@/testing/utils/intl-provider';

type RequiredProviderProps = Omit<ProvidersProps, 'children'>;
type MockProviderProps = Partial<RequiredProviderProps>;

export type ExtendedOptions = Omit<RenderOptions, 'wrapper'> & { providerOptions?: MockProviderProps };

export const renderWithProviders = (ui: ReactElement, options?: ExtendedOptions): ReturnType<typeof render> => {
  const wrapper = ({ children }: PropsWithChildren) => (
    <IntlProvider>
      <TestProviders value={mockUserData} {...options?.providerOptions}>
        {children}
      </TestProviders>
    </IntlProvider>
  );

  return render(ui, { wrapper, ...options });
};
