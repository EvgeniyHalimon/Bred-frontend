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

  const updateComments = (newComment: ICommentWithAuthor) => {
    comments.value = [...comments.value, newComment];
  };

  const deleteCommentFromStore = (id: string) => {
    comments.value = comments.value.filter((comment) => comment.id !== id);
  };

  const updateCommentFromStore = (newComment: ICommentWithAuthor) => {
    const index = comments.value.findIndex((comment) => comment.id === newComment.id);

    if (index !== -1) {
      Object.assign(comments.value[index], newComment);
    }
  };

  const getComments = (params: any) => {
    return axiosWorker().get(GET_ALL, params);
  };
  const deleteComment = (id: string) => {
    comments.value = comments.value.filter((comment) => comment.id !== id);
    return axiosWorker().purge(`${DELETE}/${id}`);
  };
  const createComment = (data: Partial<IComment>) => {
    return axiosWorker().post(CREATE, data);
  };
  const patchComment = (data: Partial<IComment>, id: string) => {
    return axiosWorker().patch(`${PATCH}/${id}`, data);
  };

  return {
    comments,
    setComments,
    deleteCommentFromStore,
    updateCommentFromStore,
    getComments,
    updateComments,
    deleteComment,
    createComment,
    patchComment
  };
});
