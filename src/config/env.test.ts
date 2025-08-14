import { describe, expect, it } from 'vitest';
import { readEnv } from './env';

describe('env', () => {
  it('should read API_BASE_URL from environment', () => {
    const env = readEnv();
    expect(env.API_BASE_URL).toBeDefined();
  });
});


