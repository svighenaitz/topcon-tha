 
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { it, expect, vi } from 'vitest';
import ErrorDisplay from './ErrorDisplay';

it('renders error and retries', () => {
  const onRetry = vi.fn();
  render(<ErrorDisplay message="Oops" onRetry={onRetry} />);
  screen.getByRole('alert');
  screen.getByRole('button', { name: /retry/i }).click();
  expect(onRetry).toHaveBeenCalledTimes(1);
});


