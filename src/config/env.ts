
export interface AppEnv {
  API_BASE_URL: string;
}

interface ImportMetaEnv {
  VITE_API_BASE_URL?: string;
}

export function readEnv(): AppEnv {
  const viteEnv = (import.meta as unknown as { env: ImportMetaEnv }).env ?? {};
  const nodeProcess = typeof process !== 'undefined' ? process : undefined;
  
  const apiBase = viteEnv.VITE_API_BASE_URL ?? nodeProcess?.env?.VITE_API_BASE_URL;
  
  if (!apiBase) {
    throw new Error('VITE_API_BASE_URL is required but not provided');
  }

  return {
    API_BASE_URL: apiBase,
  };
}

