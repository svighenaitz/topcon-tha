import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, it, expect } from 'vitest';
import ProfileCardContainer from './ProfileCardContainer';

describe('ProfileCardContainer', () => {
  it('renders with injected content correctly', () => {
    const mediaContent = <div data-testid="media-content">Media</div>;
    const actionsContent = <button data-testid="action-button">Action</button>;
    const children = <div data-testid="card-content">Content</div>;

    render(
      <ProfileCardContainer
        mediaContent={mediaContent}
        actionsContent={actionsContent}
        ariaLabel="test-card"
      >
        {children}
      </ProfileCardContainer>
    );

    // Check that the container is rendered
    expect(screen.getByLabelText('test-card')).toBeInTheDocument();
    
    // Check that all injected content is present
    expect(screen.getByTestId('media-content')).toBeInTheDocument();
    expect(screen.getByTestId('action-button')).toBeInTheDocument();
    expect(screen.getByTestId('card-content')).toBeInTheDocument();
  });

  it('uses default aria-label when none provided', () => {
    const mediaContent = <div>Media</div>;
    const actionsContent = <button>Action</button>;

    render(
      <ProfileCardContainer
        mediaContent={mediaContent}
        actionsContent={actionsContent}
      >
        <div>Content</div>
      </ProfileCardContainer>
    );

    expect(screen.getByLabelText('profile-card')).toBeInTheDocument();
  });
});
