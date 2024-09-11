import type { ITokens } from './types';

const browser = typeof window !== 'undefined';

export const saveTokens = (data: ITokens) => {
  if (browser) {
    localStorage.setItem('bred_accessToken', data.accessToken);
    localStorage.setItem('bred_refreshToken', data.refreshToken);
  }
};

export const removeTokens = () => {
  if (browser) {
    localStorage.removeItem('bred_accessToken');
    localStorage.removeItem('bred_refreshToken');
  }
};

export const getRefreshToken = () => {
  if (browser) {
    return localStorage.getItem('bred_refreshToken') ?? '';
  }
};

export const getAccessToken = () => {
  if (browser) {
    return localStorage.getItem('bred_accessToken') ?? '';
  }
};
