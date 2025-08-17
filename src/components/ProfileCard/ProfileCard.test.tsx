 
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { it, expect, vi, describe } from 'vitest';
import ProfileCard from './ProfileCard';

const profile = { id: 'p1', name: 'Taylor', age: 29, bio: 'Bio', photoUrl: 'https://picsum.photos/seed/x/200/300' };

describe('ProfileCard', () => {
  it('renders and triggers like/dislike', () => {
    const onLike = vi.fn();
    const onDislike = vi.fn();
    const onOkay = vi.fn();
    render(<ProfileCard profile={profile} onLike={onLike} onDislike={onDislike} onOkay={onOkay} />);
    screen.getByRole('img', { name: /taylor's$/i });
    screen.getByRole('button', { name: /^like$/i }).click();
    screen.getByRole('button', { name: /^dislike$/i }).click();
    expect(onLike).toHaveBeenCalledTimes(1);
    expect(onDislike).toHaveBeenCalledTimes(1);
    expect(onOkay).not.toHaveBeenCalled();
  });

  it('shows overlay and changes button text when there is a match', () => {
    const onLike = vi.fn();
    const onDislike = vi.fn();
    const onOkay = vi.fn();
    render(<ProfileCard profile={profile} onLike={onLike} onDislike={onDislike} onOkay={onOkay} isMatch={true} />);
    
    // Check that the overlay text is displayed
    expect(screen.getByText('It\'s a match!')).toBeInTheDocument();
    
    // Check that the Like button now says "Okay"
    expect(screen.getByRole('button', { name: /^okay$/i })).toBeInTheDocument();
    
    // Check that the Dislike button is still there
    expect(screen.getByRole('button', { name: /^dislike$/i })).toBeInTheDocument();
  });

  it('calls onOkay instead of onLike when there is a match', () => {
    const onLike = vi.fn();
    const onDislike = vi.fn();
    const onOkay = vi.fn();
    render(<ProfileCard profile={profile} onLike={onLike} onDislike={onDislike} onOkay={onOkay} isMatch={true} />);
    
    // Click the Okay button
    screen.getByRole('button', { name: /^okay$/i }).click();
    
    // Should call onOkay, not onLike
    expect(onOkay).toHaveBeenCalledTimes(1);
    expect(onLike).not.toHaveBeenCalled();
  });

  it('does not show overlay when there is no match', () => {
    const onLike = vi.fn();
    const onDislike = vi.fn();
    const onOkay = vi.fn();
    render(<ProfileCard profile={profile} onLike={onLike} onDislike={onDislike} onOkay={onOkay} isMatch={false} />);
    
    // Check that the overlay text is not displayed
    expect(screen.queryByText('It\'s a match!')).not.toBeInTheDocument();
    
    // Check that the Like button says "Like"
    expect(screen.getByRole('button', { name: /^like$/i })).toBeInTheDocument();
  });
});


