import { describe, it, expect } from 'vitest';
import { readEnv } from './env';

describe('readEnv', () => {
  it('should read API_BASE_URL from environment', () => {
    const env = readEnv();
    
    // The actual value depends on the environment, but it should be defined
    expect(env.API_BASE_URL).toBeDefined();
  });

  it('should return an object with API_BASE_URL property', () => {
    const env = readEnv();
    
    expect(env).toHaveProperty('API_BASE_URL');
    expect(typeof env.API_BASE_URL).toBe('string');
  });
});


