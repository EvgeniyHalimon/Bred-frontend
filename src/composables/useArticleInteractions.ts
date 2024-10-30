import { useArticleStore, useCommentsStore, useReactionsStore, useUserStore } from '@/store';
import { computed, toRefs } from 'vue';
import { ReactionTypeEnum, SourceTypeEnum, type ReactionType } from '@/shared/types';
import { tryCatchWrapper } from '@/shared/tryCatchWrapper';

export function useArticleInteractions(articleId: string) {
  const articleStore = useArticleStore();
  const commentsStore = useCommentsStore();
  const reactionsStore = useReactionsStore();
  const { article } = toRefs(articleStore);
  const { comments } = toRefs(commentsStore);
  const { reactions } = toRefs(reactionsStore);
  const userStore = useUserStore();

  const { user } = toRefs(userStore);
  const getArticle = async () => {
    const { data } = await articleStore.fetchArticle(articleId);
    if (data) {
      articleStore.setArticle(data);
      commentsStore.setComments(data.comments);
      reactionsStore.setReactions(data.reactions);
    }
  };

  const getReactionId = (reactionType: ReactionType) => {
    return (
      user.value &&
      reactions.value?.find(
        (reaction) => reaction.userId === user.value?.id && reaction.reactionType === reactionType
      )?.id
    );
  };

  const reactionBody = { sourceType: SourceTypeEnum.ARTICLE, articleId };

  const isUpvoted = computed(() => !!getReactionId(ReactionTypeEnum.UPVOTE));

  const isDownvoted = computed(() => !!getReactionId(ReactionTypeEnum.DOWNVOTE));

  const createReaction = async (
    reactionType: ReactionTypeEnum.UPVOTE | ReactionTypeEnum.DOWNVOTE
  ) => {
    const { data } = await reactionsStore.createReaction({
      reactionType,
      ...reactionBody
    });
    if (data) {
      reactionsStore.updateReactions(data);
    }
  };

  const updateReaction = async (
    reactionType: ReactionTypeEnum.UPVOTE | ReactionTypeEnum.DOWNVOTE,
    oppositeReactionId: string
  ) => {
    const { data } = await reactionsStore.patchReaction(
      { reactionType, ...reactionBody },
      oppositeReactionId
    );
    if (data) {
      reactionsStore.updateReactionFromStore(oppositeReactionId, reactionType);
    }
  };

  const deleteReaction = async (reactionId: string) => {
    const { status } = await reactionsStore.deleteReaction(reactionId);
    if (status === 200) {
      reactionsStore.deleteReactionFromStore(reactionId);
    }
  };

  const handleVote = async (reactionType: ReactionTypeEnum.UPVOTE | ReactionTypeEnum.DOWNVOTE) => {
    const oppositeReactionType =
      reactionType === ReactionTypeEnum.UPVOTE
        ? ReactionTypeEnum.DOWNVOTE
        : ReactionTypeEnum.UPVOTE;

    const currentReactionId = getReactionId(reactionType);
    const oppositeReactionId = getReactionId(oppositeReactionType);

    if (!currentReactionId && !oppositeReactionId) {
      await tryCatchWrapper(() => createReaction(reactionType));
    } else if (oppositeReactionId) {
      await tryCatchWrapper(() => updateReaction(reactionType, oppositeReactionId));
    } else if (currentReactionId) {
      await tryCatchWrapper(() => deleteReaction(currentReactionId));
    }
  };

  return {
    article,
    comments,
    isUpvoted,
    isDownvoted,
    getArticle,
    handleVote
  };
}
