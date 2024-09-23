import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { IUser } from '../shared/types';
import axiosWorker from '../shared/axios';
import { routesByModule } from '../shared/constants';
import { getUserFromLocalStorage, setUserInLocalStorage } from '@/shared/tokenWorkshop';

const {
  USERS: { PATCH, GET_ALL }
} = routesByModule;

export const useUserStore = defineStore('users', () => {
  const user = ref<IUser | null>(JSON.parse(getUserFromLocalStorage()) || null);
  const users = ref<IUser[]>([]);
  const userId = computed(() => user.value?.id);

  const setUser = (newUser: IUser) => {
    user.value = newUser;
    setUserInLocalStorage(newUser);
  };

  const setUsers = (newUsers: IUser[]) => {
    users.value = newUsers;
  };

  const getAllUsers = async (params: any) => {
    const result = await axiosWorker().get(GET_ALL, { params });
    setUsers(result.data);
    return result;
  };

  const patchUser = async (data: Partial<IUser>) => {
    const result = await axiosWorker().patch(PATCH, data);
    return result;
  };

  return {
    user,
    users,
    userId,
    setUser,
    setUsers,
    getAllUsers,
    patchUser
  };
});
