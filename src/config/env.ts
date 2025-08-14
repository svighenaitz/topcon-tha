/* eslint-disable */
export interface AppEnv {
  API_BASE_URL: string | null;
}

export function readEnv(): AppEnv {
  const viteEnv = (import.meta as any).env ?? {};
  const nodeProcess: any | undefined = typeof process !== 'undefined' ? process : undefined;
  const apiBase = viteEnv.VITE_API_BASE_URL ?? nodeProcess?.env?.VITE_API_BASE_URL ?? null;
  return {
    API_BASE_URL: apiBase,
  };
}

