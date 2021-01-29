const isServer = typeof window === 'undefined';
export const isStaging = isServer
  ? process.env.NODE_ENV === 'development'
  : globalThis.location.href.includes('localhost');
