import { defineStore } from 'pinia';
import { ref, computed, watch } from 'vue';
import axiosWorker from '../shared/axios';
import {
  getAccessToken,
  getRefreshToken,
  removeUserDataFromLocalStorage,
  saveTokens,
  setUserInLocalStorage
} from '../shared/tokenWorkshop';
import { routesByModule } from '../shared/constants';
import { tryCatchWrapper, showSuccessNotification } from '@/shared';

const {
  AUTH: { LOGIN, REGISTER, CONFIRM }
} = routesByModule;

export const useAuthStore = defineStore('auth', () => {
  const accessToken = ref(getAccessToken());
  const refreshToken = ref(getRefreshToken());

  const isLoggedIn = computed(() => !!accessToken.value && !!refreshToken.value);

  const login = async (values: { email: string; password: string }) => {
    const result = await axiosWorker().post(LOGIN, values);
    const { accessToken: newAccessToken, refreshToken: newRefreshToken, user } = result.data;
    if (newAccessToken && newRefreshToken && user) {
      accessToken.value = newAccessToken;
      refreshToken.value = newRefreshToken;
      saveTokens({ accessToken: newAccessToken, refreshToken: newRefreshToken });
      setUserInLocalStorage(user);
    }
    return isLoggedIn.value;
  };

  const register = async (values: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    bio: string;
  }) => {
    tryCatchWrapper(async () => {
      const { data } = await axiosWorker().post(REGISTER, values);
      if (data) {
        showSuccessNotification(
          'The user was created successfully, check your email to verify your account'
        );
      }
    });
  };

  const logout = () => {
    removeUserDataFromLocalStorage();
    accessToken.value = '';
    refreshToken.value = '';
  };

  const confirm = async (token: string) => {
    tryCatchWrapper(async () => {
      const { data } = await axiosWorker().get(`${CONFIRM}/${token}`);
      if (data) {
        showSuccessNotification(data.message);
      }
    });
  };

  watch([accessToken, refreshToken], ([newAccessToken, newRefreshToken]) => {
    if (newAccessToken && newRefreshToken) {
      saveTokens({ accessToken: newAccessToken, refreshToken: newRefreshToken });
    }
  });

  return {
    accessToken,
    refreshToken,
    isLoggedIn,
    login,
    register,
    confirm,
    logout
  };
});
