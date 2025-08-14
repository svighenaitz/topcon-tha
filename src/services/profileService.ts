/* eslint-disable */
import type { DecideResponse, LikeDecision, Profile } from '../types';

export interface ProfileService {
  fetchNextProfile(): Promise<Profile | null>;
  decide(profileId: string, decision: LikeDecision): Promise<DecideResponse>;
  reset(): Promise<void>;
}

export class HttpProfileService implements ProfileService {
  private readonly baseUrl: string;
  constructor(baseUrl: string) { this.baseUrl = baseUrl.replace(/\/$/, ''); }
  async fetchNextProfile(): Promise<Profile | null> {
    const res = await fetch(`${this.baseUrl}/profiles/next`, { method: 'GET' });
    if (!res.ok) throw new Error(`Failed to fetch next profile: ${res.status}`);
    if (res.status === 204) return null;
    const data = (await res.json()) as Profile | null;
    return data ?? null;
  }
  async decide(profileId: string, decision: LikeDecision): Promise<DecideResponse> {
    const res = await fetch(`${this.baseUrl}/profiles/${encodeURIComponent(profileId)}/decide`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ decision }),
    });
    if (!res.ok) throw new Error(`Failed to decide: ${res.status}`);
    const data = (await res.json()) as DecideResponse; return data;
  }
  async reset(): Promise<void> {
    const res = await fetch(`${this.baseUrl}/profiles/reset`, { method: 'POST' });
    if (!res.ok) throw new Error(`Failed to reset profiles: ${res.status}`);
  }
}

export function createHttpProfileService(baseUrl: string): ProfileService {
  return new HttpProfileService(baseUrl);
}

const defaultExport = {
  HttpProfileService,
  createHttpProfileService,
};

export default defaultExport;

