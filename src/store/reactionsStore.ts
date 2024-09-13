import { defineStore } from 'pinia';
import type { IReaction } from '../shared/types';
import axiosWorker from '../shared/axios';
import { routesByModule } from '../shared/constants';

const {
  REACTIONS: { GET_ALL, GET_BY_ID, PATCH, CREATE, DELETE }
} = routesByModule;

export const useReactionsStore = defineStore({
  id: 'reactions',
  actions: {
    getReaction(id: string) {
      return axiosWorker().get(`${GET_BY_ID}/${id}`);
    },
    getReactions(params: any) {
      return axiosWorker().get(GET_ALL, params);
    },
    deleteReaction(id: string) {
      return axiosWorker().purge(`${DELETE}/${id}`);
    },
    createReaction(data: Partial<IReaction>) {
      return axiosWorker().purge(CREATE, data);
    },
    patchReaction(data: Partial<IReaction>, id: string) {
      return axiosWorker().patch(`${PATCH}/${id}`, data);
    }
  }
});
