import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, it, expect, vi } from 'vitest';
import ProfileView from './ProfileView';
import type { Profile } from '../../types';

// Mock the custom hook
vi.mock('../../hooks/useProfileActions', () => ({
  useProfileActions: vi.fn(() => ({
    isMatch: false,
    handleLike: vi.fn(),
    handleDislike: vi.fn(),
    handleOkay: vi.fn(),
    resetMatch: vi.fn(),
  })),
}));

const mockProfile: Profile = {
  id: '1',
  name: 'John',
  age: 25,
  bio: 'Test bio',
  photoUrl: 'https://example.com/photo.jpg'
};

describe('ProfileView', () => {
  it('should show skeleton when loading', () => {
    render(
      <ProfileView
        current={null}
        isLoading={true}
        isOutOfProfiles={false}
        error={null}
        onDecide={vi.fn()}
        onLoadNext={vi.fn()}
        onReload={vi.fn()}
      />
    );

    expect(screen.getByLabelText('profile-skeleton')).toBeInTheDocument();
  });

  it('should show error when there is an error', () => {
    const onReload = vi.fn();
    render(
      <ProfileView
        current={null}
        isLoading={false}
        isOutOfProfiles={false}
        error="Test error message"
        onDecide={vi.fn()}
        onLoadNext={vi.fn()}
        onReload={onReload}
      />
    );

    expect(screen.getByText('Test error message')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /retry/i })).toBeInTheDocument();
  });

  it('should show no more profiles message when out of profiles', () => {
    const onReload = vi.fn();
    render(
      <ProfileView
        current={null}
        isLoading={false}
        isOutOfProfiles={true}
        error={null}
        onDecide={vi.fn()}
        onLoadNext={vi.fn()}
        onReload={onReload}
      />
    );

    expect(screen.getByText(/No more profiles/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /reload/i })).toBeInTheDocument();
  });

  it('should show skeleton when no current profile and not loading', () => {
    render(
      <ProfileView
        current={null}
        isLoading={false}
        isOutOfProfiles={false}
        error={null}
        onDecide={vi.fn()}
        onLoadNext={vi.fn()}
        onReload={vi.fn()}
      />
    );

    expect(screen.getByLabelText('profile-skeleton')).toBeInTheDocument();
  });

  it('should show profile card when there is a current profile', async () => {
    render(
      <ProfileView
        current={mockProfile}
        isLoading={false}
        isOutOfProfiles={false}
        error={null}
        onDecide={vi.fn()}
        onLoadNext={vi.fn()}
        onReload={vi.fn()}
      />
    );

    expect(screen.getByLabelText('profile-1')).toBeInTheDocument();
    expect(screen.getByText('John, 25')).toBeInTheDocument();
    expect(screen.getByText('Test bio')).toBeInTheDocument();
  });
});
