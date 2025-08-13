/* eslint-disable */
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { it, expect } from 'vitest';
import LoadingSpinner from './LoadingSpinner';

it('renders spinner', () => {
  render(<LoadingSpinner />);
  expect(screen.getByLabelText(/loading/i)).toBeInTheDocument();
});


