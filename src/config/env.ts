/* eslint-disable */
export interface AppEnv {
  API_BASE_URL: string | null;
  NODE_ENV: string;
  APP_VERSION: string;
  IS_DEVELOPMENT: boolean;
  IS_PRODUCTION: boolean;
}

export function readEnv(): AppEnv {
  const viteEnv = (import.meta as any).env ?? {};
  const nodeProcess: any | undefined = typeof process !== 'undefined' ? process : undefined;
  
  const apiBase = viteEnv.VITE_API_BASE_URL ?? nodeProcess?.env?.VITE_API_BASE_URL ?? null;
  const nodeEnv = viteEnv.NODE_ENV ?? nodeProcess?.env?.NODE_ENV ?? 'development';
  const appVersion = viteEnv.__APP_VERSION__ ?? '1.0.0';
  
  return {
    API_BASE_URL: apiBase,
    NODE_ENV: nodeEnv,
    APP_VERSION: appVersion,
    IS_DEVELOPMENT: nodeEnv === 'development',
    IS_PRODUCTION: nodeEnv === 'production',
  };
}

