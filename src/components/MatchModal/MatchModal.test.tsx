/* eslint-disable */
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { it, expect, vi } from 'vitest';
import MatchModal from './MatchModal';

it('opens and closes', () => {
  const onClose = vi.fn();
  const { rerender } = render(<MatchModal open={false} onClose={onClose} />);
  expect(screen.queryByText(/it's a match!/i)).not.toBeInTheDocument();
  rerender(<MatchModal open onClose={onClose} />);
  screen.getByText(/it's a match!/i);
  screen.getByRole('button', { name: /close/i }).click();
  expect(onClose).toHaveBeenCalledTimes(1);
});


