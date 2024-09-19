const apiUrl = import.meta.env.VITE_BASE_URL;
export const BASE_URL = apiUrl;

const routes = {
  AUTH: `${BASE_URL}/auth`,
  USERS: `${BASE_URL}/users`,
  COMMENTS: `${BASE_URL}/comments`,
  REACTIONS: `${BASE_URL}/reactions`,
  ARTICLES: `${BASE_URL}/articles`
};

export const routesByModule = {
  AUTH: {
    LOGIN: `${routes.AUTH}/login`,
    REGISTER: `${routes.AUTH}/register`,
    REFRESH: `${routes.AUTH}/refresh`
  },
  ARTICLES: {
    PATCH: `${routes.ARTICLES}`,
    CREATE: `${routes.ARTICLES}`,
    DELETE: `${routes.ARTICLES}`,
    GET_ALL: `${routes.ARTICLES}`,
    GET_BY_ID: `${routes.ARTICLES}`
  },
  COMMENTS: {
    PATCH: `${routes.COMMENTS}`,
    CREATE: `${routes.COMMENTS}`,
    DELETE: `${routes.COMMENTS}`,
    GET_ALL: `${routes.COMMENTS}`
  },
  REACTIONS: {
    PATCH: `${routes.REACTIONS}`,
    CREATE: `${routes.REACTIONS}`,
    DELETE: `${routes.REACTIONS}`,
    GET_ALL: `${routes.REACTIONS}`,
    GET_BY_ID: `${routes.REACTIONS}`
  },
  USERS: {
    PATCH: `${routes.USERS}/`,
    GET_ALL: `${routes.USERS}/`
  }
};

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
