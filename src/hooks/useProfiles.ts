import { useCallback, useEffect, useMemo, useState } from 'react';
import type { DecideResponse, LikeDecision, Profile } from '../types';
import { createHttpProfileService, createMockProfileService, type ProfileService } from '../services/profileService';
import { readEnv } from '../config/env';

export interface UseProfilesState {
  current: Profile | null;
  isLoading: boolean;
  error: string | null;
  isOutOfProfiles: boolean;
  decide: (decision: LikeDecision) => Promise<DecideResponse>;
  reload: () => Promise<void>;
}

export function useProfiles(customService?: ProfileService): UseProfilesState {
  const env = readEnv();
  const service: ProfileService = useMemo(() => {
    if (customService) return customService;
    if (env.USE_MOCK_API || !env.API_BASE_URL) {
      const seed: Profile[] = [
        { id: '1', name: 'Gianni', age: 28, bio: 'Coffee lover and hiker', photoUrl: 'https://picsum.photos/seed/1/600/800' },
        { id: '2', name: 'Pinotto', age: 30, bio: 'Tech enthusiast and foodie', photoUrl: 'https://picsum.photos/seed/2/600/800' },
        { id: '3', name: 'Lilla', age: 25, bio: 'Traveler and photographer', photoUrl: 'https://picsum.photos/seed/3/600/800' },
      ];
      return createMockProfileService(seed);
    }
    return createHttpProfileService(env.API_BASE_URL);
  }, [customService, env.API_BASE_URL, env.USE_MOCK_API]);

  const [current, setCurrent] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isOutOfProfiles, setIsOutOfProfiles] = useState<boolean>(false);

  const loadNext = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const next = await service.fetchNextProfile();
      setCurrent(next);
      setIsOutOfProfiles(!next);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Unknown error');
    } finally {
      setIsLoading(false);
    }
  }, [service]);

  const decide = useCallback(async (decision: LikeDecision): Promise<DecideResponse> => {
    if (!current) throw new Error('No current profile');
    const res = await service.decide(current.id, decision);
    await loadNext();
    return res;
  }, [current, loadNext, service]);

  const reload = useCallback(async () => {
    service.reset();
    await loadNext();
  }, [loadNext, service]);

  useEffect(() => {
    void loadNext();
  }, [loadNext]);

  return { current, isLoading, error, isOutOfProfiles, decide, reload };
}

