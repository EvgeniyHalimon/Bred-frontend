const apiUrl = import.meta.env.VITE_BASE_URL;
export const BASE_URL = apiUrl;
export const REFRESH = `${BASE_URL}/auth/refresh`;

export const userFieldLengths = {
  firstName: {
    max: 200
  },
  lastName: {
    max: 200
  },
  password: {
    min: 16
  },
  bio: {
    min: 20,
    max: 3000
  }
};
