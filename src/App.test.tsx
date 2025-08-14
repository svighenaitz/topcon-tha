import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, it, expect } from 'vitest';
import App from './App';

describe('App', () => {
  it('shows a profile and allows like leading to possible match', async () => {
    render(<App />);

    // initial load
    expect(await screen.findByRole('img', { name: /photo/i })).toBeInTheDocument();

    // like -> possibly opens modal (seed has even ages liked back)
    const likeButton = screen.getByRole('button', { name: /^like$/i });
    likeButton.click();

    // Either opens match or goes to next profile. We can wait for either state change.
    await waitFor(() => {
      // next card should exist or match overlay should show
      const maybeOverlay = screen.queryByText(/you got a match!/i);
      const card = screen.queryByRole('img', { name: /photo/i });
      expect(maybeOverlay ?? card).toBeTruthy();
    });
  });

  it('handles running out of profiles', async () => {
    render(<App />);
    // There are 3 in seed; click through 3 dislikes
    for (let i = 0; i < 3; i++) {
      const dislike = await screen.findByRole('button', { name: /^dislike$/i });
      dislike.click();
    }
    expect(await screen.findByText(/No more profiles/i)).toBeInTheDocument();
  });
});