export interface Profile {
  id: string;
  name: string;
  age: number;
  bio: string;
  photoUrl: string;
}

export type LikeDecision = 'like' | 'dislike';

export interface DecideResponse {
  matched: boolean;
}

