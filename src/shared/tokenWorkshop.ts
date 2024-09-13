import type { ITokens, IUser } from './types';

const isBrowser = typeof window !== 'undefined';

const keys = {
  access: 'bred_accessToken',
  refresh: 'bred_refreshToken',
  user: 'bred_user'
};

const storageWrapper = (action: 'set' | 'get' | 'remove', key: string, value?: any): any => {
  if (!isBrowser) return;

  try {
    if (action === 'set') {
      localStorage.setItem(key, value);
    } else if (action === 'get') {
      return JSON.parse(localStorage.getItem(key) as string);
    } else if (action === 'remove') {
      localStorage.removeItem(key);
    }
  } catch (error) {
    console.error('LocalStorage operation failed:', error);
  }
};

export const saveTokens = (data: ITokens) => {
  storageWrapper('set', keys.access, data.accessToken);
  storageWrapper('set', keys.refresh, data.refreshToken);
};

export const removeTokens = () => {
  storageWrapper('remove', keys.access);
  storageWrapper('remove', keys.refresh);
};

export const getRefreshToken = (): string => {
  return storageWrapper('get', keys.refresh) ?? '';
};

export const getAccessToken = (): string => {
  return storageWrapper('get', keys.access) ?? '';
};

export const setUserInLocalStorage = (user: Partial<IUser>) => {
  storageWrapper('set', keys.user, JSON.stringify(user));
};

export const getUserFromLocalStorage = (): string | null => {
  return storageWrapper('get', keys.user);
};

export const removeUserFromLocalStorage = () => {
  storageWrapper('remove', keys.user);
};
