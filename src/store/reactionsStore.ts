import { defineStore } from 'pinia';
import type { IReaction, IReactionWithUser, ReactionTypeEnum } from '../shared/types';
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

  const deleteReactionFromStore = (id: string) => {
    reactions.value = reactions.value.filter((reaction) => reaction.id !== id);
  };

  const updateReactionFromStore = (
    reactionId: string,
    reactionType: ReactionTypeEnum.UPVOTE | ReactionTypeEnum.DOWNVOTE
  ) => {
    const index = reactions.value.findIndex((reaction) => reaction.id === reactionId);

    if (index !== -1) {
      Object.assign(reactions.value[index], { ...reactions.value[index], reactionType });
    }
  };

  const updateReactions = (newReaction: IReactionWithUser) => {
    reactions.value = [...reactions.value, newReaction];
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
    updateReactions,
    deleteReactionFromStore,
    updateReactionFromStore,
    getReaction,
    getReactions,
    deleteReaction,
    createReaction,
    patchReaction
  };
});
