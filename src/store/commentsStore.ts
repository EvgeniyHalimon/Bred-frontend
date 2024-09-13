import { defineStore } from 'pinia';
import type { IComment } from '../shared/types';
import axiosWorker from '../shared/axios';
import { routesByModule } from '../shared/constants';

const {
  COMMENTS: { GET_ALL, PATCH, CREATE, DELETE }
} = routesByModule;

export const useCommentsStore = defineStore({
  id: 'comments',
  actions: {
    getComments(params: any) {
      return axiosWorker().get(GET_ALL, params);
    },
    deleteComment(id: string) {
      return axiosWorker().purge(`${DELETE}/${id}`);
    },
    createComment(data: Partial<IComment>) {
      return axiosWorker().purge(CREATE, data);
    },
    patchComment(data: Partial<IComment>, id: string) {
      return axiosWorker().patch(`${PATCH}/${id}`, data);
    }
  }
});
