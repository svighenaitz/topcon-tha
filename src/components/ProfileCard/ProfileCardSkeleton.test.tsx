import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, it, expect } from 'vitest';
import ProfileCardSkeleton from './ProfileCardSkeleton';

describe('ProfileCardSkeleton', () => {
  it('renders skeleton elements correctly', () => {
    render(<ProfileCardSkeleton />);
    
    // Check that the skeleton card is rendered
    expect(screen.getByLabelText('profile-skeleton')).toBeInTheDocument();
    
    // Check that skeleton text elements are present
    const skeletonTexts = screen.getAllByRole('generic');
    expect(skeletonTexts.length).toBeGreaterThan(0);
  });
});
