import { defineStore } from 'pinia';
import type { IUser } from '../shared/types';
import axiosWorker from '../shared/axios';
import { routesByModule } from '../shared/constants';

const {
  USERS: { PATCH, GET_ALL }
} = routesByModule;

export const useUserStore = defineStore({
  id: 'user',
  state: () => {
    return {
      user: {} as IUser,
      users: [] as IUser[]
    };
  },
  getters: {},
  actions: {
    setUser(user: IUser) {
      this.user = user;
    },
    setUsers(users: IUser[]) {
      this.users = users;
    },
    getAllUser(params: any) {
      return axiosWorker().get(GET_ALL, params);
    },
    patchUser(data: Partial<IUser>) {
      return axiosWorker().get(PATCH, data);
    }
  }
});
