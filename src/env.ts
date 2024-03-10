declare global {
  interface Window {
    env: any;
  }
}

interface EnvType {
  REACT_APP_API: string;
  REACT_APP_API_KEY: string;
  REACT_APP_API_PRIVATE_KEY: string;
  REACT_APP_API_HASH: string;
  REACT_APP_PATH_LANDING: string;
  REACT_APP_PATH_CHARACTER_INFO: string;
}

export const env: EnvType = { ...process.env, ...window.env };
