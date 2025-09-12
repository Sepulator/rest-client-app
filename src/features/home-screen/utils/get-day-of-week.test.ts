import { getDayOfWeek } from '@/features/home-screen/utils/get-day-of-week';

const mockDates = [
  { date: '2025-09-10', text: 'Wednesday' },
  { date: '2025-09-11', text: 'Thursday' },
];

describe('getDayOfWeek', () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it('should return correct day of week for en locale', () => {
    vi.useFakeTimers();

    mockDates.forEach(({ date, text }) => {
      vi.setSystemTime(new Date(date));

      expect(getDayOfWeek('en')).toBe(text);
    });
  });
});
