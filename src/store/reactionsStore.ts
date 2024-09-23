import { defineStore } from 'pinia';
import type { IReaction } from '../shared/types';
import axiosWorker from '../shared/axios';
import { routesByModule } from '../shared/constants';

const {
  REACTIONS: { GET_ALL, GET_BY_ID, PATCH, CREATE, DELETE }
} = routesByModule;

export const useReactionsStore = defineStore('reactions', () => {
  const getReaction = (id: string) => {
    return axiosWorker().get(`${GET_BY_ID}/${id}`);
  };
  const getReactions = (params: any) => {
    return axiosWorker().get(GET_ALL, params);
  };
  const deleteReaction = (id: string) => {
    return axiosWorker().purge(`${DELETE}/${id}`);
  };
  const createReaction = (data: Partial<IReaction>) => {
    return axiosWorker().purge(CREATE, data);
  };
  const patchReaction = (data: Partial<IReaction>, id: string) => {
    return axiosWorker().patch(`${PATCH}/${id}`, data);
  };

  return {
    getReaction,
    getReactions,
    deleteReaction,
    createReaction,
    patchReaction
  };
});
