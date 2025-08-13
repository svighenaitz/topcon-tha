/* eslint-disable */
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { it, expect, vi } from 'vitest';
import ProfileCard from './ProfileCard';

const profile = { id: 'p1', name: 'Taylor', age: 29, bio: 'Bio', photoUrl: 'https://picsum.photos/seed/x/200/300' };

it('renders and triggers like/dislike', () => {
  const onLike = vi.fn();
  const onDislike = vi.fn();
  render(<ProfileCard profile={profile} onLike={onLike} onDislike={onDislike} />);
  screen.getByRole('img', { name: /taylor's photo/i });
  screen.getByRole('button', { name: /^like$/i }).click();
  screen.getByRole('button', { name: /^dislike$/i }).click();
  expect(onLike).toHaveBeenCalledTimes(1);
  expect(onDislike).toHaveBeenCalledTimes(1);
});


