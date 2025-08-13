/* eslint-disable */
import type { DecideResponse, LikeDecision, Profile } from '../types';

export interface ProfileService {
  fetchNextProfile(): Promise<Profile | null>;
  decide(profileId: string, decision: LikeDecision): Promise<DecideResponse>;
  reset(): void;
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
  // No-op for HTTP service; server controls state
  reset(): void { /* intentionally empty */ }
}

export class MockProfileService implements ProfileService {
  private readonly seed: Profile[];
  private readonly likesFromThem: Set<string>;
  private currentIndex: number;
  constructor(seedProfiles?: Profile[]) {
    this.seed = [...(seedProfiles ?? [])];
    this.currentIndex = 0;
    this.likesFromThem = new Set(this.seed.filter((p) => Number(p.age) % 2 === 0).map((p) => p.id));
  }
  async fetchNextProfile(): Promise<Profile | null> {
    if (this.currentIndex >= this.seed.length) return null;
    return this.seed[this.currentIndex] ?? null;
  }
  async decide(profileId: string, decision: LikeDecision): Promise<DecideResponse> {
    const matched = decision === 'like' && this.likesFromThem.has(profileId);
    // Advance to next profile after a decision is made
    this.currentIndex = Math.min(this.currentIndex + 1, this.seed.length);
    return { matched };
  }
  reset(): void {
    this.currentIndex = 0;
  }
}

export function createHttpProfileService(baseUrl: string): ProfileService {
  return new HttpProfileService(baseUrl);
}

export function createMockProfileService(seedProfiles?: Profile[]): ProfileService {
  return new MockProfileService(seedProfiles);
}

const defaultExport = {
  HttpProfileService,
  MockProfileService,
  createHttpProfileService,
  createMockProfileService,
};

export default defaultExport;

