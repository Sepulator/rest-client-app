import type { RenderOptions } from '@testing-library/react';
import type { ReactElement } from 'react';

import userEvent from '@testing-library/user-event';

import { renderWithProviders } from './render-with-providers';

export const renderWithUserEvent = (ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) => {
  const rendered = renderWithProviders(ui, options);

  const user = userEvent.setup();

  return {
    ...rendered,
    user,
  };
};
