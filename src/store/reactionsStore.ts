import { defineStore } from 'pinia';
import type { IReaction, IReactionWithUser } from '../shared/types';
import axiosWorker from '../shared/axios';
import { routesByModule } from '../shared/constants';
import { ref } from 'vue';

const {
  REACTIONS: { GET_ALL, GET_BY_ID, PATCH, CREATE, DELETE }
} = routesByModule;

export const useReactionsStore = defineStore('reactions', () => {
  const reactions = ref<IReactionWithUser[]>([]);

  const setReactions = (newReactions: IReactionWithUser[]) => {
    reactions.value = newReactions;
  };

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
    return axiosWorker().post(CREATE, data);
  };
  const patchReaction = (data: Partial<IReaction>, id: string) => {
    return axiosWorker().patch(`${PATCH}/${id}`, data);
  };

  return {
    reactions,
    setReactions,
    getReaction,
    getReactions,
    deleteReaction,
    createReaction,
    patchReaction
  };
});
