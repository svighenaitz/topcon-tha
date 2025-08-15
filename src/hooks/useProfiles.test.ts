/* eslint-disable */

import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useProfiles } from './useProfiles';
import type { ProfileService } from '../services/profileService';

// Mock the environment
vi.mock('../config/env', () => ({
  readEnv: vi.fn(() => ({ API_BASE_URL: 'http://localhost:3001' }))
}));

// Mock the profile service
const mockService = {
  fetchNextProfile: vi.fn(),
  decide: vi.fn(),
  reset: vi.fn(),
} as unknown as ProfileService;

vi.mock('../services/profileService', () => ({
  createHttpProfileService: vi.fn(() => mockService),
}));

describe('useProfiles', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should load next profile successfully', async () => {
    const mockProfile = { id: '1', name: 'John', age: 25, bio: 'Test', photoUrl: 'test.jpg' };
    (mockService.fetchNextProfile as any).mockResolvedValue(mockProfile);

    const { result } = renderHook(() => useProfiles());

    await act(async () => {
      await result.current.loadNext();
    });

    expect(result.current.current).toEqual(mockProfile);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBe(null);
    expect(result.current.isOutOfProfiles).toBe(false);
  });

  it('should handle no more profiles', async () => {
    (mockService.fetchNextProfile as any).mockResolvedValue(null);

    const { result } = renderHook(() => useProfiles());

    await act(async () => {
      await result.current.loadNext();
    });

    expect(result.current.current).toBe(null);
    expect(result.current.isOutOfProfiles).toBe(true);
  });

  it('should handle fetch error', async () => {
    const errorMessage = 'Network error';
    (mockService.fetchNextProfile as any).mockRejectedValue(new Error(errorMessage));

    const { result } = renderHook(() => useProfiles());

    await act(async () => {
      await result.current.loadNext();
    });

    expect(result.current.error).toBe(errorMessage);
    expect(result.current.isLoading).toBe(false);
  });

  it('should handle decide successfully', async () => {
    const mockProfile = { id: '1', name: 'John', age: 25, bio: 'Test', photoUrl: 'test.jpg' };
    (mockService.fetchNextProfile as any).mockResolvedValue(mockProfile);
    (mockService.decide as any).mockResolvedValue({ matched: true });

    const { result } = renderHook(() => useProfiles());

    // First load a profile
    await act(async () => {
      await result.current.loadNext();
    });

    // Then decide
    await act(async () => {
      const response = await result.current.decide('like', false);
      expect(response).toEqual({ matched: true });
    });

    expect(mockService.decide).toHaveBeenCalledWith('1', 'like');
  });

  it('should handle decide error', async () => {
    const mockProfile = { id: '1', name: 'John', age: 25, bio: 'Test', photoUrl: 'test.jpg' };
    (mockService.fetchNextProfile as any).mockResolvedValue(mockProfile);
    (mockService.decide as any).mockRejectedValue(new Error('Decide error'));

    const { result } = renderHook(() => useProfiles());

    // First load a profile
    await act(async () => {
      await result.current.loadNext();
    });

    // Then decide (should throw error)
    await act(async () => {
      await expect(result.current.decide('like', false)).rejects.toThrow('Decide error');
    });
  });

  it('should handle reload', async () => {
    const mockProfile = { id: '1', name: 'John', age: 25, bio: 'Test', photoUrl: 'test.jpg' };
    (mockService.reset as any).mockResolvedValue(undefined);
    (mockService.fetchNextProfile as any).mockResolvedValue(mockProfile);

    const { result } = renderHook(() => useProfiles());

    await act(async () => {
      await result.current.reload();
    });

    expect(mockService.reset).toHaveBeenCalled();
    expect(result.current.current).toEqual(mockProfile);
  });

  it('should use custom service when provided', () => {
    const customService: ProfileService = {
      fetchNextProfile: vi.fn(),
      decide: vi.fn(),
      reset: vi.fn(),
    };

    renderHook(() => useProfiles(customService));

    // The hook should use the custom service instead of creating a new one
    expect(mockService.fetchNextProfile).not.toHaveBeenCalled();
  });
});


