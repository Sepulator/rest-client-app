import { describe, it, expect } from 'vitest';

import { useStrength } from './use-strength';

describe('useStrength', () => {
  it('should return the correct strength', () => {
    const { label, color } = useStrength({ passwordStrength: 0 });

    expect(label).toBe('Empty');
    expect(color).toBe('danger');
  });
});
