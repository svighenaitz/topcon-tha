import { useCallback, useEffect, useMemo, useState } from 'react';
import type { DecideResponse, LikeDecision, Profile } from '../types';
import { createHttpProfileService, type ProfileService } from '../services/profileService';
import { readEnv } from '../config/env';

export interface UseProfilesState {
  current: Profile | null;
  isLoading: boolean;
  error: string | null;
  isOutOfProfiles: boolean;
  decide: (decision: LikeDecision, autoLoadNext?: boolean) => Promise<DecideResponse>;
  reload: () => Promise<void>;
  loadNext: () => Promise<void>;
}

export function useProfiles(customService?: ProfileService): UseProfilesState {
  const env = readEnv();
  const service: ProfileService = useMemo(() => {
    if (customService) return customService;
    if (!env.API_BASE_URL) {
      throw new Error('API_BASE_URL is required but not provided');
    }
    return createHttpProfileService(env.API_BASE_URL);
  }, [customService, env.API_BASE_URL]);

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

  const decide = useCallback(async (decision: LikeDecision, autoLoadNext: boolean = true): Promise<DecideResponse> => {
    if (!current) throw new Error('No current profile');
    const res = await service.decide(current.id, decision);
    if (autoLoadNext) {
      await loadNext();
    }
    return res;
  }, [current, loadNext, service]);

  const reload = useCallback(async () => {
    await service.reset();
    await loadNext();
  }, [loadNext, service]);

  useEffect(() => {
    void loadNext();
  }, [loadNext]);

  return { current, isLoading, error, isOutOfProfiles, decide, reload, loadNext };
}

