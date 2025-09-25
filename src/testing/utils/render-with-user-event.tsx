import type { ReactElement } from 'react';

import userEvent from '@testing-library/user-event';

import type { ExtendedOptions } from './render-with-providers';

import { renderWithProviders } from './render-with-providers';

export const renderWithUserEvent = (ui: ReactElement, options?: ExtendedOptions) => {
  const rendered = renderWithProviders(ui, options);

  const user = userEvent.setup();

  return {
    ...rendered,
    user,
  };
};
