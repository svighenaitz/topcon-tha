import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, it, expect, vi } from 'vitest';
import App from './App';

// Mock the profile service
vi.mock('./hooks/useProfiles', () => ({
  useProfiles: vi.fn(),
}));

describe('App', () => {
  it('shows a profile and allows like leading to possible match', async () => {
    const mockUseProfiles = vi.fn().mockReturnValue({
      current: {
        id: '1',
        name: 'Gianni',
        age: 28,
        bio: 'Coffee lover and hiker',
        photoUrl: 'https://picsum.photos/seed/1/600/800?webp'
      },
      isLoading: false,
      isOutOfProfiles: false,
      error: null,
      decide: vi.fn().mockResolvedValue({ matched: false }),
      reload: vi.fn(),
      loadNext: vi.fn(),
    });

    const { useProfiles } = await import('./hooks/useProfiles');
    vi.mocked(useProfiles).mockImplementation(mockUseProfiles);

    render(<App />);

    // initial load
    expect(await screen.findByRole('img', { name: /photo/i })).toBeInTheDocument();

    // like -> possibly opens modal
    const likeButton = screen.getByRole('button', { name: /^like$/i });
    likeButton.click();

    // Wait for the next profile to load
    await waitFor(() => {
      expect(mockUseProfiles().loadNext).toHaveBeenCalled();
    });
  });

  it('handles running out of profiles', async () => {
    const mockUseProfiles = vi.fn().mockReturnValue({
      current: null,
      isLoading: false,
      isOutOfProfiles: true,
      error: null,
      decide: vi.fn(),
      reload: vi.fn(),
      loadNext: vi.fn(),
    });

    const { useProfiles } = await import('./hooks/useProfiles');
    vi.mocked(useProfiles).mockImplementation(mockUseProfiles);

    render(<App />);
    
    expect(screen.getByText(/No more profiles/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /reload/i })).toBeInTheDocument();
  });

  it('shows error when API is not available', async () => {
    const mockUseProfiles = vi.fn().mockReturnValue({
      current: null,
      isLoading: false,
      isOutOfProfiles: false,
      error: 'API_BASE_URL is required but not provided',
      decide: vi.fn(),
      reload: vi.fn(),
      loadNext: vi.fn(),
    });

    const { useProfiles } = await import('./hooks/useProfiles');
    vi.mocked(useProfiles).mockImplementation(mockUseProfiles);

    render(<App />);
    
    expect(screen.getByText(/API_BASE_URL is required/i)).toBeInTheDocument();
  });
});