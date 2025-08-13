/* eslint-disable */

import { renderHook, act } from '@testing-library/react';
import { it, expect } from 'vitest';
import { useProfiles } from './useProfiles';
import type { ProfileService } from '../services/profileService';

const mockService = (profiles: ({ id: string } & Record<string, any>)[]): ProfileService => {
  const queue = [...profiles] as any[];
  return {
    async fetchNextProfile() { return queue.shift() ?? null; },
    async decide() { return { matched: true }; },
    reset() { /* no-op for test */ },
  };
};

it('loads and decides', async () => {
  const service = mockService([{ id: 'a' }]);
  const { result } = renderHook(() => useProfiles(service));
  await act(async () => {});
  expect(result.current.current?.id).toBe('a');
  await act(async () => { await result.current.decide('like'); });
  expect(result.current.current).toBeNull();
  expect(result.current.isOutOfProfiles).toBe(true);
});

it('handles errors', async () => {
  const badService: ProfileService = {
    async fetchNextProfile() { throw new Error('boom'); },
    async decide() { return { matched: false }; },
    reset() { /* no-op for test */ },
  };
  const { result } = renderHook(() => useProfiles(badService));
  await act(async () => {});
  expect(result.current.error).toMatch(/boom/);
});


