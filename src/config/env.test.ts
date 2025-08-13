import { describe, expect, it } from 'vitest';
import { readEnv } from './env';

describe('readEnv', () => {
  it('reads defaults when none provided', () => {
    const env = readEnv();
    expect(env.USE_MOCK_API).toBe(true);
  });

  it('respects provided values', () => {
    process.env.VITE_API_BASE_URL = 'https://api.example.com';
    process.env.VITE_USE_MOCK_API = 'false';
    const env = readEnv();
    expect(env.API_BASE_URL).toBe('https://api.example.com');
    expect(env.USE_MOCK_API).toBe(false);
  });
});


