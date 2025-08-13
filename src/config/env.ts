/* eslint-disable */
export interface AppEnv {
  API_BASE_URL: string | null;
  USE_MOCK_API: boolean;
}

export function readEnv(): AppEnv {
  const viteEnv = (import.meta as any).env ?? {};
  const nodeProcess: any | undefined = typeof process !== 'undefined' ? process : undefined;
  const apiBase = viteEnv.VITE_API_BASE_URL ?? nodeProcess?.env?.VITE_API_BASE_URL ?? null;
  const useMockSource = viteEnv.VITE_USE_MOCK_API ?? nodeProcess?.env?.VITE_USE_MOCK_API ?? 'true';
  const useMock = String(useMockSource).toLowerCase() === 'true';
  return {
    API_BASE_URL: apiBase,
    USE_MOCK_API: useMock,
  };
}

