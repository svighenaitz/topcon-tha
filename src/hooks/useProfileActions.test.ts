import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { useProfileActions } from './useProfileActions';
import type { Profile } from '../types';

describe('useProfileActions', () => {
  const mockOnDecide = vi.fn();
  const mockOnLoadNext = vi.fn();
  const mockProfile: Profile = {
    id: '1',
    name: 'John',
    age: 25,
    bio: 'Test bio',
    photoUrl: 'https://example.com/photo.jpg'
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should initialize with isMatch as false', () => {
    const { result } = renderHook(() => 
      useProfileActions({ onDecide: mockOnDecide, onLoadNext: mockOnLoadNext })
    );

    expect(result.current.isMatch).toBe(false);
  });

  it('should handle like with match', async () => {
    mockOnDecide.mockResolvedValue({ matched: true });
    
    const { result } = renderHook(() => 
      useProfileActions({ onDecide: mockOnDecide, onLoadNext: mockOnLoadNext })
    );

    await act(async () => {
      await result.current.handleLike(mockProfile);
    });

    expect(mockOnDecide).toHaveBeenCalledWith('like', false);
    expect(result.current.isMatch).toBe(true);
    expect(mockOnLoadNext).not.toHaveBeenCalled();
  });

  it('should handle like without match', async () => {
    mockOnDecide.mockResolvedValue({ matched: false });
    
    const { result } = renderHook(() => 
      useProfileActions({ onDecide: mockOnDecide, onLoadNext: mockOnLoadNext })
    );

    await act(async () => {
      await result.current.handleLike(mockProfile);
    });

    expect(mockOnDecide).toHaveBeenCalledWith('like', false);
    expect(result.current.isMatch).toBe(false);
    expect(mockOnLoadNext).toHaveBeenCalled();
  });

  it('should handle dislike', async () => {
    const { result } = renderHook(() => 
      useProfileActions({ onDecide: mockOnDecide, onLoadNext: mockOnLoadNext })
    );

    await act(async () => {
      await result.current.handleDislike(mockProfile);
    });

    expect(mockOnDecide).toHaveBeenCalledWith('dislike', false);
    expect(mockOnLoadNext).toHaveBeenCalled();
  });

  it('should handle okay', async () => {
    const { result } = renderHook(() => 
      useProfileActions({ onDecide: mockOnDecide, onLoadNext: mockOnLoadNext })
    );

    // First set match to true
    await act(async () => {
      mockOnDecide.mockResolvedValue({ matched: true });
      await result.current.handleLike(mockProfile);
    });

    expect(result.current.isMatch).toBe(true);

    // Then handle okay
    await act(async () => {
      await result.current.handleOkay();
    });

    expect(result.current.isMatch).toBe(false);
    expect(mockOnLoadNext).toHaveBeenCalled();
  });

  it('should reset match', () => {
    const { result } = renderHook(() => 
      useProfileActions({ onDecide: mockOnDecide, onLoadNext: mockOnLoadNext })
    );

    act(() => {
      result.current.resetMatch();
    });

    expect(result.current.isMatch).toBe(false);
  });

  it('should handle multiple actions correctly', async () => {
    const { result } = renderHook(() => 
      useProfileActions({ onDecide: mockOnDecide, onLoadNext: mockOnLoadNext })
    );

    // Test like with match
    mockOnDecide.mockResolvedValueOnce({ matched: true });
    await act(async () => {
      await result.current.handleLike(mockProfile);
    });
    expect(result.current.isMatch).toBe(true);

    // Test okay
    await act(async () => {
      await result.current.handleOkay();
    });
    expect(result.current.isMatch).toBe(false);

    // Test dislike
    await act(async () => {
      await result.current.handleDislike(mockProfile);
    });
    expect(result.current.isMatch).toBe(false);
  });
});
