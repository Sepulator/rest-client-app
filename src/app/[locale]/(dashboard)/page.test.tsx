import { render, screen } from '@testing-library/react';

import HomePage from './page';

vi.mock('next-intl/server', () => ({
  getLocale: vi.fn(() => Promise.resolve('en')),
}));

vi.mock('@/features/home-screen/utils/get-day-of-week', () => ({
  getDayOfWeek: vi.fn((_locale: string) => 'Monday'),
}));

vi.mock('@/features/home-screen/greeting', () => ({
  Greeting: ({ dayOfWeek }: { dayOfWeek: string }) => <div data-testid="greeting">Hello, today is {dayOfWeek}</div>,
}));

vi.mock('@/features/home-screen/home-screen', () => ({
  HomeScreen: () => <div data-testid="home-screen">Home Screen Content</div>,
}));

describe('HomePage', () => {
  it('renders Greeting component with day of week', async () => {
    render(await HomePage());

    const greeting = screen.getByTestId('greeting');

    expect(greeting).toBeInTheDocument();
    expect(greeting).toHaveTextContent('Hello, today is Monday');
  });

  it('renders HomeScreen component', async () => {
    render(await HomePage());

    const homeScreen = screen.getByTestId('home-screen');

    expect(homeScreen).toBeInTheDocument();
    expect(homeScreen).toHaveTextContent('Home Screen Content');
  });
});
