import { defineStore } from 'pinia';
import type { IComment, ICommentWithAuthor } from '../shared/types';
import axiosWorker from '../shared/axios';
import { routesByModule } from '../shared/constants';
import { ref } from 'vue';

const {
  COMMENTS: { GET_ALL, PATCH, CREATE, DELETE }
} = routesByModule;

export const useCommentsStore = defineStore('comments', () => {
  const comments = ref<ICommentWithAuthor[]>([]);

  const setComments = (newComments: ICommentWithAuthor[]) => {
    comments.value = newComments;
  };

  const getComments = (params: any) => {
    return axiosWorker().get(GET_ALL, params);
  };
  const deleteComment = (id: string) => {
    return axiosWorker().purge(`${DELETE}/${id}`);
  };
  const createComment = (data: Partial<IComment>) => {
    return axiosWorker().purge(CREATE, data);
  };
  const patchComment = (data: Partial<IComment>, id: string) => {
    return axiosWorker().patch(`${PATCH}/${id}`, data);
  };

  return {
    comments,
    setComments,
    getComments,
    deleteComment,
    createComment,
    patchComment
  };
});
