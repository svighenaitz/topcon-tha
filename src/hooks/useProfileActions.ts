import { useState, useCallback } from 'react';
import type { LikeDecision } from '../types';

interface UseProfileActionsProps {
  onDecide: (decision: LikeDecision, autoLoadNext?: boolean) => Promise<{ matched: boolean }>;
  onLoadNext: () => Promise<void>;
}

export function useProfileActions({ onDecide, onLoadNext }: UseProfileActionsProps) {
  const [isMatch, setIsMatch] = useState(false);

  const handleLike = useCallback(async () => {
    const result = await onDecide('like', false); // Don't auto-load next
    if (result.matched) {
      setIsMatch(true);
    } else {
      await onLoadNext();
    }
  }, [onDecide, onLoadNext]);

  const handleDislike = useCallback(async () => {
    await onDecide('dislike', false); // Don't auto-load next
    await onLoadNext();
  }, [onDecide, onLoadNext]);

  const handleOkay = useCallback(async () => {
    setIsMatch(false);
    await onLoadNext();
  }, [onLoadNext]);

  const resetMatch = useCallback(() => {
    setIsMatch(false);
  }, []);

  return {
    isMatch,
    handleLike,
    handleDislike,
    handleOkay,
    resetMatch
  };
}
